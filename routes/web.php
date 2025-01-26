<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventSearchController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index']);

// Create a controller for the dashboard
// Make it so that it redirects to organization create if the user doesn't have a studio and has the permissions

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('is-team-member')->name('dashboard');

    Route::get('/onboarding/studio', [OnboardingController::class, 'studioOwner'])->name('onboarding.studio.create');
    Route::post('/onboarding/studio', [OnboardingController::class, 'studioOwnerStore'])->name('onboarding.studio.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/api/event-search', [EventSearchController::class, 'search'])->name('api.event-search');

require __DIR__ . '/auth.php';
