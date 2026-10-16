<?php

use App\Filament\Pages\HomepageSettings;
use App\Models\Setting;
use Filament\Forms\Components\Repeater;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;

test('homepage renders the original content when nothing is saved', function () {
    $content = $this->get(route('home'))
        ->assertOk()
        ->inertiaProps('content');

    expect($content['hero']['backgroundImage'])->toBe('/img/hero.png')
        ->and($content['hero']['boxImage'])->toBeNull()
        ->and($content['hero']['slides'])->toHaveCount(3)
        ->and($content['hero']['slides'][0]['body'])->toContain('<strong>XAUUSD</strong>')
        ->and($content['successKeys']['items'][0]['image'])->toBe('/img/rslide-1.png')
        ->and($content['results']['heading'])->toBe('Unlock the Full Power of Automated Trading with Tradivo')
        ->and($content['results']['image'])->toBe('/img/v12-balance.png')
        ->and($content['description']['packageImage'])->toBe('/img/tradivo-package.jpeg')
        ->and($content['faq']['items'])->toHaveCount(12)
        ->and($content['investorAccount']['enabled'])->toBeTrue()
        ->and($content['investorAccount']['rows'])->toHaveCount(3);
});

test('admin can edit the investor account card', function () {
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(HomepageSettings::class)
        ->fillForm([
            'content.investor_account.rows' => [
                ['icon' => 'server', 'label' => 'Server:', 'value' => 'Exness-MT5Real8'],
            ],
        ])
        ->call('save')
        ->assertHasNoFormErrors();

    $undoRepeaterFake();

    $investor = $this->get(route('home'))->inertiaProps('content.investorAccount');

    expect($investor['rows'])->toBe([
        ['icon' => 'server', 'label' => 'Server:', 'value' => 'Exness-MT5Real8'],
    ])
        ->and($investor['title'])->toBe('Investor Account Information');
});

test('admin can save homepage content with separate hero layers', function () {
    Storage::fake('public');
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(HomepageSettings::class)
        ->assertOk()
        ->fillForm([
            'content.hero.background_image' => UploadedFile::fake()->image('stars.png'),
            'content.hero.box_image' => UploadedFile::fake()->image('box.png'),
            'content.hero.show_box' => true,
            'content.hero.slides' => [
                ['subtitle' => 'New release', 'title' => 'Tradivo V13', 'body' => 'Now with **news AI**'],
            ],
            'content.results.heading' => 'One verified account',
            'content.results.button_url' => 'https://example.com/live',
        ])
        ->call('save')
        ->assertHasNoFormErrors()
        ->assertNotified('Settings saved');

    $undoRepeaterFake();

    $content = $this->get(route('home'))->inertiaProps('content');

    expect($content['hero']['backgroundImage'])->toStartWith(Storage::disk('public')->url('homepage/'))
        ->and($content['hero']['boxImage'])->toStartWith(Storage::disk('public')->url('homepage/'))
        ->and($content['hero']['slides'])->toBe([
            ['subtitle' => 'New release', 'title' => 'Tradivo V13', 'body' => 'Now with <strong>news AI</strong>'],
        ])
        ->and($content['results']['heading'])->toBe('One verified account')
        ->and($content['results']['buttonUrl'])->toBe('https://example.com/live')
        ->and($content['faq']['items'])->toHaveCount(12)
        ->and($content['description']['packageImage'])->toBe('/img/tradivo-package.jpeg');
});

test('homepage markdown fields strip raw html', function () {
    Setting::set(Setting::HOMEPAGE_CONTENT, [
        'pricing_banner' => [
            'intro' => '<script>alert(1)</script>**Instant** access',
        ],
    ]);

    $content = $this->get(route('home'))->inertiaProps('content');

    expect($content['pricingBanner']['intro'])->not->toContain('<script')
        ->and($content['pricingBanner']['intro'])->toContain('<strong>Instant</strong> access')
        ->and($content['pricingBanner']['heading'])->toBe('Get Instant Access to Tradivo Magic EA V12');
});
