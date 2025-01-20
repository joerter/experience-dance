<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordlessLoginController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store'])
        ->name('register.send-link');
    Route::get('register/await/token', [RegisteredUserController::class, 'awaitToken'])
        ->name('register.await.token');
    Route::get('register/verify/{token}', [RegisteredUserController::class, 'verfiyToken'])
        ->name('register.verify.token');

    Route::get('login', [PasswordlessLoginController::class, 'show'])
        ->name('login');
    Route::post('login', [PasswordlessLoginController::class, 'sendLoginLink'])
        ->name('login.send-link');

    Route::get('login/verify/token/{token}', [PasswordlessLoginController::class, 'verifyToken'])
        ->name('login.verify.token');

    Route::get('login/verify/code', [PasswordlessLoginController::class, 'showVefiyCode'])
        ->name('login.verify.code.show');
    Route::post('login/verify/code', [PasswordlessLoginController::class, 'verifyCode'])
        ->name('login.verify.code');
});

Route::middleware('auth')->group(function () {
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
