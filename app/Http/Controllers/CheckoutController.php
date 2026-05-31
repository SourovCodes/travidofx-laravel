<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\CryptoWallet;
use App\Models\Order;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Cashier;

class CheckoutController extends Controller
{
    public function show(Request $request): Response
    {
        $planSlug = $this->resolvePlan($request->query('plan'));
        $plan = config("plans.lookup.{$planSlug}");

        return Inertia::render('checkout/index', [
            'planSlug' => $planSlug,
            'plan' => $plan,
            'paymentFeeRates' => Setting::paymentFeeRates(),
            'cryptoWallets' => CryptoWallet::active()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(['key', 'asset', 'network', 'address'])
                ->values(),
        ]);
    }

    public function createSession(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'plan' => ['required', 'string'],
            'email' => ['required', 'email', 'max:160'],
            'firstName' => ['required', 'string', 'max:80'],
            'lastName' => ['required', 'string', 'max:80'],
            'country' => ['required', 'string', 'max:80'],
            'additionalInfo' => ['nullable', 'string', 'max:500'],
            'paymentMethod' => ['nullable', 'string', 'max:20'],
            'promoCode' => ['nullable', 'string', 'max:50'],
        ]);

        $planSlug = $this->resolvePlan($data['plan']);
        $plan = config("plans.lookup.{$planSlug}");
        $paymentMethod = $data['paymentMethod'] ?? 'stripe';
        $feeRate = Setting::paymentFeeRateFor($paymentMethod);

        $base = (float) $plan['amount'];
        $couponCode = trim((string) ($data['promoCode'] ?? ''));
        $coupon = $this->resolveCoupon($couponCode);

        if ($couponCode !== '' && ! $coupon) {
            return back()->withErrors([
                'promoCode' => 'Coupon code is not valid.',
            ])->withInput();
        }

        $couponDiscount = $coupon ? $coupon->calculateDiscount($base) : 0;
        $discounted = max(0, round($base - $couponDiscount, 2));

        $fee = round($discounted * $feeRate, 2);
        $total = round($discounted + $fee, 2);
        $feePercent = $feeRate * 100;
        $feeLabel = floor($feePercent) === $feePercent
            ? sprintf('%d%%', $feePercent)
            : sprintf('%.2f%%', $feePercent);

        $totalCents = (int) round($total * 100);
        $couponDiscountCents = (int) round($couponDiscount * 100);

        $session = Cashier::stripe()->checkout->sessions->create([
            'mode' => 'payment',
            'payment_method_types' => ['card'],
            'customer_email' => $data['email'],
            'line_items' => [[
                'quantity' => 1,
                'price_data' => [
                    'currency' => 'usd',
                    'unit_amount' => $totalCents,
                    'product_data' => [
                        'name' => $plan['name'],
                        'description' => "{$plan['subtitle']} · Includes {$feeLabel} card payment fee",
                    ],
                ],
            ]],
            'success_url' => route('checkout.success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.cancel'),
            'metadata' => [
                'plan' => $planSlug,
                'paymentMethod' => $paymentMethod,
                'baseAmount' => number_format($base, 2, '.', ''),
                'couponCode' => $coupon?->code ?? '',
                'couponDiscount' => number_format($couponDiscount, 2, '.', ''),
                'paymentFee' => number_format($fee, 2, '.', ''),
                'paymentFeeRate' => number_format($feeRate, 4, '.', ''),
                'totalAmount' => number_format($total, 2, '.', ''),
                'firstName' => $data['firstName'],
                'lastName' => $data['lastName'],
                'country' => $data['country'],
                'additionalInfo' => substr($data['additionalInfo'] ?? '', 0, 500),
            ],
        ]);

        Order::create([
            'stripe_session_id' => $session->id,
            'email' => $data['email'],
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'country' => $data['country'],
            'plan_slug' => $planSlug,
            'plan_name' => $plan['name'],
            'coupon_code' => $coupon?->code,
            'coupon_discount_cents' => $couponDiscountCents,
            'amount_cents' => $totalCents,
            'currency' => 'usd',
            'status' => Order::STATUS_PENDING,
            'payment_method' => $paymentMethod,
            'additional_info' => $data['additionalInfo'] ?? null,
        ]);

        return redirect($session->url, 303);
    }

    public function success(Request $request): Response
    {
        return Inertia::render('checkout/success', [
            'sessionId' => $request->query('session_id'),
        ]);
    }

    public function cancel(): Response
    {
        return Inertia::render('checkout/cancel');
    }

    private function resolvePlan(?string $slug): string
    {
        $lookup = config('plans.lookup');

        return $slug && array_key_exists($slug, $lookup) ? $slug : 'pro';
    }

    private function resolveCoupon(?string $code): ?Coupon
    {
        $code = $code ? trim($code) : '';

        if ($code === '') {
            return null;
        }

        return Coupon::active()
            ->whereRaw('UPPER(code) = ?', [strtoupper($code)])
            ->first();
    }
}
