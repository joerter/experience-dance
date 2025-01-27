<?php

use App\Constants\Roles;
use App\Models\Role;
use App\Models\User;

describe('POST /onboarding/studio', function () {

    test('it should create an organization and team', function () {
        $studioOwner = User::factory()->studioOwner()->create();

        $response = $this->actingAs($studioOwner)->post(route('onboarding.studio.store'), [
            'studio_name' => 'Test Studio',
            'phone' => '1234567890',
            'street_line_1' => '123 Main St',
            'street_line_2' => 'Apt 1',
            'city' => 'New York',
            'state' => 'NY',
            'postal_code' => '10001',
            'website' => 'https://teststudio.com',
            'timezone' => 'America/New_York',
        ]);

        $response->assertStatus(200);
    });
});
