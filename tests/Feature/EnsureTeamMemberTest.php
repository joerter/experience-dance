<?php

use App\Constants\Roles;
use App\Constants\SessionKeys;
use App\Models\Organization;
use App\Models\Team;
use App\Models\User;

describe('EnsureTeamMember', function () {
    test('studio owner without team redirects to onboarding', function () {
        $user = User::factory()->create();
        $user->addRole(Roles::STUDIO_OWNER);

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertRedirect(route('onboarding.studio.create'));
    });

    test('user with team can access protected route', function () {
        $user = User::factory()->create();
        $organization = Organization::factory()->has(Team::factory()->count(1))->create();
        $team = $organization->teams->first();
        $user->addRole(Roles::STUDIO_OWNER, $team);

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertOk();
    });

    test('user with team gets team_id set in session', function () {
        $user = User::factory()->create();
        $organization = Organization::factory()->has(Team::factory()->count(1))->create();
        $team = $organization->teams->first();
        $user->addRole(Roles::STUDIO_ADMIN, $team);

        $this->actingAs($user)
            ->get('/dashboard');

        $this->assertEquals($team->id, session(SessionKeys::TEAM_ID));
    });
});
