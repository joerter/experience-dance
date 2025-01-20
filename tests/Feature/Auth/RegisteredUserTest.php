<?php

use App\Mail\LoginToken as MailLoginToken;
use App\Mail\RegisterToken;
use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

describe('register show', function () {
    test('registration screen can be rendered', function () {
        $response = $this->get('/register');

        $response->assertStatus(200);
    });
});

describe('register create', function () {
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
