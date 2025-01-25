<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RoleService;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleOauthController extends Controller
{
    private RoleService $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $oauthId = $googleUser->getId();
            $existingUser = User::where('oauth_id', $oauthId)->first();

            $oauthMap = [
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'avatar_url' => $googleUser->getAvatar(),
                'oauth_provider' => 'google',
                'oauth_token' => $googleUser->token,
                'oauth_refresh_token' => $googleUser->refreshToken,
            ];

            if ($existingUser) {
                $existingUser->update($oauthMap);
                Auth::login($existingUser);
                return redirect(route('dashboard'));
            }

            $newUser = User::create([
                'oauth_id' => $oauthId,
                ...$oauthMap
            ]);
            $this->roleService->grantStudioOwnerRole($newUser);

            Auth::login($newUser);

            return redirect(route('dashboard'));
        } catch (Exception $e) {
            report($e);
            return redirect('/')->with('error', 'Unable to login with Google.');
        }
    }
}
