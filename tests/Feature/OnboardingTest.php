<?php

use App\Models\Organization;
use App\Models\User;

describe('POST onboarding.studio.store', function () {
    it('should create an organization and team', function () {
        $studioOwner = User::factory()->studioOwner()->create();

        $studioOwnerOnboardingRequest = [
            'studio_name' => 'Test Studio',
            'phone' => '1234567890',
            'street_line_1' => '123 Main St',
            'street_line_2' => 'Apt 1',
            'city' => 'New York',
            'state' => 'NY',
            'postal_code' => '10001',
            'website' => 'https://teststudio.com',
            'timezone' => 'America/Chicago',
        ];
        $response = $this->actingAs($studioOwner)->post(route('onboarding.studio.store'), $studioOwnerOnboardingRequest);

        $response->assertStatus(200);

        $organization = Organization::where('name', 'Test Studio')->first();
        $team = $organization->teams()->where('name', 'Test Studio')->first();
        $address = $organization->address()->first();
        $this->assertNotNull($organization);
        $this->assertNotNull($team);
        $this->assertNotNull($address);

        expect($organization->name)->toBe($studioOwnerOnboardingRequest['studio_name']);
        expect($organization->website)->toBe($studioOwnerOnboardingRequest['website']);

        expect($address->street_line_1)->toBe($studioOwnerOnboardingRequest['street_line_1']);
        expect($address->street_line_2)->toBe($studioOwnerOnboardingRequest['street_line_2']);
        expect($address->city)->toBe($studioOwnerOnboardingRequest['city']);
        expect($address->state)->toBe($studioOwnerOnboardingRequest['state']);
        expect($address->postal_code)->toBe($studioOwnerOnboardingRequest['postal_code']);
        expect($address->timezone)->toBe($studioOwnerOnboardingRequest['timezone']);

        expect($team->name)->toBe($studioOwnerOnboardingRequest['studio_name']);
        expect($team->display_name)->toBe($studioOwnerOnboardingRequest['studio_name']);
    });
});
