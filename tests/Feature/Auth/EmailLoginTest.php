<?php

use App\Mail\LoginToken as MailLoginToken;
use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

describe('POST login', function () {
    test('redirects to login.verify.code.show and sends magic link email when the user is found', function () {
        $testEmail = 'test@user.come';
        Mail::fake();

        User::factory()->create(['email' => $testEmail]);

        $response = $this->post(route('login.sendLoginLink'), ['email' => $testEmail]);

        Mail::assertSent(MailLoginToken::class, function ($mail) use ($testEmail) {
            return $mail->hasTo($testEmail);
        });
        $response->assertRedirect(route('login.showVerifyCode'));
    });

    test('still redirects to login.verify.code.show when the user is not found', function () {
        $response = $this->post(route('login.sendLoginLink'), ['email' => 'test@user.com']);

        $response->assertRedirect(route('login.showVerifyCode'));
    });
});

describe('GET login/verify/token/{token}', function () {
    test('redirects back to login with message when token does not exist', function () {
        $response = $this->get(route('login.verifyToken', ['token' => 'bad-token']));

        $response->assertRedirect(route('login.show'));
        $response->assertSessionHas('error', 'Invalid or expired login link.');
    });

    test('redirects to dashboard when the token is sucessfully verified', function () {
        $user = User::factory()->create();
        $token = LoginToken::create([
            'user_id' => $user->id,
            'token' => Str::random(32),
            'code' => '123456',
            'created_at' => now(),
            'expires_at' => now()->addMinutes(15),
        ]);

        $response = $this->get(route('login.verifyToken', ['token' => $token->token]));

        $response->assertRedirect(route('dashboard'));
    });
});

describe('POST login/verify/code', function () {
    test('redirects back to login with message when code does not exist', function () {
        $response = $this->post(route('login.verifyCode'), ['code' => 'bad-token']);

        $response->assertRedirect(route('login.show'));
        $response->assertSessionHas('error', 'Invalid or expired login code.');
    });

    test('redirects to dashboard when the code is sucessfully verified', function () {
        $user = User::factory()->create();
        $token = LoginToken::create([
            'user_id' => $user->id,
            'token' => Str::random(32),
            'code' => '123456',
            'created_at' => now(),
            'expires_at' => now()->addMinutes(15),
        ]);

        $response = $this->post(route('login.verifyCode', ['code' => $token->code]));

        $response->assertRedirect(route('dashboard'));
    });
});
