<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudioOwnerOnboardingRequest;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function studioOwner()
    {
        return Inertia::render('Onboarding/StudioOwner');
    }

    public function studioOwnerStore(StoreStudioOwnerOnboardingRequest $request)
    {
        $validated = $request->validated();
        dd($validated);
    }
}
