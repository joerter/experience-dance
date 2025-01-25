<?php

use App\Constants\Roles;
use Tests\TestCase;
use App\Models\Team;
use App\Models\User;

describe('EnsureTeamMember', function () {
    test('studio owner without team redirects to onboarding', function () {
        $user = User::factory()->create();
        $user->addRole(Roles::STUDIO_OWNER);

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertRedirect(route('onboarding.studio'));
    });

    test('user with team can access protected route', function () {
        $user = User::factory()->create();
        $team = Team::factory()->create();
        $user->addRole(Roles::STUDIO_OWNER, $team);

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertOk();
    });
});
