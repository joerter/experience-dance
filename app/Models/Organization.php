<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'website',
    ];

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }
}
