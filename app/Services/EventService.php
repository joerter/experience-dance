<?php

namespace App\Services;

use App\Http\Resources\EventResource;
use App\Models\Event;

class EventService
{
    public function getFeatured()
    {
        $featured = Event::where('date', '>=', now())
            ->select([
                'id',
                'title',
                'venue_name',
                'date',
                'time',
                'organization_id',
            ])
            ->with(['organization:id,name'])
            ->orderBy('date', 'asc')
            ->take(20)
            ->get();

        return EventResource::collection($featured);
    }
}
