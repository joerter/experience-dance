<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\LoginToken;
use App\Models\User;
use App\Services\PasswordlessLoginService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PasswordlessLoginController extends Controller
{
    protected $passwordlessLoginService;

    public function __construct(PasswordlessLoginService $passwordlessLoginService)
    {
        $this->passwordlessLoginService = $passwordlessLoginService;
    }

    public function show()
    {
        return Inertia::render('Auth/PasswordlessLogin');
    }

    public function sendLoginLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $this->passwordlessLoginService->handleLoginRequest($request->email);

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
