<?php

namespace App\Services;

use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordlessLoginService
{
    public function handleLoginRequest($email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) {
                return;
            }

            $token = LoginToken::create([
                'user_id' => $user->id,
                'token' => Str::random(32),
                'created_at' => now(),
                'expires_at' => now()->addMinutes(15),
            ]);

            Mail::send('emails.magic-link', [
                'url' => route('login.verify', ['token' => $token->token]),
                'token' => $token->token
            ], function ($message) use ($email) {
                $message->to($email)
                    ->subject('Your Experience Dance Login Link');
            });
        } catch (\Exception $e) {
            Log::error('handleLoginRequest error', ['error' => $e->getMessage()]);
            return;
        }
    }

    public function isValidLoginToken($token)
    {
        try {
            $token = LoginToken::where('token', $token)
                ->where('expires_at', '>', now())
                ->first();

            if (! $token) {
                return false;
            }

            $user = $token->user;
            if (! $user) {
                return false;
            }

            Auth::login($user);

            $token->delete();
            return true;
        } catch (\Exception $e) {
            Log::error('isValidLoginToken error', ['error' => $e->getMessage()]);
            return false;
        }
    }
}
