<?php

use App\Filament\Pages\ContactSettings;
use App\Models\Setting;
use Filament\Forms\Components\Repeater;
use Livewire\Livewire;

test('admin can edit contact settings', function () {
    Livewire::test(ContactSettings::class)
        ->assertOk()
        ->fillForm([
            'whatsapp_number' => '+1 (407) 555-8899',
            'telegram_url' => '@tradivo_support',
        ])
        ->call('save')
        ->assertNotified('Contact settings saved');

    expect(Setting::get(Setting::CONTACT_WHATSAPP_NUMBER))->toBe('14075558899')
        ->and(Setting::get(Setting::CONTACT_TELEGRAM_URL))->toBe('https://t.me/tradivo_support')
        ->and(Setting::whatsappNumber())->toBe('14075558899')
        ->and(Setting::telegramUrl())->toBe('https://t.me/tradivo_support');
});

test('public pages receive configured contact links', function () {
    Setting::set(Setting::CONTACT_WHATSAPP_NUMBER, '8801712345678');
    Setting::set(Setting::CONTACT_TELEGRAM_URL, 'tradivo_help');

    $props = $this->get(route('home'))
        ->assertOk()
        ->inertiaProps();

    expect($props['contact'])->toBe([
        'whatsapp' => [
            'number' => '8801712345678',
            'url' => 'https://wa.me/8801712345678',
            'message' => Setting::DEFAULT_WHATSAPP_MESSAGE,
            'chatUrl' => 'https://wa.me/8801712345678?text='.rawurlencode(Setting::DEFAULT_WHATSAPP_MESSAGE),
        ],
        'telegram' => [
            'url' => 'https://t.me/tradivo_help',
        ],
    ]);
});

test('footer social links default to the original icons', function () {
    $links = $this->get(route('home'))->inertiaProps('socialLinks');

    expect(array_column($links, 'platform'))->toBe(['whatsapp', 'telegram', 'facebook', 'instagram', 'tiktok', 'youtube'])
        ->and($links[0]['url'])->toStartWith('https://wa.me/'.Setting::DEFAULT_WHATSAPP_NUMBER.'?text=')
        ->and($links[2]['url'])->toBe('https://facebook.com/tradivorobot');
});

test('admin can edit the whatsapp message and footer social links', function () {
    $undoRepeaterFake = Repeater::fake();

    Livewire::test(ContactSettings::class)
        ->fillForm([
            'whatsapp_message' => 'Hello Tradivo',
            'social_links' => [
                ['platform' => 'whatsapp', 'url' => null],
                ['platform' => 'x', 'url' => 'https://x.com/tradivo'],
            ],
        ])
        ->call('save')
        ->assertHasNoFormErrors();

    $undoRepeaterFake();

    $props = $this->get(route('home'))->inertiaProps();

    expect($props['contact']['whatsapp']['chatUrl'])->toEndWith('?text=Hello%20Tradivo')
        ->and($props['socialLinks'])->toBe([
            ['platform' => 'whatsapp', 'label' => 'WhatsApp', 'url' => $props['contact']['whatsapp']['chatUrl']],
            ['platform' => 'x', 'label' => 'X (Twitter)', 'url' => 'https://x.com/tradivo'],
        ]);
});

test('non-messaging social links require a url', function () {
    Livewire::test(ContactSettings::class)
        ->fillForm([
            'social_links' => [
                ['platform' => 'facebook', 'url' => null],
            ],
        ])
        ->call('save')
        ->assertHasFormErrors();
});
