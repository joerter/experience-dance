<?php

namespace App\Services;

use App\Constants\Roles;
use App\Constants\SessionKeys;
use App\Models\Organization;

class OnboardingService
{

    public function createStudio($studioOwnerOnboardingRequest)
    {
        try {
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

            return $team;
        } catch (\Exception $e) {
            report($e);
            throw $e;
        }
    }

    public function initializeTeamForUser($user, $team)
    {
        try {
            $user->addRole(Roles::STUDIO_ADMIN, $team);
            session([SessionKeys::TEAM_ID => $team->id]);
        } catch (\Exception $e) {
            report($e);
            throw $e;
        }
    }
}
