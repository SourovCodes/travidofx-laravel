<?php

namespace App\Http\Controllers;

use App\Enums\LandingPage;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function show(LandingPage $page): Response
    {
        return Inertia::render($page->component(), match ($page->template()) {
            LandingPage::Products => $this->productsProps(),
            LandingPage::Contact => ['content' => Setting::contactLandingContent($page)],
        });
    }

    /**
     * Checkout and other main website pages live on the main domain, so links use its absolute URL.
     *
     * @return array<string, mixed>
     */
    private function productsProps(): array
    {
        $mainSiteUrl = rtrim((string) config('app.url'), '/');

        return [
            'content' => Setting::productsLandingContent(),
            'mainSiteUrl' => $mainSiteUrl,
            'pricingPackages' => Setting::pricingPackageProps(),
        ];
    }
}
