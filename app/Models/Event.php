<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'venue_name',
        'date',
        'time',
        'timezone',
        'is_all_day',
    ];

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
