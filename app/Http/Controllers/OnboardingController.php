<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function studioOwner()
    {
        return Inertia::render('Onboarding/StudioOwner');
    }

    public function studioOwnerStore(Request $request)
    {
        dd($request->all());
    }
}
