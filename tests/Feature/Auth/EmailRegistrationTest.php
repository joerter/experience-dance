<?php

use App\Constants\Roles;
use App\Mail\LoginToken as MailLoginToken;
use App\Mail\RegisterToken;
use App\Models\LoginToken;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

describe('GET /register', function () {
    it('registration screen can be rendered', function () {
        $response = $this->get('/register');

        $response->assertStatus(200);
    });
});

describe('POST /register', function () {
    it('creates user, responds with 302 and sends registration link', function () {
        $email = 'test@example.com';
        Mail::fake();

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => $email,
        ]);

        Mail::assertSent(RegisterToken::class, function ($mail) use ($email) {
            return $mail->hasTo($email);
        });
        $response->assertRedirect(route('register.await.token'));
    });

    it('sends login token when an existing email tries to register', function () {
        $existingEmail = 'existing@example.com';
        Mail::fake();
        $existingUser = User::factory()->create([
            'email' => $existingEmail,
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => $existingEmail,
        ]);

        $token = LoginToken::where('user_id', $existingUser->id)->first();
        Mail::assertSent(MailLoginToken::class, function ($mail) use ($existingEmail, $token) {
            return $mail->hasTo($existingEmail) &&
                $mail->url === (route('login.verify.token', ['token' => $token->token]));
        });
        $response->assertRedirect(route('register.await.token'));
    });

    it('grants the studio_owner and user role to new users', function () {
        $studioOwnerRole = Role::where('name', Roles::STUDIO_OWNER)->first();
        $this->assertNotNull($studioOwnerRole);

        $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@myballetcompany.com',
        ]);
        $user = User::where('email', 'test@myballetcompany.com')->first();
        $this->assertNotNull($user);

        $this->assertTrue($user->hasRole($studioOwnerRole->name, null));
    });

    it('does not grant the studio_owner role when an existing user tries to register again', function () {
        $existingEmail = 'existing@example.com';
        Mail::fake();
        $existingUser = User::factory()->create([
            'email' => $existingEmail,
        ]);

        $this->post('/register', [
            'name' => 'Test User',
            'email' => $existingEmail,
        ]);

        $this->assertFalse($existingUser->hasRole(Roles::STUDIO_OWNER, null));
    });
});

describe('GET /register/verify/{token}', function () {
    it('redirects back to register with message when token does not exist', function () {
        $response = $this->get(route('register.verify.token', ['token' => 'bad-token']));

        $response->assertRedirect(route('register'));
        $response->assertSessionHas('error', 'Sorry, the registration link you used is either invalid or expired. Please try again.');
    });

    it('redirects to dashboard when the token is successfully verified', function () {
        $user = User::factory()->create();
        $token = LoginToken::create([
            'user_id' => $user->id,
            'token' => Str::random(32),
            'code' => '123456',
            'created_at' => now(),
            'expires_at' => now()->addMinutes(15),
        ]);

        $response = $this->get(route('register.verify.token', ['token' => $token->token]));
        $response->assertRedirect(route('dashboard'));
    });

    it('sets the users email_verfied_at if necessary', function () {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);
        $token = LoginToken::create([
            'user_id' => $user->id,
            'token' => Str::random(32),
            'code' => '123456',
            'created_at' => now(),
            'expires_at' => now()->addMinutes(15),
        ]);

        $this->get(route('register.verify.token', ['token' => $token->token]));
        $user->refresh();
        $this->assertNotNull($user->email_verified_at);
    });
});
