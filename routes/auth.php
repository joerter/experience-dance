<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\GoogleOauthController;
use App\Http\Controllers\Auth\EmailLoginController;
use App\Http\Controllers\Auth\EmailRegistrationController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [EmailRegistrationController::class, 'create'])
        ->name('register');
    Route::post('register', [EmailRegistrationController::class, 'store'])
        ->name('register.send-link');
    Route::get('register/await/token', [EmailRegistrationController::class, 'awaitToken'])
        ->name('register.await.token');
    Route::get('register/verify/{token}', [EmailRegistrationController::class, 'verfiyToken'])
        ->name('register.verify.token');

    Route::get('login', [EmailLoginController::class, 'show'])
        ->name('login');
    Route::post('login', [EmailLoginController::class, 'sendLoginLink'])
        ->name('login.send-link');

    Route::get('login/verify/token/{token}', [EmailLoginController::class, 'verifyToken'])
        ->name('login.verify.token');

    Route::get('login/verify/code', [EmailLoginController::class, 'showVefiyCode'])
        ->name('login.verify.code.show');
    Route::post('login/verify/code', [EmailLoginController::class, 'verifyCode'])
        ->name('login.verify.code');

    Route::get('/oauth/google/redirect', [GoogleOauthController::class, 'redirect'])->name('oauth.google.redirect');
    Route::get('/oauth/google/callback', [GoogleOauthController::class, 'callback'])->name('oauth.google.callback');
});

Route::middleware('auth')->group(function () {
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
