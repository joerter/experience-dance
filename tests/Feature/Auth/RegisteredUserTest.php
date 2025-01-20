<?php

use App\Mail\LoginToken as MailLoginToken;
use App\Mail\RegisterToken;
use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

describe('GET /register', function () {
    test('registration screen can be rendered', function () {
        $response = $this->get('/register');

        $response->assertStatus(200);
    });
});

describe('POST /register', function () {
    test('creates user, responds with 302 and sends registration link', function () {
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

    test('sends login token when an existing email tries to register', function () {
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
});

describe('GET /register/verify/{token}', function () {
    test('redirects back to register with message when token does not exist', function () {
        $response = $this->get(route('register.verify.token', ['token' => 'bad-token']));

        $response->assertRedirect(route('register'));
        $response->assertSessionHas('error', 'Sorry, the registration link you used is either invalid or expired. Please try again.');
    });

    test('redirects to dashboard when the token is successfully verified', function () {
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
});


/* test('registered users can create organizations', function () { */
/*     $createOrganizationPermission = Permission::where('slug', Permissions::ORGANIZATION_CREATE)->first(); */
/*     $this->assertNotNull($createOrganizationPermission); */
/**/
/*     $response = $this->post('/register', [ */
/*         'name' => 'Test User', */
/*         'email' => 'test@myballetcompany.com', */
/*         'password' => 'password', */
/*         'password_confirmation' => 'password', */
/*     ]); */
/**/
/*     $this->assertAuthenticated(); */
/*     $response->assertRedirect(route('dashboard', absolute: false)); */
/**/
/*     $user = User::where('email', 'test@myballetcompany.com')->first(); */
/*     $this->assertNotNull($user); */
/**/
/*     $userPermissions = $user->permissions()->get(); */
/**/
/*     $this->assertTrue($userPermissions->contains($createOrganizationPermission)); */
/*     $this->assertTrue($userPermissions->pluck('slug')->contains(Permissions::ORGANIZATION_CREATE)); */
/* }); */
