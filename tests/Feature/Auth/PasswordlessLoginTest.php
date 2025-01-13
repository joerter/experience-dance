<?php

use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('it responds with 302 when the user is not found', function () {
    $response = $this->post('/login', ['email' => 'test@user.com']);

    $response->assertStatus(302);
    $response->assertSessionHas('status', 'We sent you a login link! Check your email.');
});

test('it responds with 302 and sends magic link email when the user is found', function () {
    $testEmail = 'test@user.come';
    Mail::shouldReceive('send')->once()->andReturnUsing(function ($view, $data, $callback) {
        $this->assertEquals('emails.magic-link', $view);
        $this->assertEquals(route('login.verify', ['token' => $data['token']]), $data['url']);
        $this->assertEquals($data['token'], $data['token']);
    });
    User::factory()->create(['email' => $testEmail]);

    $response = $this->post('/login', ['email' => $testEmail]);

    $response->assertStatus(302);
    $response->assertSessionHas('status', 'We sent you a login link! Check your email.');
});
