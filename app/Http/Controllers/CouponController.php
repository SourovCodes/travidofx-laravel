<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Setting;
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

        $plan = Setting::pricingPlan($data['plan'] ?? null);
        abort_unless($plan, 404);

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
}
