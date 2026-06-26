<?php

use App\Filament\Pages\ContactSettings;
use App\Models\Setting;
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
        ],
        'telegram' => [
            'url' => 'https://t.me/tradivo_help',
        ],
    ]);
});
