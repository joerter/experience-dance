<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\PasswordlessLoginService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    protected $passwordlessLoginService;

    public function __construct(PasswordlessLoginService $passwordlessLoginService)
    {
        $this->passwordlessLoginService = $passwordlessLoginService;
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
        ]);

        $this->passwordlessLoginService->handleRegisterRequest($request->name, $request->email);
        return to_route('register.await.token');
    }

    public function awaitToken(): Response
    {
        return Inertia::render('Auth/AwaitRegisterToken');
    }

    public function verfiyToken(Request $request, $token): RedirectResponse
    {
        $isValid = $this->passwordlessLoginService->isValidLoginToken($token);
        if (! $isValid) {
            return redirect()->route('register')
                ->with('error', 'Sorry, the registration link you used is either invalid or expired. Please try again.');
        }

        return to_route('dashboard');
    }
}
