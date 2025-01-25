<?php

namespace App\Services;

use App\Constants\Roles;
use App\Mail\LoginToken as MailLoginToken;
use App\Mail\RegisterToken;
use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PasswordlessLoginService
{
    public function show()
    {
        return Inertia::render('Login');
    }

    public function handleLoginRequest($email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) {
                return;
            }

            $token = $this->createLoginToken($user->id);

            Mail::to($user)->send(new MailLoginToken(route('login.verify.token', ['token' => $token->token]), $token->code));
        } catch (\Exception $e) {
            report($e);
            return;
        }
    }

    public function maybeRegisterNewUser($name, $email)
    {
        try {
            $existingUser = User::where('email', $email)->first();
            if ($existingUser) {
                Log::info('handleRegisterRequest existing user', ['email' => $email]);
                $this->handleLoginRequest($email);
                return null;
            }

            $user = $this->createStudioOwnerUser($name, $email);
            $token = $this->createLoginToken($user->id);

            Mail::to($user)->send(new RegisterToken(route('register.verify.token', ['token' => $token->token])));

            return $user;
        } catch (\Exception $e) {
            report($e);
            return null;
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

            if (! $user->email_verified_at) {
                $user->email_verified_at = now();
                $user->save();
            }

            Auth::login($user);

            $token->delete();
            return true;
        } catch (\Exception $e) {
            Log::error('isValidLoginToken error', ['error' => $e->getMessage()]);
            return false;
        }
    }

    public function isValidLoginCode($code)
    {
        try {
            $token = LoginToken::where('code', $code)
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
            report($e);
            return false;
        }
    }

    private function createLoginToken($userId)
    {
        return LoginToken::create([
            'user_id' => $userId,
            'token' => Str::random(32),
            'code' => str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT),
            'created_at' => now(),
            'expires_at' => now()->addMinutes(15),
        ]);
    }

    private function createStudioOwnerUser($name, $email)
    {

        $user = User::create(['name' => $name, 'email' => $email]);
        $user->addRoles([Roles::STUDIO_OWNER, Roles::USER]);
        return $user;
    }

}
