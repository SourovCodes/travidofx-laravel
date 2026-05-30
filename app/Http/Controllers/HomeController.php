<?php

namespace App\Http\Controllers;

use App\Models\Review;
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
            'reviews' => $reviews,
        ]);
    }
}
