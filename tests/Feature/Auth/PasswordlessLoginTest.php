<?php

use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

describe('login.send-link', function () {
    test('redirects back to login when the user is not found', function () {
        $response = $this->post(route('login.send-link'), ['email' => 'test@user.com']);

        $response->assertRedirect('login');
        $response->assertSessionHas('status', 'We sent you a login link! Check your email.');
    });

    test('responds with 302 and sends magic link email when the user is found', function () {
        $testEmail = 'test@user.come';
        Mail::shouldReceive('send')->once()->andReturnUsing(function ($view, $data, $callback) {
            $this->assertEquals('emails.magic-link', $view);
            $this->assertEquals(route('login.verify', ['token' => $data['token']]), $data['url']);
            $this->assertEquals($data['token'], $data['token']);
        });
        User::factory()->create(['email' => $testEmail]);

        $response = $this->post(route('login.send-link'), ['email' => $testEmail]);

        $response->assertRedirect('login');
        $response->assertSessionHas('status', 'We sent you a login link! Check your email.');
    });
});

describe('login.verify.token', function () {
    test('redirects back to login with message when token does not exist', function () {
        $response = $this->get(route('login.verify.token', ['token' => 'bad-token']));

        $response->assertRedirect(route('login'));
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

        $response = $this->get(route('login.verify.token', ['token' => $token->token]));

        $response->assertRedirect(route('dashboard'));
    });
});

describe('login.verify.code', function (){
    test('redirects back to login with message when code does not exist', function () {
        $response = $this->post(route('login.verify.code'), ['code' => 'bad-token']);

        $response->assertRedirect(route('login'));
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

        $response = $this->post(route('login.verify.code', ['code' => $token->code]));

        $response->assertRedirect(route('dashboard'));
    });
});
