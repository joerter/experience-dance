<?php

namespace App\Models;

use Laratrust\Models\Team as LaratrustTeam;

class Team extends LaratrustTeam
{
    public $guarded = [];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
