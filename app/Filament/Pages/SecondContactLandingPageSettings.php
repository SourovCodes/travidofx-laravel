<?php

namespace App\Filament\Pages;

use App\Enums\LandingPage;

/**
 * Landing page 4: a separately managed copy of the contact landing page.
 */
class SecondContactLandingPageSettings extends ContactLandingPageSettings
{
    protected static ?int $navigationSort = 4;

    public static function landingPage(): LandingPage
    {
        return LandingPage::SecondContact;
    }
}
