<?php

namespace App\Http\Controllers;

use App\Enums\ProductGalleryStatus;
use App\Models\ProductGalleryItem;
use App\Models\Review;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request, LandingPageController $landingPages): Response
    {
        $landingPage = Setting::landingPageForHost($request->getHost());

        if ($landingPage !== null) {
            return $landingPages->show($landingPage);
        }

        $reviews = Review::published()
            ->orderByDesc('featured')
            ->orderByDesc('created_at')
            ->limit(6)
            ->get(['id', 'name', 'title', 'rating', 'body']);

        return Inertia::render('home', [
            'content' => Setting::homepageContent(),
            'pricingPackages' => Setting::pricingPackageProps(),
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
