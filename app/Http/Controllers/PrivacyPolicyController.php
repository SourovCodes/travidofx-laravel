<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class PrivacyPolicyController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('privacy-policy', [
            'privacyPolicyHtml' => Setting::privacyPolicyHtml(),
        ]);
    }
}
