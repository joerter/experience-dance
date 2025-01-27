<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudioOwnerOnboardingRequest;
use App\Services\OnboardingService;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    private OnboardingService $onboardingService;

    public function __construct(OnboardingService $onboardingService)
    {
        $this->onboardingService = $onboardingService;
    }

    public function studioOwner()
    {
        return Inertia::render('Onboarding/StudioOwner');
    }

    public function studioOwnerStore(StoreStudioOwnerOnboardingRequest $request)
    {
        $validated = $request->validated();
        $this->onboardingService->createStudio($validated);
    }
}
