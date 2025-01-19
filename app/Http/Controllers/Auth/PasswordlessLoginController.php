<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\PasswordlessLoginService;
use Illuminate\Http\Request;
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
        return Inertia::render('Auth/Login');
    }

    public function showVefiyCode()
    {
        return Inertia::render('Auth/VerifyCode');
    }

    public function sendLoginLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $this->passwordlessLoginService->handleLoginRequest($request->email);

        return redirect()->intended(route('login.verify.code.show'));
    }

    public function verifyToken(Request $request, $token)
    {
        $isValid = $this->passwordlessLoginService->isValidLoginToken($token);
        if (! $isValid) {
            return redirect()->route('login')
                ->with('error', 'Invalid or expired login link.');
        }
        return redirect()->intended(route('dashboard'));
    }

    public function verifyCode(Request $request)
    {
        $request->validate(['code' => 'required']);

        $isValid = $this->passwordlessLoginService->isValidLoginCode($request->code);
        if (! $isValid) {
            return redirect()->route('login')
                ->with('error', 'Invalid or expired login code.');
        }
        return redirect()->intended(route('dashboard'));
    }
}
