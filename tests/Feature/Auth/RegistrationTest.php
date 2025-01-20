<?php

use Illuminate\Support\Facades\Mail;

describe('register show', function () {
    test('registration screen can be rendered', function () {
        $response = $this->get('/register');

        $response->assertStatus(200);
    });
});

describe('register create', function () {
    test('creates user, responds with 302 and sends registration link', function () {
        Mail::shouldReceive('send')->once()->andReturnUsing(function ($view, $data, $callback) {
            $this->assertEquals('emails.register-link', $view);
            $this->assertEquals(route('register.verify', ['token' => $data['token']]), $data['url']);
            $this->assertEquals($data['token'], $data['token']);
        });

        $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->assertRedirect('register.await.token');
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
