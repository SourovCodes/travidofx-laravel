<?php

namespace App\Listeners;

use App\Models\Order;
use Laravel\Cashier\Events\WebhookReceived;

class StripeCheckoutCompletedListener
{
    public function handle(WebhookReceived $event): void
    {
        $payload = $event->payload;

        if (($payload['type'] ?? null) !== 'checkout.session.completed') {
            return;
        }

        $object = $payload['data']['object'] ?? null;
        if (! $object || ! is_array($object)) {
            return;
        }

        $sessionId = $object['id'] ?? null;
        if (! $sessionId) {
            return;
        }

        $order = Order::where('stripe_session_id', $sessionId)->first();

        $paymentStatus = $object['payment_status'] ?? null;
        $status = $paymentStatus === 'paid' ? Order::STATUS_PAID : ($paymentStatus ?: Order::STATUS_PENDING);

        $attrs = [
            'status' => $status,
            'stripe_payment_intent_id' => $object['payment_intent'] ?? null,
        ];

        if ($order) {
            $order->update($attrs);

            return;
        }

        // Fallback: webhook arrived before/without an Order record. Synthesize one.
        $metadata = $object['metadata'] ?? [];

        Order::create([
            'stripe_session_id' => $sessionId,
            'stripe_payment_intent_id' => $object['payment_intent'] ?? null,
            'email' => $object['customer_email'] ?? ($object['customer_details']['email'] ?? 'unknown@unknown'),
            'first_name' => $metadata['firstName'] ?? null,
            'last_name' => $metadata['lastName'] ?? null,
            'country' => $metadata['country'] ?? null,
            'plan_slug' => $metadata['plan'] ?? 'unknown',
            'plan_name' => $metadata['plan'] ?? 'Unknown plan',
            'coupon_code' => ($metadata['couponCode'] ?? '') !== '' ? $metadata['couponCode'] : null,
            'coupon_discount_cents' => (int) round(((float) ($metadata['couponDiscount'] ?? 0)) * 100),
            'amount_cents' => (int) ($object['amount_total'] ?? 0),
            'currency' => $object['currency'] ?? 'usd',
            'status' => $status,
            'payment_method' => $metadata['paymentMethod'] ?? 'stripe',
            'additional_info' => $metadata['additionalInfo'] ?? null,
        ]);
    }
}
