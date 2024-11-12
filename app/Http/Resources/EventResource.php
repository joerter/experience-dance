<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'venueName' => $this->venue_name,
            'date' => $this->date,
            'time' => $this->time,
            'timezone' => $this->timezone,
            'isAllDay' => $this->is_all_day,
            'organizationId' => $this->organization_id,
            'organization' => [
                'id' => $this->whenLoaded('organization')?->id,
                'name' => $this->whenLoaded('organization')?->name,
            ],
        ];
    }
}
