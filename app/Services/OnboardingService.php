<?php

namespace App\Services;

use App\Models\Address;
use App\Models\Organization;

class OnboardingService
{

    public function createStudio($studioOwnerOnboardingRequest)
    {
        // TODO: Add timezone
        $organization = Organization::create([
            'name' => $studioOwnerOnboardingRequest['studio_name'],
            'website' => $studioOwnerOnboardingRequest['website'],
        ]);
        $organization->address()->create([
            'street_line_1' => $studioOwnerOnboardingRequest['street_line_1'],
            'street_line_2' => $studioOwnerOnboardingRequest['street_line_2'],
            'city' => $studioOwnerOnboardingRequest['city'],
            'state' => $studioOwnerOnboardingRequest['state'],
            'postal_code' => $studioOwnerOnboardingRequest['postal_code'],
        ]);
        $organization->teams()->create([
            'name' => $studioOwnerOnboardingRequest['studio_name'],
            'display_name' => $studioOwnerOnboardingRequest['studio_name'],
        ]);
    }
}
