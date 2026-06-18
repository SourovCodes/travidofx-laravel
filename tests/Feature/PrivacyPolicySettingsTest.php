<?php

use App\Filament\Pages\PrivacyPolicySettings;
use App\Models\Setting;
use Inertia\Testing\AssertableInertia as Assert;
use Livewire\Livewire;

test('privacy policy page uses configured fallback content', function () {
    $this->get(route('privacy-policy'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('privacy-policy')
            ->where('privacyPolicyHtml', fn (string $html): bool => str_contains($html, '<h1>Privacy Policy</h1>'))
        );
});

test('admin can edit privacy policy content', function () {
    $markdown = <<<'MARKDOWN'
# Updated Privacy Policy

This policy was updated from the admin panel.

<script>alert("not safe")</script>
MARKDOWN;

    Livewire::test(PrivacyPolicySettings::class)
        ->assertOk()
        ->fillForm([
            'privacy_policy_markdown' => $markdown,
        ])
        ->call('save')
        ->assertNotified('Privacy policy saved');

    expect(Setting::privacyPolicyMarkdown())->toBe($markdown);

    $this->get(route('privacy-policy'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('privacy-policy')
            ->where('privacyPolicyHtml', fn (string $html): bool => str_contains($html, '<h1>Updated Privacy Policy</h1>')
                && str_contains($html, '<p>This policy was updated from the admin panel.</p>')
                && ! str_contains($html, '<script>'))
        );
});
