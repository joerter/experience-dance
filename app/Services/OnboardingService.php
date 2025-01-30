<?php

namespace App\Services;

use App\Constants\Roles;
use App\Models\Address;
use App\Models\Organization;

class OnboardingService
{

    public function createStudio($user, $studioOwnerOnboardingRequest)
    {
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
            'timezone' => $studioOwnerOnboardingRequest['timezone'],
        ]);
        $team = $organization->teams()->create([
            'name' => $studioOwnerOnboardingRequest['studio_name'],
            'display_name' => $studioOwnerOnboardingRequest['studio_name'],
        ]);

        $user->addRole(Roles::STUDIO_ADMIN, $team);
    }
}
