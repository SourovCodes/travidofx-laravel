<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    public const PAYMENT_FEE_RATE = 'payment_fee_rate';

    public const PAYMENT_FEE_RATE_STRIPE = 'payment_fee_rate_stripe';

    public const PAYMENT_FEE_RATE_SKRILL = 'payment_fee_rate_skrill';

    public const PAYMENT_FEE_RATE_PAYONEER = 'payment_fee_rate_payoneer';

    /** @var array<string, string> */
    public const PAYMENT_FEE_RATE_KEYS = [
        'stripe' => self::PAYMENT_FEE_RATE_STRIPE,
        'skrill' => self::PAYMENT_FEE_RATE_SKRILL,
        'payoneer' => self::PAYMENT_FEE_RATE_PAYONEER,
    ];

    protected $primaryKey = 'key';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['key', 'value'];

    public static function get(string $key, mixed $default = null): mixed
    {
        return Cache::rememberForever(self::cacheKey($key), function () use ($key) {
            return self::query()->whereKey($key)->value('value');
        }) ?? $default;
    }

    public static function set(string $key, mixed $value): void
    {
        self::updateOrCreate(
            ['key' => $key],
            ['value' => is_array($value) ? json_encode($value) : (string) $value],
        );

        Cache::forget(self::cacheKey($key));
    }

    public static function getFloat(string $key, float $default = 0.0): float
    {
        $value = self::get($key);

        return $value !== null && is_numeric($value) ? (float) $value : $default;
    }

    public static function paymentFeeRateFor(string $method): float
    {
        $default = self::getFloat(self::PAYMENT_FEE_RATE, (float) config('plans.fee_rate'));
        $key = self::PAYMENT_FEE_RATE_KEYS[$method] ?? null;

        return $key ? self::getFloat($key, $default) : $default;
    }

    /**
     * @return array<string, float>
     */
    public static function paymentFeeRates(): array
    {
        $rates = [];

        foreach (array_keys(self::PAYMENT_FEE_RATE_KEYS) as $method) {
            $rates[$method] = self::paymentFeeRateFor($method);
        }

        return $rates;
    }

    protected static function cacheKey(string $key): string
    {
        return "setting:{$key}";
    }
}
