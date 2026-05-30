<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('reviews/create');
    }

    public function store(Request $request): RedirectResponse
    {
        if ($request->filled('website')) {
            return redirect()
                ->route('reviews.create')
                ->with('success', 'Thanks. Your review is waiting for approval.');
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:80'],
            'email' => ['required', 'email', 'max:120'],
            'title' => ['nullable', 'string', 'max:80'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'body' => ['required', 'string', 'min:20', 'max:700'],
        ]);

        Review::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'title' => $data['title'] ?? '',
            'rating' => $data['rating'],
            'body' => $data['body'],
            'status' => Review::STATUS_PENDING,
        ]);

        return redirect()
            ->route('reviews.create')
            ->with('success', 'Thanks. Your review is waiting for approval.');
    }
}
