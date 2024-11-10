<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\Organization;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;


// TODO:
// - tie events to orgs
// - add geocoding

class ImportDanceEvents extends Command
{
    protected $signature = 'import:dance-events {file}';
    protected $description = 'Import dance events from CSV file';

    public function handle()
    {
        $csv = Reader::createFromPath($this->argument('file'), 'r');
        $csv->setHeaderOffset(0);

        $records = $csv->getRecords();

        DB::beginTransaction();
        try {
            foreach ($records as $record) {
                // Find or create organization
                $organization = Organization::firstOrCreate(
                    ['name' => $record['organization_name']],
                );

                $organizationAddress = $organization->address()->firstOrNew([], [
                    'street_line_1' => $record['organization_street_line_1'],
                    'street_line_2' => $record['organization_street_line_2'] ?? null,
                    'city' => $record['organization_city'],
                    'state' => $record['organization_state'],
                    'postal_code' => $record['organization_postal_code'],
                    'country' => $record['organization_country'] ?? 'US'
                ]);
                $organization->address()->save($organizationAddress);
                $organization->save();

                $event = $organization->events()->create([
                    'title' => $record['event_title'],
                    'description' => $record['event_description'],
                    'start_datetime' => $record['start_datetime'],
                    'end_datetime' => $record['end_datetime'],
                ]);

                $eventAddress = $event->address()->firstOrNew([], [
                    'street_line_1' => $record['event_street_line_1'],
                    'street_line_2' => $record['event_street_line_2'] ?? null,
                    'city' => $record['event_city'],
                    'state' => $record['event_state'],
                    'postal_code' => $record['event_postal_code'],
                    'country' => $record['event_country'] ?? 'US'
                ]);
                $event->address()->save($eventAddress);
                $event->save();

                $this->info("Imported: {$record['event_title']} by {$record['organization_name']}");
            }

            DB::commit();
            $this->info('Import completed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Import failed: {$e->getMessage()}");
        }
    }
}
