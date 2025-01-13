<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordlessLoginController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [PasswordlessLoginController::class, 'show'])
        ->name('login');
    Route::post('login', [PasswordlessLoginController::class, 'sendLoginLink'])
        ->name('login.send-link');
    Route::get('login/verify/{token}', [PasswordlessLoginController::class, 'verify'])
        ->name('login.verify');

});

Route::middleware('auth')->group(function () {
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
