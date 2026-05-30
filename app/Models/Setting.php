<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    public const PAYMENT_FEE_RATE = 'payment_fee_rate';

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

    protected static function cacheKey(string $key): string
    {
        return "setting:{$key}";
    }
}
