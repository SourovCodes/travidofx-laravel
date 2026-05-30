<?php

namespace App\Http\Controllers;

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
            'paymentFeeRate' => (float) config('plans.fee_rate'),
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
        ]);

        $planSlug = $this->resolvePlan($data['plan']);
        $plan = config("plans.lookup.{$planSlug}");
        $feeRate = (float) config('plans.fee_rate');

        $base = (float) $plan['amount'];
        $fee = round($base * $feeRate, 2);
        $total = round($base + $fee, 2);
        $feePercent = $feeRate * 100;
        $feeLabel = floor($feePercent) === $feePercent
            ? sprintf('%d%%', $feePercent)
            : sprintf('%.2f%%', $feePercent);

        $session = Cashier::stripe()->checkout->sessions->create([
            'mode' => 'payment',
            'payment_method_types' => ['card'],
            'customer_email' => $data['email'],
            'line_items' => [[
                'quantity' => 1,
                'price_data' => [
                    'currency' => 'usd',
                    'unit_amount' => (int) round($total * 100),
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
                'paymentMethod' => $data['paymentMethod'] ?? 'stripe',
                'baseAmount' => number_format($base, 2, '.', ''),
                'paymentFee' => number_format($fee, 2, '.', ''),
                'paymentFeeRate' => number_format($feeRate, 4, '.', ''),
                'totalAmount' => number_format($total, 2, '.', ''),
                'firstName' => $data['firstName'],
                'lastName' => $data['lastName'],
                'country' => $data['country'],
                'additionalInfo' => substr($data['additionalInfo'] ?? '', 0, 500),
            ],
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
}
