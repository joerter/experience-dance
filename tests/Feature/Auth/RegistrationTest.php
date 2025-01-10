<?php

use App\Constants\Permissions;
use App\Models\Permission;
use App\Models\User;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
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
