<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PasswordlessLoginController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/PasswordlessLogin');
    }

    public function sendLoginLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return back()->with('status', 'We sent you a login link! Check your email.');
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
        ], function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Your Experience Dance Login Link');
        });

        return back()->with('status', 'We sent you a login link! Check your email.');
    }

    public function verify(Request $request, $token)
    {
        $token = LoginToken::where('token', $token)
            ->where('expires_at', '>', now())
            ->first();

        if (! $token) {
            return redirect()->route('login')
                ->with('error', 'Invalid or expired login link.');
        }

        $user = User::firstOrCreate(
            ['email' => $token->email],
            ['name' => explode('@', $token->email)[0]]
        );

        Auth::login($user);

        $token->delete();

        return redirect()->intended(route('dashboard'));
    }
}
