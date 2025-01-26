<?php

namespace App\Services;

use App\Constants\Roles;

class RoleService
{
    public function grantStudioOwnerRole($user)
    {
        $user->addRoles([Roles::STUDIO_OWNER]);
    }
}
