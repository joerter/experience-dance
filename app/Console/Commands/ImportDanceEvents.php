<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\Address;
use App\Services\GeocodingService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportDanceEvents extends Command
{
    protected $signature = 'import:dance-events {file : Path to the JSON file}';
    protected $description = 'Import dance events from a JSON file';

    private GeocodingService $geocoder;

    public function __construct(GeocodingService $geocoder)
    {
        parent::__construct();
        $this->geocoder = $geocoder;
    }

    public function handle()
    {
        $filePath = $this->argument('file');

        if (!file_exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return 1;
        }

        $jsonContent = file_get_contents($filePath);
        $data = json_decode($jsonContent, true);

        if (!isset($data['events']) || !is_array($data['events'])) {
            $this->error('Invalid JSON format: missing or invalid events array');
            return 1;
        }

        DB::beginTransaction();

        try {
            foreach ($data['events'] as $eventData) {
                // Parse the date and time
                $dateTime = Carbon::parse($eventData['date'], $eventData['timezone']);

                // Create or update the event
                $event = Event::create([
                    'title' => $eventData['title'],
                    'description' => $eventData['description'],
                    'url' => $eventData['url'] ?? null,
                    'venue_name' => $eventData['venue_name'],
                    'datetime' => $dateTime,
                    'is_all_day' => $eventData['is_all_day'],
                    'organization_id' => $eventData['organization_id'],
                ]);

                $addressData = [
                    'street_line_1' => $eventData['street_line_1'],
                    'street_line_2' => $eventData['street_line_2'] ?? null,
                    'city' => $eventData['city'],
                    'state' => $eventData['state'],
                    'postal_code' => $eventData['postal_code'],
                    'country' => $eventData['country'],
                ];
                $geocodingResult = $this->geocoder->geocode($addressData);

                $address = new Address([
                    ...$addressData,
                    'latitude' => $geocodingResult['latitude'],
                    'longitude' => $geocodingResult['longitude'],
                    'location' => ['latitude' => $geocodingResult['latitude'], 'longitude' => $geocodingResult['longitude']],
                ]);

                $event->address()->save($address);

                $this->info("Imported event: {$event->title}");
            }

            DB::commit();
            $this->info('All events imported successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Import failed: {$e->getMessage()}");
            return 1;
        }

        return 0;
    }
}
