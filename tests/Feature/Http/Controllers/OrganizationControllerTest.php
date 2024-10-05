<?php

use App\Constants\Permissions;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('new organizations owners can create events', function () {
    $createOrganizationPermission = Permission::where('slug', Permissions::EVENTS_CREATE)->first();
    $this->assertNotNull($createOrganizationPermission);

    $response = $this->post('/register', [
        'name' => 'Test Studio Owner',
        'email' => 'test@example-studio.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::where('email', 'test@example-studio.com')->first();
    $this->assertNotNull($user);

    $userPermissions = $user->permissions()->get();

    $this->assertTrue($userPermissions->contains($createOrganizationPermission));
    $this->assertTrue($userPermissions->pluck('slug')->contains(Permissions::STUDIO_CREATE));
});

