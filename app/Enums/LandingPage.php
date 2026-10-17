<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

/**
 * Landing pages served on their own domains. The main website counts as landing page 1.
 */
enum LandingPage: string implements HasLabel
{
    case Products = 'products';
    case Contact = 'contact';
    case SecondContact = 'second-contact';

    public function getLabel(): string
    {
        return match ($this) {
            self::Products => 'Landing page 2 (Products)',
            self::Contact => 'Landing page 3 (Contact)',
            self::SecondContact => 'Landing page 4 (Contact 2)',
        };
    }

    /**
     * Setting key holding this page's domain list. The contact page keeps the key it launched with.
     */
    public function domainsSettingKey(): string
    {
        return match ($this) {
            self::Products => 'landing_page_products_domains',
            self::Contact => 'landing_page_domains',
            self::SecondContact => 'landing_page_second_contact_domains',
        };
    }

    /**
     * Setting key holding this page's saved content. The contact page keeps the key it launched with.
     */
    public function contentSettingKey(): string
    {
        return match ($this) {
            self::Products => 'landing_page_products_content',
            self::Contact => 'landing_page_content',
            self::SecondContact => 'landing_page_second_contact_content',
        };
    }

    /**
     * Landing page 4 is a second copy of the contact page, so it shares its design and defaults.
     */
    public function template(): self
    {
        return $this === self::SecondContact ? self::Contact : $this;
    }

    public function configKey(): string
    {
        return "landing.{$this->template()->value}";
    }

    public function component(): string
    {
        return "landing/{$this->template()->value}";
    }

    /**
     * Domains used before an admin saves any. Copies start without domains so they never clash.
     *
     * @return array<int, string>
     */
    public function defaultDomains(): array
    {
        return $this === $this->template() ? config("{$this->configKey()}.domains", []) : [];
    }
}
