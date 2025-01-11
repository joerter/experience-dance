<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class OauthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate([
                'oauth_id' => $googleUser->getId(),
            ], [
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'avatar_url' => $googleUser->getAvatar(),
                'oauth_provider' => 'google',
                'oauth_token' => $googleUser->token,
                'oauth_refresh_token' => $googleUser->refreshToken,
            ]);

            Auth::login($user);

            return redirect('/dashboard');
        } catch (Exception $e) {
            Log::error('Google OAuth failed', ['error' => $e->getMessage()]);
            return redirect('/')->with('error', 'Unable to login with Google.');
        }
    }
}
