<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\EmailAuthenticationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailLoginController extends Controller
{
    protected $emailAuthenticationService;

    public function __construct(EmailAuthenticationService $emailAuthenticationService)
    {
        $this->emailAuthenticationService = $emailAuthenticationService;
    }

    public function show()
    {
        return Inertia::render('Auth/Login');
    }

    public function showVerifyCode()
    {
        return Inertia::render('Auth/VerifyCode');
    }

    public function sendLoginLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $this->emailAuthenticationService->handleLoginRequest($request->email);

        return to_route('login.showVerifyCode');
    }

    public function verifyToken(Request $request, $token)
    {
        $isValid = $this->emailAuthenticationService->isValidLoginToken($token);
        if (! $isValid) {
            return redirect()->route('login.show')
                ->with('error', 'Invalid or expired login link.');
        }
        return to_route('dashboard');
    }

    public function verifyCode(Request $request)
    {
        $request->validate(['code' => 'required']);

        $isValid = $this->emailAuthenticationService->isValidLoginCode($request->code);
        if (! $isValid) {
            return redirect()->route('login.show')
                ->with('error', 'Invalid or expired login code.');
        }
        return to_route('dashboard');
    }
}
