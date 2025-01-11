<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use App\Services\OrganizationService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    protected $eventService;
    protected $organizationService;

    public function __construct(EventService $eventService, OrganizationService $organizationService)
    {
        $this->eventService = $eventService;
        $this->organizationService = $organizationService;
    }

    public function index()
    {
        $upcomingEventCount = $this->eventService->getUpcomingCount();
        $organizationCount = $this->organizationService->getCount();
        $featuredEvents = $this->eventService->getFeatured();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'featuredEventsData' => $featuredEvents,
            'showEventAndOrgSearch' => $upcomingEventCount > 0 || $organizationCount > 0,
        ]);
    }
}
