<?php

use App\Enums\LandingPage;
use App\Filament\Pages\ContactLandingPageSettings;
use App\Filament\Pages\ProductsLandingPageSettings;
use App\Filament\Pages\SecondContactLandingPageSettings;
use App\Models\Setting;
use Filament\Forms\Components\Repeater;
use Livewire\Livewire;

test('each landing domain renders its own landing page while the main domain keeps the homepage', function () {
    $this->get('http://localhost/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('home'));

    $contact = $this->get('http://info.tradivofx.com/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('landing/contact'))
        ->inertiaProps('content');

    expect($contact['hero']['title'])->toBe("Trade Smarter\nwith **Profit Shield EA**")
        ->and($contact['contact']['items'])->toHaveCount(8)
        ->and($contact['contact']['items'][1])->toMatchArray(['url' => null, 'copyValue' => '@ProfitShieldEA'])
        ->and($contact['footer']['socialLinks'])->toHaveCount(3);

    $products = $this->get('http://products.tradivofx.com/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('landing/products'));

    expect($products->inertiaProps('content.hero.title'))->toBe('Trade Smarter with **Tradivo Magic EA** for MT5')
        ->and($products->inertiaProps('content.hero.paragraphs'))->toHaveCount(2)
        ->and($products->inertiaProps('content.hero.image'))->toBe('/img/tradivo-package.jpeg')
        ->and($products->inertiaProps('content.hero.buttonUrl'))->toBe('#pricing')
        ->and($products->inertiaProps('content.setup.steps'))->toHaveCount(4)
        ->and($products->inertiaProps('pricingPackages'))->toEqual(Setting::pricingPackageProps());
});

test('every saved landing domain and its www variant serve the landing page', function (string $host) {
    Setting::set(LandingPage::Contact->domainsSettingKey(), ['info.tradivofx.com', 'info-mirror.tradivofx.com']);

    $this->get("http://{$host}/")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('landing/contact'));
})->with(['info.tradivofx.com', 'info-mirror.tradivofx.com', 'www.info-mirror.tradivofx.com']);

test('other paths on a landing domain redirect to the main website', function (string $host) {
    config(['app.url' => 'https://tradivofx.com']);

    $this->get("http://{$host}/checkout?plan=pro")
        ->assertRedirect('https://tradivofx.com/checkout?plan=pro');
})->with(['info.tradivofx.com', 'products.tradivofx.com']);

test('removing every domain turns a landing page off', function () {
    Setting::set(LandingPage::Products->domainsSettingKey(), []);

    $this->get('http://products.tradivofx.com/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('home'));
});

test('admin can manage contact landing domains and content', function () {
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(ContactLandingPageSettings::class)
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

    expect(Setting::landingPageDomains(LandingPage::Contact))->toBe(['info.tradivofx.com', 'offer.example.com']);

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

test('admin can manage products landing domains and content', function () {
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(ProductsLandingPageSettings::class)
        ->fillForm([
            'domains' => ['products.tradivofx.com', 'ea.example.com'],
            'content.hero.body' => "First paragraph.\n\nSecond paragraph.\n\nThird paragraph.",
            'content.hero.button_url' => 'https://tradivofx.com/checkout?plan=pro',
            'content.setup.steps' => [['text' => 'Buy a license.'], ['text' => 'Install it.']],
            'content.why_choose.items' => ['Fast setup'],
            'content.pricing.show_plans' => false,
        ])
        ->call('save')
        ->assertHasNoFormErrors()
        ->assertNotified('Landing page saved');

    $undoRepeaterFake();

    $content = $this->get('http://ea.example.com/')
        ->assertInertia(fn ($page) => $page->component('landing/products'))
        ->inertiaProps('content');

    expect($content['hero']['paragraphs'])->toBe(['First paragraph.', 'Second paragraph.', 'Third paragraph.'])
        ->and($content['hero']['buttonUrl'])->toBe('https://tradivofx.com/checkout?plan=pro')
        ->and($content['setup']['steps'])->toBe(['Buy a license.', 'Install it.'])
        ->and($content['whyChoose']['items'])->toBe(['Fast setup'])
        ->and($content['pricing']['showPlans'])->toBeFalse()
        ->and($content['cta']['buttonUrl'])->toBe('#pricing');
});

test('landing page 4 is a separately managed copy of the contact landing page', function () {
    expect(Setting::landingPageDomains(LandingPage::SecondContact))->toBe([]);

    Livewire::test(SecondContactLandingPageSettings::class)
        ->assertSet('data.content.hero.title', "Trade Smarter\nwith **Profit Shield EA**")
        ->fillForm([
            'domains' => ['contact.tradivofx.com'],
            'content.hero.title' => 'Contact team **two**',
        ])
        ->call('save')
        ->assertHasNoFormErrors();

    $this->get('http://contact.tradivofx.com/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('landing/contact')
            ->where('content.hero.title', 'Contact team **two**'));

    $this->get('http://info.tradivofx.com/')
        ->assertInertia(fn ($page) => $page
            ->component('landing/contact')
            ->where('content.hero.title', "Trade Smarter\nwith **Profit Shield EA**"));
});

test('admin cannot use an invalid domain, the main website domain, or another landing page domain', function (string $domain) {
    config(['app.url' => 'https://tradivofx.com']);

    Livewire::test(ProductsLandingPageSettings::class)
        ->fillForm(['domains' => [$domain]])
        ->call('save')
        ->assertHasFormErrors(['domains.0']);
})->with(['not a domain', 'tradivofx.com', 'info.tradivofx.com']);

test('contact rows reject links that are not web, email or phone links', function () {
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(ContactLandingPageSettings::class)
        ->fillForm([
            'content.contact.items' => [
                ['icon' => 'globe', 'color' => 'blue', 'title' => 'Site', 'button_label' => 'Open', 'url' => 'javascript:alert(1)'],
            ],
        ])
        ->call('save')
        ->assertHasFormErrors(['content.contact.items.0.url']);

    $undoRepeaterFake();
});
