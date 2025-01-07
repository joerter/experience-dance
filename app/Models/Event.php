<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $casts = [
        'datetime' => 'datetime',
    ];

    protected $fillable = [
        'title',
        'description',
        'url',
        'venue_name',
        'datetime',
        'is_all_day',
        'organization_id',
    ];

    public function setDatetimeAttribute($value)
    {
        if ($value instanceof Carbon) {
            $this->attributes['datetime'] = $value->setTimezone('UTC');
        } else {
            $this->attributes['datetime'] = Carbon::parse($value)->setTimezone('UTC');
        }
    }

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
