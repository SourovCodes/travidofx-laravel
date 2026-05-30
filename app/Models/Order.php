<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public const STATUS_PENDING = 'pending';

    public const STATUS_PAID = 'paid';

    public const STATUS_FAILED = 'failed';

    protected $fillable = [
        'stripe_session_id',
        'stripe_payment_intent_id',
        'email',
        'first_name',
        'last_name',
        'country',
        'plan_slug',
        'plan_name',
        'amount_cents',
        'currency',
        'status',
        'payment_method',
        'additional_info',
    ];

    protected function casts(): array
    {
        return [
            'amount_cents' => 'integer',
        ];
    }

    public function getAmountAttribute(): float
    {
        return $this->amount_cents / 100;
    }
}
