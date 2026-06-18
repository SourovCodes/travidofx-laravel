<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class Setting extends Model
{
    public const HOMEPAGE_RESULT_LINKS = 'homepage_result_links';

    public const PRICING_PACKAGES = 'pricing_packages';

    public const PRICING_BADGE_POPULAR = 'popular';

    public const PRICING_BADGE_BEST_VALUE = 'best_value';

    public const PRIVACY_POLICY = 'privacy_policy';

    /** @var array<string, string> */
    public const PRICING_BADGE_OPTIONS = [
        self::PRICING_BADGE_POPULAR => 'Popular',
        self::PRICING_BADGE_BEST_VALUE => 'Best Value',
    ];

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
            ['value' => is_array($value) ? json_encode($value, JSON_THROW_ON_ERROR) : (string) $value],
        );

        Cache::forget(self::cacheKey($key));
    }

    /**
     * @return array<array-key, mixed>
     */
    public static function getArray(string $key, array $default = []): array
    {
        $value = self::get($key);

        if (is_array($value)) {
            return $value;
        }

        if (! is_string($value) || trim($value) === '') {
            return $default;
        }

        $decoded = json_decode($value, true);

        return is_array($decoded) ? $decoded : $default;
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

    public static function privacyPolicyMarkdown(): string
    {
        $stored = self::get(self::PRIVACY_POLICY);

        if (is_string($stored) && trim($stored) !== '') {
            return $stored;
        }

        return (string) config('legal.privacy_policy.markdown', '');
    }

    public static function privacyPolicyHtml(): string
    {
        return Str::markdown(self::privacyPolicyMarkdown(), [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }

    /**
     * @return array{balanced: string, aggressive: string}
     */
    public static function homepageResultLinks(): array
    {
        $defaults = config('plans.result_links', []);
        $stored = self::getArray(self::HOMEPAGE_RESULT_LINKS);

        return [
            'balanced' => self::normalizeUrl($stored['balanced'] ?? $defaults['balanced'] ?? '#'),
            'aggressive' => self::normalizeUrl($stored['aggressive'] ?? $defaults['aggressive'] ?? '#'),
        ];
    }

    /**
     * @return array<int, array{
     *     slug: string,
     *     name: string,
     *     product_name: string,
     *     access_duration: string,
     *     subtitle: string,
     *     amount: float,
     *     old_amount: float,
     *     features: array<int, string>,
     *     badge: string|null
     * }>
     */
    public static function pricingPackages(): array
    {
        $stored = self::getArray(self::PRICING_PACKAGES);
        $packages = $stored === [] ? self::defaultPricingPackages() : $stored;
        $normalized = self::normalizePricingPackages($packages);

        return $normalized === []
            ? self::normalizePricingPackages(self::defaultPricingPackages())
            : $normalized;
    }

    /**
     * @return array<string, array{
     *     slug: string,
     *     name: string,
     *     product_name: string,
     *     access_duration: string,
     *     subtitle: string,
     *     amount: float,
     *     old_amount: float,
     *     features: array<int, string>,
     *     badge: string|null
     * }>
     */
    public static function pricingPlanLookup(): array
    {
        $lookup = [];

        foreach (self::pricingPackages() as $package) {
            $lookup[$package['slug']] = $package;
        }

        return $lookup;
    }

    /**
     * @return array{
     *     slug: string,
     *     name: string,
     *     product_name: string,
     *     access_duration: string,
     *     subtitle: string,
     *     amount: float,
     *     old_amount: float,
     *     features: array<int, string>,
     *     badge: string|null
     * }|null
     */
    public static function pricingPlan(?string $slug): ?array
    {
        $lookup = self::pricingPlanLookup();

        if ($slug && array_key_exists($slug, $lookup)) {
            return $lookup[$slug];
        }

        $first = reset($lookup);

        return is_array($first) ? $first : null;
    }

    /**
     * @param  array<array-key, mixed>  $packages
     * @return array<int, array{
     *     slug: string,
     *     name: string,
     *     product_name: string,
     *     access_duration: string,
     *     subtitle: string,
     *     amount: float,
     *     old_amount: float,
     *     features: array<int, string>,
     *     badge: string|null
     * }>
     */
    public static function normalizePricingPackages(array $packages): array
    {
        $normalized = [];
        $usedSlugs = [];

        foreach (array_slice(array_values($packages), 0, 4) as $index => $package) {
            if (! is_array($package)) {
                continue;
            }

            $name = trim((string) ($package['name'] ?? ''));
            $accessDuration = trim((string) ($package['access_duration'] ?? $package['subtitle'] ?? ''));
            $amount = round((float) ($package['amount'] ?? 0), 2);

            if ($name === '' || $accessDuration === '' || $amount <= 0) {
                continue;
            }

            $oldAmount = round((float) ($package['old_amount'] ?? $amount), 2);
            $slug = self::uniquePricingSlug(
                $package['slug'] ?? null,
                $name,
                $index + 1,
                $usedSlugs,
            );

            $usedSlugs[$slug] = true;

            $normalized[] = [
                'slug' => $slug,
                'name' => $name,
                'product_name' => trim((string) ($package['product_name'] ?? "Tradivo Magic EA V12 - {$name}")),
                'access_duration' => $accessDuration,
                'subtitle' => $accessDuration,
                'amount' => $amount,
                'old_amount' => max($amount, $oldAmount),
                'features' => self::normalizeFeatures($package['features'] ?? []),
                'badge' => self::normalizeBadge($package['badge'] ?? null),
            ];
        }

        return $normalized;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function defaultPricingPackages(): array
    {
        $packages = [];

        foreach (config('plans.lookup', []) as $slug => $plan) {
            $packages[] = [
                'slug' => $slug,
                'name' => $plan['name'] ?? Str::headline((string) $slug),
                'product_name' => $plan['product_name'] ?? null,
                'access_duration' => $plan['access_duration'] ?? $plan['subtitle'] ?? '',
                'amount' => $plan['amount'] ?? 0,
                'old_amount' => $plan['old_amount'] ?? $plan['amount'] ?? 0,
                'features' => $plan['features'] ?? [],
                'badge' => $plan['badge'] ?? null,
            ];
        }

        return $packages;
    }

    /**
     * @return array<int, string>
     */
    private static function normalizeFeatures(mixed $features): array
    {
        if (is_string($features)) {
            $features = preg_split('/\r\n|\r|\n/', $features) ?: [];
        }

        if (! is_array($features)) {
            return [];
        }

        return collect($features)
            ->map(fn (mixed $feature): string => trim((string) $feature))
            ->filter()
            ->take(12)
            ->values()
            ->all();
    }

    private static function normalizeBadge(mixed $badge): ?string
    {
        $badge = is_string($badge) ? $badge : null;

        return $badge && array_key_exists($badge, self::PRICING_BADGE_OPTIONS)
            ? $badge
            : null;
    }

    private static function normalizeUrl(mixed $url): string
    {
        $url = trim((string) $url);

        return $url !== '' ? $url : '#';
    }

    /**
     * @param  array<string, bool>  $usedSlugs
     */
    private static function uniquePricingSlug(mixed $slug, string $name, int $index, array $usedSlugs): string
    {
        $base = Str::slug((string) ($slug ?: $name));
        $base = $base !== '' ? Str::limit($base, 44, '') : "package-{$index}";
        $candidate = $base;
        $suffix = 2;

        while (array_key_exists($candidate, $usedSlugs)) {
            $candidate = Str::limit($base, 44, '')."-{$suffix}";
            $suffix++;
        }

        return $candidate;
    }

    protected static function cacheKey(string $key): string
    {
        return "setting:{$key}";
    }
}
