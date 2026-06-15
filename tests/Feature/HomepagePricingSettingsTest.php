<?php

use App\Models\Setting;
use Stripe\StripeClient;

test('homepage uses editable result links and pricing packages', function () {
    Setting::set(Setting::HOMEPAGE_RESULT_LINKS, [
        'balanced' => 'https://example.com/balanced-results',
        'aggressive' => 'https://example.com/aggressive-results',
    ]);
    Setting::set(Setting::PRICING_PACKAGES, [
        [
            'slug' => 'starter',
            'name' => 'Starter',
            'access_duration' => '6 Months Access',
            'amount' => 99,
            'old_amount' => 149,
            'features' => ['1 Key License', 'XAUUSD Support'],
            'badge' => 'popular',
        ],
        [
            'slug' => 'elite',
            'name' => 'Elite',
            'access_duration' => 'Lifetime Access',
            'amount' => 399,
            'old_amount' => 499,
            'features' => ['5 Key Licenses', 'Premium Support'],
            'badge' => 'best_value',
        ],
    ]);

    $props = $this->get(route('home'))
        ->assertOk()
        ->inertiaProps();

    expect($props['resultLinks'])->toBe([
        'balanced' => 'https://example.com/balanced-results',
        'aggressive' => 'https://example.com/aggressive-results',
    ])
        ->and($props['pricingPackages'])->toHaveCount(2)
        ->and($props['pricingPackages'][0])->toMatchArray([
            'slug' => 'starter',
            'name' => 'Starter',
            'accessDuration' => '6 Months Access',
            'amount' => 99,
            'oldAmount' => 149,
            'features' => ['1 Key License', 'XAUUSD Support'],
            'badge' => 'popular',
        ])
        ->and($props['pricingPackages'][1])->toMatchArray([
            'slug' => 'elite',
            'badge' => 'best_value',
        ]);
});

test('checkout uses editable package pricing for stripe sessions', function () {
    $stripeCheckoutUrl = 'https://checkout.stripe.com/c/pay/cs_test_custom';
    $stripeSpy = new class
    {
        public ?array $payload = null;
    };

    $this->app->bind(StripeClient::class, fn () => new class($stripeCheckoutUrl, $stripeSpy)
    {
        public function __construct(
            private string $stripeCheckoutUrl,
            private object $stripeSpy,
        ) {}

        public function __get(string $name): object
        {
            if ($name === 'checkout') {
                return new class($this->stripeCheckoutUrl, $this->stripeSpy)
                {
                    public function __construct(
                        private string $stripeCheckoutUrl,
                        private object $stripeSpy,
                    ) {}

                    public function __get(string $name): object
                    {
                        if ($name === 'sessions') {
                            return new class($this->stripeCheckoutUrl, $this->stripeSpy)
                            {
                                public function __construct(
                                    private string $stripeCheckoutUrl,
                                    private object $stripeSpy,
                                ) {}

                                public function create(array $payload): object
                                {
                                    $this->stripeSpy->payload = $payload;

                                    return (object) [
                                        'id' => 'cs_test_custom',
                                        'url' => $this->stripeCheckoutUrl,
                                    ];
                                }
                            };
                        }

                        throw new RuntimeException("Unexpected Stripe checkout property [{$name}].");
                    }
                };
            }

            throw new RuntimeException("Unexpected Stripe property [{$name}].");
        }
    });

    Setting::set(Setting::PRICING_PACKAGES, [
        [
            'slug' => 'starter',
            'name' => 'Starter',
            'access_duration' => '6 Months Access',
            'amount' => 100,
            'old_amount' => 150,
            'features' => ['1 Key License', 'XAUUSD Support'],
            'badge' => null,
        ],
    ]);

    $this->withHeader('X-Inertia', 'true')
        ->post(route('checkout.session'), [
            'plan' => 'starter',
            'email' => 'customer@example.com',
            'firstName' => 'Test',
            'lastName' => 'Customer',
            'country' => 'United States',
            'additionalInfo' => '',
            'paymentMethod' => 'stripe',
            'promoCode' => '',
        ])
        ->assertConflict()
        ->assertHeader('X-Inertia-Location', $stripeCheckoutUrl);

    expect($stripeSpy->payload['line_items'][0]['price_data']['unit_amount'])->toBe(10500)
        ->and($stripeSpy->payload['line_items'][0]['price_data']['product_data']['name'])->toBe('Tradivo Magic EA V12 - Starter')
        ->and($stripeSpy->payload['metadata']['plan'])->toBe('starter');

    $this->assertDatabaseHas('orders', [
        'stripe_session_id' => 'cs_test_custom',
        'plan_slug' => 'starter',
        'plan_name' => 'Starter',
        'amount_cents' => 10500,
    ]);
});
