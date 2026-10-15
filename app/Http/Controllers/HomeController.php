<?php

namespace App\Http\Controllers;

use App\Enums\ProductGalleryStatus;
use App\Models\ProductGalleryItem;
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
            'content' => Setting::homepageContent(),
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
            'gallery' => $this->gallery(),
        ]);
    }

    /**
     * Published gallery items grouped by status tab.
     *
     * @return array<string, array<int, array{id: int, title: string, description: string|null, image: string|null, downloadUrl: string|null}>>
     */
    private function gallery(): array
    {
        $items = ProductGalleryItem::published()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $gallery = [];

        foreach (ProductGalleryStatus::cases() as $status) {
            $gallery[$status->value] = $items
                ->where('status', $status)
                ->map(fn (ProductGalleryItem $item): array => [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->description,
                    'image' => $item->imageUrl(),
                    'downloadUrl' => $item->download_url,
                ])
                ->values()
                ->all();
        }

        return $gallery;
    }
}
