<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    public const TYPE_PERCENT = 'percent';

    public const TYPE_FIXED = 'fixed';

    protected $fillable = [
        'code',
        'description',
        'discount_type',
        'discount_value',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'discount_value' => 'decimal:2',
            'active' => 'boolean',
        ];
    }

    public function setCodeAttribute(string $value): void
    {
        $this->attributes['code'] = strtoupper(trim($value));
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function calculateDiscount(float $amount): float
    {
        if (! $this->active) {
            return 0;
        }

        $value = (float) $this->discount_value;
        $discount = $this->discount_type === self::TYPE_PERCENT
            ? $amount * ($value / 100)
            : $value;

        $discount = max(0, min($amount, $discount));

        return round($discount, 2);
    }
}
