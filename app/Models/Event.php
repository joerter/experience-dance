<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_datetime',
        'end_datetime',
    ];

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }
}
