<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function studioOwner()
    {
        return Inertia::render('Onboarding/StudioOwner');
    }
}
