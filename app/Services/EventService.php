<?php

namespace App\Services;

use App\Models\Event;

class EventService
{
    public function getFeatured()
    {
        return Event::where('date', '>=', now())
            ->select([
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
    }
}
