<?php

use App\Constants\Roles;
use App\Models\Role;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

describe('GET /oauth/google/callback', function () {

    test('grants the studio_owner and user role to new users', function () {
        $studioOwnerRole = Role::where('name', Roles::STUDIO_OWNER)->first();
        $userRole = Role::where('name', Roles::USER)->first();
        $this->assertNotNull($studioOwnerRole);
        $this->assertNotNull($userRole);

        $email = 'studio_owner@gmail.com';
        $socialiteUser = new SocialiteUser;
        $socialiteUser->map([
            'id' => '123456789',
            'name' => 'Test Dancer',
            'email' => $email,
            'avatar' => 'https://example.com/avatar.jpg',
            'token' => 'fake-token',
            'refreshToken' => 'fake-refresh-token',
        ]);

        Socialite::shouldReceive('driver')
            ->with('google')
            ->andReturn(Mockery::mock('Laravel\Socialite\Contracts\Provider')
            ->shouldReceive('user')
            ->andReturn($socialiteUser)
            ->getMock());

        $response = $this->get(route('oauth.google.callback'));

        $user = User::where('email', $email)->first();
        $this->assertNotNull($user);
        $this->assertTrue($user->hasRole($studioOwnerRole->name, null));
        $this->assertTrue($user->hasRole($userRole->name, null));
        $response->assertRedirect(route('dashboard'));
    });

    test('does not grant the studio_owner role to existing users', function () {
        $oauthId = '123456789';
        $userMap = [
            'name' => 'Studio Owner',
            'email' => 'studio_owner@gmail.com',
        ];
        $existingUser = User::factory()->create([...$userMap, 'oauth_id' => $oauthId]);

        $socialiteUser = new SocialiteUser;
        $socialiteUser->map([
            'id' => $oauthId,
            'avatar' => 'https://example.com/avatar.jpg',
            'token' => 'fake-token',
            'refreshToken' => 'fake-refresh-token',
            ...$userMap,
        ]);
        Socialite::shouldReceive('driver')
            ->with('google')
            ->andReturn(Mockery::mock('Laravel\Socialite\Contracts\Provider')
            ->shouldReceive('user')
            ->andReturn($socialiteUser)
            ->getMock());

        $this->get(route('oauth.google.callback'));

        $this->assertFalse($existingUser->hasRole(Roles::STUDIO_OWNER, null));
    });
});
