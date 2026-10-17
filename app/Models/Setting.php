<?php

namespace App\Models;

use App\Enums\LandingPage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Setting extends Model
{
    public const HOMEPAGE_RESULT_LINKS = 'homepage_result_links';

    public const HOMEPAGE_CONTENT = 'homepage_content';

    public const HOMEPAGE_UPLOAD_DISK = 'public';

    public const PRICING_PACKAGES = 'pricing_packages';

    public const PRICING_BADGE_POPULAR = 'popular';

    public const PRICING_BADGE_BEST_VALUE = 'best_value';

    public const PRIVACY_POLICY = 'privacy_policy';

    public const CONTACT_WHATSAPP_NUMBER = 'contact_whatsapp_number';

    public const CONTACT_TELEGRAM_URL = 'contact_telegram_url';

    public const DEFAULT_WHATSAPP_NUMBER = '14075617294';

    public const DEFAULT_TELEGRAM_URL = 'https://t.me/tradivorobot';

    public const CONTACT_WHATSAPP_MESSAGE = 'contact_whatsapp_message';

    public const DEFAULT_WHATSAPP_MESSAGE = "Hi! I'd like to know more about Tradivo Magic EA V12.";

    public const SOCIAL_LINKS = 'social_links';

    /** @var array<string, string> */
    public const SOCIAL_PLATFORMS = [
        'whatsapp' => 'WhatsApp',
        'telegram' => 'Telegram',
        'facebook' => 'Facebook',
        'instagram' => 'Instagram',
        'tiktok' => 'TikTok',
        'youtube' => 'YouTube',
        'x' => 'X (Twitter)',
        'linkedin' => 'LinkedIn',
        'discord' => 'Discord',
        'website' => 'Website',
    ];

    /** @var array<int, array{platform: string, url: string|null}> */
    public const DEFAULT_SOCIAL_LINKS = [
        ['platform' => 'whatsapp', 'url' => null],
        ['platform' => 'telegram', 'url' => null],
        ['platform' => 'facebook', 'url' => 'https://facebook.com/tradivorobot'],
        ['platform' => 'instagram', 'url' => 'https://instagram.com/tradivorobot'],
        ['platform' => 'tiktok', 'url' => 'https://tiktok.com/@tradivo.robot'],
        ['platform' => 'youtube', 'url' => 'https://www.youtube.com/@Tradivo_Robot'],
    ];

    /** @var array<string, string> */
    public const LANDING_ICONS = [
        'telegram' => 'Telegram',
        'whatsapp' => 'WhatsApp',
        'facebook' => 'Facebook',
        'messenger' => 'Messenger',
        'instagram' => 'Instagram',
        'youtube' => 'YouTube',
        'tiktok' => 'TikTok',
        'x' => 'X (Twitter)',
        'discord' => 'Discord',
        'users' => 'Group',
        'globe' => 'Globe',
        'cart' => 'Shopping cart',
        'email' => 'Email',
        'phone' => 'Phone',
        'shield' => 'Shield',
        'gear' => 'Gear',
        'chart' => 'Chart',
        'headset' => 'Headset',
        'heart' => 'Heart',
        'star' => 'Star',
        'check' => 'Check mark',
        'lock' => 'Lock',
        'bolt' => 'Lightning bolt',
    ];

    /** @var array<string, string> */
    public const LANDING_COLORS = [
        'blue' => 'Blue',
        'green' => 'Green',
        'purple' => 'Purple',
        'orange' => 'Orange',
        'teal' => 'Teal',
        'pink' => 'Pink',
        'red' => 'Red',
        'slate' => 'Slate',
    ];

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
     * @return array{
     *     whatsapp: array{number: string, url: string, message: string, chatUrl: string},
     *     telegram: array{url: string}
     * }
     */
    public static function contactLinks(): array
    {
        $whatsappNumber = self::whatsappNumber();
        $whatsappUrl = "https://wa.me/{$whatsappNumber}";
        $whatsappMessage = self::whatsappMessage();

        return [
            'whatsapp' => [
                'number' => $whatsappNumber,
                'url' => $whatsappUrl,
                'message' => $whatsappMessage,
                'chatUrl' => $whatsappMessage !== ''
                    ? $whatsappUrl.'?text='.rawurlencode($whatsappMessage)
                    : $whatsappUrl,
            ],
            'telegram' => [
                'url' => self::telegramUrl(),
            ],
        ];
    }

    /**
     * Raw social link rows as edited in admin.
     *
     * @return array<int, array{platform: string, url: string|null}>
     */
    public static function socialLinkRows(): array
    {
        $stored = self::get(self::SOCIAL_LINKS);

        if ($stored === null) {
            return self::DEFAULT_SOCIAL_LINKS;
        }

        return self::normalizeSocialLinkRows(self::getArray(self::SOCIAL_LINKS));
    }

    /**
     * Footer social links. WhatsApp and Telegram rows without a URL use the contact settings links.
     *
     * @return array<int, array{platform: string, label: string, url: string}>
     */
    public static function socialLinks(): array
    {
        $contact = self::contactLinks();
        $links = [];

        foreach (self::socialLinkRows() as $row) {
            $url = $row['url'] ?? null;

            $url ??= match ($row['platform']) {
                'whatsapp' => $contact['whatsapp']['chatUrl'],
                'telegram' => $contact['telegram']['url'],
                default => null,
            };

            if ($url === null) {
                continue;
            }

            $links[] = [
                'platform' => $row['platform'],
                'label' => self::SOCIAL_PLATFORMS[$row['platform']],
                'url' => $url,
            ];
        }

        return $links;
    }

    /**
     * @param  array<array-key, mixed>  $rows
     * @return array<int, array{platform: string, url: string|null}>
     */
    public static function normalizeSocialLinkRows(array $rows): array
    {
        $normalized = [];

        foreach ($rows as $row) {
            $platform = is_array($row) ? ($row['platform'] ?? null) : null;

            if (! is_string($platform) || ! array_key_exists($platform, self::SOCIAL_PLATFORMS)) {
                continue;
            }

            $url = trim((string) ($row['url'] ?? ''));

            $normalized[] = [
                'platform' => $platform,
                'url' => $url !== '' ? $url : null,
            ];
        }

        return $normalized;
    }

    public static function whatsappMessage(): string
    {
        return trim((string) self::get(self::CONTACT_WHATSAPP_MESSAGE, self::DEFAULT_WHATSAPP_MESSAGE));
    }

    public static function whatsappNumber(): string
    {
        return self::normalizeWhatsappNumber(
            self::get(self::CONTACT_WHATSAPP_NUMBER, self::DEFAULT_WHATSAPP_NUMBER),
        );
    }

    public static function telegramUrl(): string
    {
        return self::normalizeTelegramUrl(
            self::get(self::CONTACT_TELEGRAM_URL, self::DEFAULT_TELEGRAM_URL),
        );
    }

    public static function normalizeWhatsappNumber(mixed $number): string
    {
        $normalized = preg_replace('/\D+/', '', (string) $number) ?? '';

        return $normalized !== '' ? $normalized : self::DEFAULT_WHATSAPP_NUMBER;
    }

    public static function normalizeTelegramUrl(mixed $value): string
    {
        $value = trim((string) $value);

        if ($value === '') {
            return self::DEFAULT_TELEGRAM_URL;
        }

        if (Str::startsWith($value, ['http://', 'https://'])) {
            return $value;
        }

        $value = ltrim($value, '@/');

        if (Str::startsWith($value, ['t.me/', 'telegram.me/'])) {
            return "https://{$value}";
        }

        return "https://t.me/{$value}";
    }

    /**
     * Raw homepage content: config defaults with any saved sections layered on top.
     *
     * @return array<string, array<string, mixed>>
     */
    public static function homepageContentState(): array
    {
        $defaults = config('homepage', []);
        $stored = self::getArray(self::HOMEPAGE_CONTENT);
        $state = [];

        foreach ($defaults as $section => $values) {
            $state[$section] = array_replace(
                $values,
                is_array($stored[$section] ?? null) ? $stored[$section] : [],
            );
        }

        return $state;
    }

    /**
     * Homepage content resolved for the public page (image URLs, rendered markdown).
     *
     * @return array<string, mixed>
     */
    public static function homepageContent(): array
    {
        $content = self::homepageContentState();
        $defaults = config('homepage', []);
        $text = fn (string $section, string $key): string => trim((string) ($content[$section][$key] ?? ''));
        $image = fn (string $section, string $key): ?string => self::homepageImageUrl(
            $content[$section][$key] ?? null,
            $defaults[$section][$key] ?? null,
        );
        $list = fn (string $section, string $key): array => array_values(array_filter(
            is_array($content[$section][$key] ?? null) ? $content[$section][$key] : [],
            'is_array',
        ));

        return [
            'hero' => [
                'backgroundImage' => $image('hero', 'background_image'),
                'boxImage' => (bool) ($content['hero']['show_box'] ?? false) ? $image('hero', 'box_image') : null,
                'slides' => array_map(fn (array $slide): array => [
                    'subtitle' => trim((string) ($slide['subtitle'] ?? '')),
                    'title' => trim((string) ($slide['title'] ?? '')),
                    'body' => self::inlineMarkdown($slide['body'] ?? ''),
                ], $list('hero', 'slides')),
            ],
            'successKeys' => [
                'heading' => $text('success_keys', 'heading'),
                'items' => array_map(fn (array $item): array => [
                    'image' => self::homepageImageUrl($item['image'] ?? null, $item['default_image'] ?? null),
                    'title' => trim((string) ($item['title'] ?? '')),
                    'subtitle' => trim((string) ($item['subtitle'] ?? '')),
                ], $list('success_keys', 'items')),
            ],
            'description' => [
                'eyebrow' => $text('description', 'eyebrow'),
                'body' => Str::markdown($text('description', 'body'), [
                    'html_input' => 'strip',
                    'allow_unsafe_links' => false,
                ]),
                'featuresHeading' => $text('description', 'features_heading'),
                'features' => self::normalizeFeatures($content['description']['features'] ?? [], 30),
                'disclaimer' => $text('description', 'disclaimer'),
                'packageImage' => $image('description', 'package_image'),
                'iconImage' => $image('description', 'icon_image'),
            ],
            'investorAccount' => [
                'enabled' => (bool) ($content['investor_account']['enabled'] ?? false),
                'title' => $text('investor_account', 'title'),
                'intro' => $text('investor_account', 'intro'),
                'rows' => array_map(fn (array $row): array => [
                    'icon' => (string) ($row['icon'] ?? 'user'),
                    'label' => trim((string) ($row['label'] ?? '')),
                    'value' => trim((string) ($row['value'] ?? '')),
                ], $list('investor_account', 'rows')),
                'tagline' => $text('investor_account', 'tagline'),
            ],
            'results' => [
                'source' => $text('results', 'source'),
                'heading' => $text('results', 'heading'),
                'title' => $text('results', 'title'),
                'body' => $text('results', 'body'),
                'image' => $image('results', 'image'),
                'buttonLabel' => $text('results', 'button_label'),
                'buttonUrl' => self::normalizeUrl(
                    $content['results']['button_url'] ?? self::homepageResultLinks()['balanced'],
                ),
            ],
            'whyChoose' => [
                'emoji' => $text('why_choose', 'emoji'),
                'heading' => $text('why_choose', 'heading'),
                'items' => array_map(fn (array $item): array => [
                    'icon' => (string) ($item['icon'] ?? 'check'),
                    'title' => trim((string) ($item['title'] ?? '')),
                    'subtitle' => trim((string) ($item['subtitle'] ?? '')),
                ], $list('why_choose', 'items')),
            ],
            'pricingBanner' => [
                'intro' => self::inlineMarkdown($content['pricing_banner']['intro'] ?? ''),
                'heading' => $text('pricing_banner', 'heading'),
                'highlight' => $text('pricing_banner', 'highlight'),
            ],
            'installation' => [
                'heading' => $text('installation', 'heading'),
                'videoUrl' => $text('installation', 'video_url'),
                'stats' => array_map(fn (array $stat): array => [
                    'value' => trim((string) ($stat['value'] ?? '')),
                    'label' => trim((string) ($stat['label'] ?? '')),
                ], $list('installation', 'stats')),
            ],
            'gallery' => [
                'heading' => $text('gallery', 'heading'),
                'subtitle' => $text('gallery', 'subtitle'),
            ],
            'faq' => [
                'heading' => $text('faq', 'heading'),
                'items' => array_map(fn (array $item): array => [
                    'question' => trim((string) ($item['question'] ?? '')),
                    'answer' => trim((string) ($item['answer'] ?? '')),
                ], $list('faq', 'items')),
            ],
            'testimonials' => [
                'heading' => $text('testimonials', 'heading'),
                'subtitle' => $text('testimonials', 'subtitle'),
            ],
            'contact' => [
                'heading' => $text('contact', 'heading'),
                'subtitle' => $text('contact', 'subtitle'),
                'ctaHeading' => $text('contact', 'cta_heading'),
                'ctaBody' => $text('contact', 'cta_body'),
            ],
        ];
    }

    /**
     * The domains a landing page is served on. An empty list turns that landing page off.
     *
     * @return array<int, string>
     */
    public static function landingPageDomains(LandingPage $page): array
    {
        $key = $page->domainsSettingKey();

        return self::normalizeDomains(self::get($key) === null
            ? $page->defaultDomains()
            : self::getArray($key));
    }

    /**
     * The landing page served on a request host, if any. The www. variant of a domain matches too.
     */
    public static function landingPageForHost(string $host): ?LandingPage
    {
        $host = self::normalizeDomain($host);
        $bareHost = Str::startsWith($host, 'www.') ? Str::after($host, 'www.') : $host;

        foreach (LandingPage::cases() as $page) {
            $domains = self::landingPageDomains($page);

            if (in_array($host, $domains, true) || in_array($bareHost, $domains, true)) {
                return $page;
            }
        }

        return null;
    }

    /**
     * @param  array<array-key, mixed>  $domains
     * @return array<int, string>
     */
    public static function normalizeDomains(array $domains): array
    {
        return collect($domains)
            ->map(fn (mixed $domain): string => self::normalizeDomain($domain))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Reduce a pasted domain or URL to a bare lowercase host name.
     */
    public static function normalizeDomain(mixed $value): string
    {
        $value = Str::lower(trim((string) $value));
        $value = (string) preg_replace('#^[a-z][a-z0-9+.-]*://#', '', $value);
        $value = Str::before(Str::before(Str::before($value, '/'), '?'), '#');
        $value = Str::before($value, ':');

        return rtrim($value, '.');
    }

    /**
     * Raw landing page content: config defaults with any saved sections layered on top.
     *
     * @return array<string, array<string, mixed>>
     */
    public static function landingPageContentState(LandingPage $page): array
    {
        $defaults = Arr::except(config($page->configKey(), []), ['domains']);
        $stored = self::getArray($page->contentSettingKey());
        $state = [];

        foreach ($defaults as $section => $values) {
            $state[$section] = array_replace(
                $values,
                is_array($stored[$section] ?? null) ? $stored[$section] : [],
            );
        }

        return $state;
    }

    /**
     * Contact landing page content (landing page 3 or its copy) resolved for the public page.
     * Text keeps its **highlight** markers.
     *
     * @return array<string, mixed>
     */
    public static function contactLandingContent(LandingPage $page = LandingPage::Contact): array
    {
        $content = self::landingPageContentState($page);
        $text = fn (string $section, string $key): string => trim((string) ($content[$section][$key] ?? ''));
        $optional = fn (mixed $value): ?string => ($value = trim((string) $value)) !== '' ? $value : null;
        $image = fn (string $section, string $key): ?string => self::homepageImageUrl($content[$section][$key] ?? null);
        $icon = fn (mixed $value, string $default): string => array_key_exists((string) $value, self::LANDING_ICONS) ? (string) $value : $default;
        $color = fn (mixed $value): string => array_key_exists((string) $value, self::LANDING_COLORS) ? (string) $value : 'blue';
        $list = fn (string $section, string $key): array => array_values(array_filter(
            is_array($content[$section][$key] ?? null) ? $content[$section][$key] : [],
            'is_array',
        ));

        return [
            'seo' => [
                'title' => $text('seo', 'title'),
                'description' => $text('seo', 'description'),
            ],
            'header' => [
                'logo' => $image('header', 'logo'),
                'brand' => $text('header', 'brand'),
                'tagline' => $text('header', 'tagline'),
            ],
            'hero' => [
                'badge' => $text('hero', 'badge'),
                'title' => $text('hero', 'title'),
                'body' => $text('hero', 'body'),
                'image' => $image('hero', 'image'),
                'note' => $text('hero', 'note'),
                'platformLabel' => $text('hero', 'platform_label'),
                'features' => array_map(fn (array $feature): array => [
                    'icon' => $icon($feature['icon'] ?? null, 'check'),
                    'label' => trim((string) ($feature['label'] ?? '')),
                ], $list('hero', 'features')),
            ],
            'contact' => [
                'heading' => $text('contact', 'heading'),
                'subtitle' => $text('contact', 'subtitle'),
                'items' => array_map(fn (array $item): array => [
                    'icon' => $icon($item['icon'] ?? null, 'globe'),
                    'color' => $color($item['color'] ?? null),
                    'title' => trim((string) ($item['title'] ?? '')),
                    'subtitle' => trim((string) ($item['subtitle'] ?? '')),
                    'buttonLabel' => trim((string) ($item['button_label'] ?? '')),
                    'url' => $optional($item['url'] ?? null),
                    'copyValue' => $optional($item['copy_value'] ?? null),
                ], $list('contact', 'items')),
            ],
            'about' => [
                'enabled' => (bool) ($content['about']['enabled'] ?? false),
                'badge' => $text('about', 'badge'),
                'title' => $text('about', 'title'),
                'body' => $text('about', 'body'),
                'tagline' => $text('about', 'tagline'),
                'image' => $image('about', 'image'),
                'features' => array_map(fn (array $feature): array => [
                    'icon' => $icon($feature['icon'] ?? null, 'check'),
                    'color' => $color($feature['color'] ?? null),
                    'title' => trim((string) ($feature['title'] ?? '')),
                    'subtitle' => trim((string) ($feature['subtitle'] ?? '')),
                ], $list('about', 'features')),
            ],
            'highlights' => array_map(fn (array $item): array => [
                'icon' => $icon($item['icon'] ?? null, 'check'),
                'title' => trim((string) ($item['title'] ?? '')),
                'subtitle' => trim((string) ($item['subtitle'] ?? '')),
            ], $list('highlights', 'items')),
            'footer' => [
                'tagline' => $text('footer', 'tagline'),
                'socialLinks' => collect(self::normalizeSocialLinkRows($list('footer', 'social_links')))
                    ->filter(fn (array $row): bool => $row['url'] !== null)
                    ->map(fn (array $row): array => [
                        'platform' => $row['platform'],
                        'label' => self::SOCIAL_PLATFORMS[$row['platform']],
                        'url' => $row['url'],
                    ])
                    ->values()
                    ->all(),
            ],
        ];
    }

    /**
     * Landing page 2 (products) content resolved for the public page. Text keeps its **highlight** markers.
     *
     * @return array<string, mixed>
     */
    public static function productsLandingContent(): array
    {
        $content = self::landingPageContentState(LandingPage::Products);
        $text = fn (string $section, string $key): string => trim((string) ($content[$section][$key] ?? ''));
        $buttonUrl = fn (string $section): string => trim((string) ($content[$section]['button_url'] ?? '')) ?: '#pricing';
        $items = fn (string $section): array => self::normalizeFeatures($content[$section]['items'] ?? [], 20);

        return [
            'seo' => [
                'title' => $text('seo', 'title'),
                'description' => $text('seo', 'description'),
            ],
            'hero' => [
                'badge' => $text('hero', 'badge'),
                'title' => $text('hero', 'title'),
                'subtitle' => $text('hero', 'subtitle'),
                'paragraphs' => self::paragraphs($text('hero', 'body')),
                'image' => self::homepageImageUrl($content['hero']['image'] ?? null, $content['hero']['default_image'] ?? null),
                'buttonLabel' => $text('hero', 'button_label'),
                'buttonUrl' => $buttonUrl('hero'),
            ],
            'whyChoose' => [
                'heading' => $text('why_choose', 'heading'),
                'items' => $items('why_choose'),
            ],
            'consistency' => [
                'heading' => $text('consistency', 'heading'),
                'intro' => $text('consistency', 'intro'),
                'items' => $items('consistency'),
                'note' => $text('consistency', 'note'),
            ],
            'setup' => [
                'heading' => $text('setup', 'heading'),
                'steps' => collect(is_array($content['setup']['steps'] ?? null) ? $content['setup']['steps'] : [])
                    ->map(fn (mixed $step): string => is_string($step) ? trim($step) : '')
                    ->filter()
                    ->values()
                    ->all(),
            ],
            'included' => [
                'heading' => $text('included', 'heading'),
                'items' => $items('included'),
            ],
            'pricing' => [
                'heading' => $text('pricing', 'heading'),
                'body' => $text('pricing', 'body'),
                'showPlans' => (bool) ($content['pricing']['show_plans'] ?? false),
                'buttonLabel' => $text('pricing', 'button_label'),
                'buttonUrl' => trim((string) ($content['pricing']['button_url'] ?? '')) ?: null,
            ],
            'faq' => [
                'heading' => $text('faq', 'heading'),
                'items' => collect(is_array($content['faq']['items'] ?? null) ? $content['faq']['items'] : [])
                    ->filter(fn (mixed $item): bool => is_array($item))
                    ->map(fn (array $item): array => [
                        'question' => trim((string) ($item['question'] ?? '')),
                        'answer' => trim((string) ($item['answer'] ?? '')),
                    ])
                    ->values()
                    ->all(),
            ],
            'risk' => [
                'heading' => $text('risk', 'heading'),
                'body' => $text('risk', 'body'),
            ],
            'cta' => [
                'heading' => $text('cta', 'heading'),
                'body' => $text('cta', 'body'),
                'buttonLabel' => $text('cta', 'button_label'),
                'buttonUrl' => $buttonUrl('cta'),
            ],
        ];
    }

    /**
     * Split text on blank lines into trimmed paragraphs.
     *
     * @return array<int, string>
     */
    private static function paragraphs(string $text): array
    {
        return collect(preg_split('/(\r\n|\r|\n)\s*(\r\n|\r|\n)/', $text) ?: [])
            ->map(fn (string $paragraph): string => trim($paragraph))
            ->filter()
            ->values()
            ->all();
    }

    /**
     * Resolve an uploaded file path (or bundled /img path) to a public URL.
     */
    public static function homepageImageUrl(mixed $path, mixed $default = null): ?string
    {
        $path = is_string($path) ? trim($path) : '';

        if ($path === '') {
            return is_string($default) && $default !== '' ? self::homepageImageUrl($default) : null;
        }

        if (self::isBundledAsset($path)) {
            return $path;
        }

        return Storage::disk(self::HOMEPAGE_UPLOAD_DISK)->url($path);
    }

    /**
     * Whether a stored image value points at a bundled asset rather than an upload.
     */
    public static function isBundledAsset(mixed $path): bool
    {
        return is_string($path) && Str::startsWith($path, ['/', 'http://', 'https://']);
    }

    /**
     * Render a short text with **bold** support, turning line breaks into <br>.
     */
    private static function inlineMarkdown(mixed $value): string
    {
        $lines = preg_split('/\r\n|\r|\n/', trim((string) $value)) ?: [];

        return collect($lines)
            ->map(fn (string $line): string => trim(Str::inlineMarkdown($line, [
                'html_input' => 'strip',
                'allow_unsafe_links' => false,
            ])))
            ->implode('<br>');
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
     * Pricing packages shaped for the public pricing cards.
     *
     * @return array<int, array{slug: string, name: string, accessDuration: string, amount: float, oldAmount: float, features: array<int, string>, badge: string|null}>
     */
    public static function pricingPackageProps(): array
    {
        return array_map(fn (array $package): array => [
            'slug' => $package['slug'],
            'name' => $package['name'],
            'accessDuration' => $package['access_duration'],
            'amount' => $package['amount'],
            'oldAmount' => $package['old_amount'],
            'features' => $package['features'],
            'badge' => $package['badge'],
        ], self::pricingPackages());
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
    private static function normalizeFeatures(mixed $features, int $limit = 12): array
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
            ->take($limit)
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
