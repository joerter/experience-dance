<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street_line_1',
        'street_line_2',
        'city',
        'state',
        'postal_code',
        'country',
        'timezone',
    ];

    public function addressable()
    {
        return $this->morphTo();
    }
}
