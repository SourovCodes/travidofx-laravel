<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function validate(Request $request): JsonResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'max:50'],
            'plan' => ['nullable', 'string', 'max:50'],
        ]);

        $planSlug = $this->resolvePlan($data['plan'] ?? null);
        $plan = config("plans.lookup.{$planSlug}");

        $coupon = Coupon::active()
            ->whereRaw('UPPER(code) = ?', [strtoupper(trim($data['code']))])
            ->first();

        if (! $coupon) {
            return response()->json([
                'valid' => false,
                'message' => 'Coupon code is not valid.',
            ], 404);
        }

        $discount = $coupon->calculateDiscount((float) $plan['amount']);

        return response()->json([
            'valid' => true,
            'code' => $coupon->code,
            'discount' => $discount,
            'discountType' => $coupon->discount_type,
            'discountValue' => (float) $coupon->discount_value,
        ]);
    }

    private function resolvePlan(?string $slug): string
    {
        $lookup = config('plans.lookup');

        return $slug && array_key_exists($slug, $lookup) ? $slug : 'pro';
    }
}
