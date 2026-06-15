<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $reviews = Review::published()
            ->orderByDesc('featured')
            ->orderByDesc('created_at')
            ->limit(6)
            ->get(['id', 'name', 'title', 'rating', 'body']);

        return Inertia::render('home', [
            'resultLinks' => Setting::homepageResultLinks(),
            'pricingPackages' => collect(Setting::pricingPackages())
                ->map(fn (array $package): array => [
                    'slug' => $package['slug'],
                    'name' => $package['name'],
                    'accessDuration' => $package['access_duration'],
                    'amount' => $package['amount'],
                    'oldAmount' => $package['old_amount'],
                    'features' => $package['features'],
                    'badge' => $package['badge'],
                ])
                ->values(),
            'reviews' => $reviews,
        ]);
    }
}
