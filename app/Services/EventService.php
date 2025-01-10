<?php

namespace App\Services;

use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

class EventService
{
    public function getFeatured()
    {
        $featured = Event::where('datetime', '>=', now())
            ->select([
                'id',
                'title',
                'venue_name',
                'datetime',
                'organization_id',
            ])
            ->with([
                'organization:id,name',
                'address:id,addressable_id,addressable_type,city,state'
            ])
            ->whereIn('id', function ($query) {
                $query->select(DB::raw('MIN(id)'))
                    ->from('events')
                    ->where('datetime', '>=', now())
                    ->groupBy('organization_id');
            })
            ->orderBy('datetime', 'asc')
            ->take(20)
            ->get();

        return EventResource::collection($featured);
    }

    public function getUpcomingCount()
    {
        return Event::where('datetime', '>=', now())->count();
    }
}
