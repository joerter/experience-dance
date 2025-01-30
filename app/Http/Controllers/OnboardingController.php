<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudioOwnerOnboardingRequest;
use App\Services\OnboardingService;
use Carbon\CarbonTimeZone;
use DateTimeZone;
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
        $mainTimezones = [
            'America/New_York',    // Eastern
            'America/Chicago',     // Central
            'America/Denver',      // Mountain
            'America/Los_Angeles', // Pacific
            'America/Anchorage',   // Alaska
            'Pacific/Honolulu',    // Hawaii
        ];
        $timezones = collect(CarbonTimeZone::listIdentifiers(DateTimeZone::PER_COUNTRY, 'US'))
            ->filter(fn($timezone) => in_array($timezone, $mainTimezones))
            ->mapWithKeys(function ($timezone) {
                $dateTime = now()->setTimezone($timezone);
                $name = $dateTime->tzName . ' (' . $dateTime->format('T') . ')';
                return [$timezone => $name];
            });

        return Inertia::render('Onboarding/StudioOwner', [
            'timezones' => $timezones,
        ]);
    }

    public function studioOwnerStore(StoreStudioOwnerOnboardingRequest $request)
    {
        $validated = $request->validated();
        $team = $this->onboardingService->createStudio($validated);
        $this->onboardingService->initializeTeamForUser($request->user(), $team);

        return to_route('dashboard');
    }
}
