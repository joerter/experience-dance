<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
        'latitude',
        'longitude',
        'location',
    ];

    public function setLocationAttribute($value)
    {
        $this->attributes['location'] = DB::raw("POINT({$value['longitude']}, {$value['latitude']})");
    }

    public function addressable()
    {
        return $this->morphTo();
    }
}
