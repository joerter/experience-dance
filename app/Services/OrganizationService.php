<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Organization;

class OrganizationService
{
    public function getCount()
    {
        return Organization::count();
    }
}
