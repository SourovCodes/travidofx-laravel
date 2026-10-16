<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectLandingDomainToMainSite
{
    /**
     * Landing domains only serve their home page; every other path continues on the main website.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->path() === '/' || Setting::landingPageForHost($request->getHost()) === null) {
            return $next($request);
        }

        return redirect()->away(rtrim((string) config('app.url'), '/').$request->getRequestUri());
    }
}
