<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout');
Route::post('/checkout', [CheckoutController::class, 'createSession'])->name('checkout.session');
Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');

Route::get('/reviews', [ReviewController::class, 'create'])->name('reviews.create');
Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');

Route::get('/privacy-policy', fn () => Inertia::render('privacy-policy'))->name('privacy-policy');

Route::get('/api/coupons/validate', [CouponController::class, 'validate'])->name('coupons.validate');
