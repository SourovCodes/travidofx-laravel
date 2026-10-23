<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectLandingDomainToMainSite;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->prepend(RedirectLandingDomainToMainSite::class);

        // LiteSpeed returns a bare 500 when response headers pass ~8 KB, and the
        // pages preload 100+ assets. The HTML still preloads all of them.
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::using(20),
        ]);

        $middleware->preventRequestForgery(except: [
            'stripe/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
