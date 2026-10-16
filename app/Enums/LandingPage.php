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

    public function getLabel(): string
    {
        return match ($this) {
            self::Products => 'Landing page 2 (Products)',
            self::Contact => 'Landing page 3 (Contact)',
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
        };
    }

    public function configKey(): string
    {
        return "landing.{$this->value}";
    }

    public function component(): string
    {
        return "landing/{$this->value}";
    }
}
