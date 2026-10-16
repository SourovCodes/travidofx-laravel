<?php

use App\Filament\Pages\LandingPageSettings;
use App\Models\Setting;
use Filament\Forms\Components\Repeater;
use Livewire\Livewire;

test('landing domains render the landing page while the main domain keeps the homepage', function () {
    $this->get('http://localhost/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('home'));

    $content = $this->get('http://info.tradivofx.com/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('landing'))
        ->inertiaProps('content');

    expect($content['hero']['title'])->toBe("Trade Smarter\nwith **Profit Shield EA**")
        ->and($content['contact']['items'])->toHaveCount(8)
        ->and($content['contact']['items'][1])->toMatchArray(['url' => null, 'copyValue' => '@ProfitShieldEA'])
        ->and($content['footer']['socialLinks'])->toHaveCount(3);
});

test('every saved landing domain and its www variant serve the landing page', function (string $host) {
    Setting::set(Setting::LANDING_PAGE_DOMAINS, ['info.tradivofx.com', 'info-mirror.tradivofx.com']);

    $this->get("http://{$host}/")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('landing'));
})->with(['info.tradivofx.com', 'info-mirror.tradivofx.com', 'www.info-mirror.tradivofx.com']);

test('other paths on a landing domain redirect to the main website', function () {
    config(['app.url' => 'https://tradivofx.com']);

    $this->get('http://info.tradivofx.com/checkout?plan=pro')
        ->assertRedirect('https://tradivofx.com/checkout?plan=pro');
});

test('removing every domain turns the landing page off', function () {
    Setting::set(Setting::LANDING_PAGE_DOMAINS, []);

    $this->get('http://info.tradivofx.com/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('home'));
});

test('admin can manage landing domains and content', function () {
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(LandingPageSettings::class)
        ->fillForm([
            'domains' => ['https://Info.Tradivofx.com/', 'offer.example.com', 'offer.example.com'],
            'content.hero.title' => 'Grow with **Shield**',
            'content.contact.items' => [
                [
                    'icon' => 'email',
                    'color' => 'orange',
                    'title' => 'Email us',
                    'subtitle' => '',
                    'button_label' => 'hello@example.com',
                    'url' => 'mailto:hello@example.com',
                    'copy_value' => 'hello@example.com',
                ],
            ],
        ])
        ->call('save')
        ->assertHasNoFormErrors()
        ->assertNotified('Landing page saved');

    $undoRepeaterFake();

    expect(Setting::landingPageDomains())->toBe(['info.tradivofx.com', 'offer.example.com']);

    $content = $this->get('http://offer.example.com/')->inertiaProps('content');

    expect($content['hero']['title'])->toBe('Grow with **Shield**')
        ->and($content['contact']['items'])->toBe([[
            'icon' => 'email',
            'color' => 'orange',
            'title' => 'Email us',
            'subtitle' => '',
            'buttonLabel' => 'hello@example.com',
            'url' => 'mailto:hello@example.com',
            'copyValue' => 'hello@example.com',
        ]]);
});

test('admin cannot use an invalid domain or the main website domain', function (string $domain) {
    config(['app.url' => 'https://tradivofx.com']);

    Livewire::test(LandingPageSettings::class)
        ->fillForm(['domains' => [$domain]])
        ->call('save')
        ->assertHasFormErrors(['domains.0']);
})->with(['not a domain', 'tradivofx.com']);

test('contact rows reject links that are not web, email or phone links', function () {
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(LandingPageSettings::class)
        ->fillForm([
            'content.contact.items' => [
                ['icon' => 'globe', 'color' => 'blue', 'title' => 'Site', 'button_label' => 'Open', 'url' => 'javascript:alert(1)'],
            ],
        ])
        ->call('save')
        ->assertHasFormErrors(['content.contact.items.0.url']);

    $undoRepeaterFake();
});
