<?php

use App\Models\Coupon;

test('active coupons can be validated for the selected plan', function () {
    Coupon::create([
        'code' => 'launch25',
        'description' => 'Launch offer',
        'discount_type' => Coupon::TYPE_PERCENT,
        'discount_value' => 25,
        'active' => true,
    ]);

    $this->getJson(route('coupons.validate', [
        'code' => 'Launch25',
        'plan' => 'pro',
    ]))
        ->assertOk()
        ->assertJson([
            'valid' => true,
            'code' => 'LAUNCH25',
            'discount' => 74.75,
            'discountType' => Coupon::TYPE_PERCENT,
            'discountValue' => 25,
        ]);
});

test('inactive coupons are rejected', function () {
    Coupon::create([
        'code' => 'OLD10',
        'description' => 'Expired offer',
        'discount_type' => Coupon::TYPE_FIXED,
        'discount_value' => 10,
        'active' => false,
    ]);

    $this->getJson(route('coupons.validate', [
        'code' => 'OLD10',
        'plan' => 'basic',
    ]))
        ->assertNotFound()
        ->assertJson([
            'valid' => false,
            'message' => 'Coupon code is not valid.',
        ]);
});

test('checkout rejects an invalid coupon before creating a payment session', function () {
    $this->from(route('checkout', ['plan' => 'pro']))
        ->post(route('checkout.session'), [
            'plan' => 'pro',
            'email' => 'customer@example.com',
            'firstName' => 'Test',
            'lastName' => 'Customer',
            'country' => 'United States',
            'additionalInfo' => '',
            'paymentMethod' => 'stripe',
            'promoCode' => 'MISSING',
        ])
        ->assertRedirect(route('checkout', ['plan' => 'pro']))
        ->assertSessionHasErrors('promoCode');
});
