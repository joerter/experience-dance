<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    protected $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    public function index()
    {
        $featuredEvents = $this->eventService->getFeatured();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'featuredEventsData' => $featuredEvents
        ]);
    }
}
