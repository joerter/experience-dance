<?php

namespace App\Console\Commands;

use App\Models\Organization;
use App\Services\GeocodingService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use League\Csv\Reader;
use Throwable;

class ImportDanceEvents extends Command
{
    protected $signature = 'import:dance-events {file} {--chunk=100} {--log-file=dance-import-errors.log}';
    protected $description = 'Import dance events from CSV file';

    private array $failedRecords = [];
    private int $successCount = 0;
    private int $failureCount = 0;
    private GeocodingService $geocoder;


    public function __construct(GeocodingService $geocoder)
    {
        parent::__construct();
        $this->geocoder = $geocoder;
    }

    public function handle()
    {
        $csv = Reader::createFromPath($this->argument('file'), 'r');
        $csv->setHeaderOffset(0);

        $records = collect($csv->getRecords());
        $chunks = $records->chunk($this->option('chunk'));

        $this->withProgressBar($chunks, function ($chunk) {
            DB::transaction(function () use ($chunk) {
                foreach ($chunk as $index => $record) {
                    try {
                        $this->processRecord($record);
                        $this->successCount++;
                    } catch (Throwable $e) {
                        $this->handleFailedRecord($record, $index, $e);
                    }
                }
            });
        });

        $this->newLine(2);
        $this->displaySummary();
        $this->writeErrorLog();
    }

    private function processRecord(array $record): void
    {
        $this->validateRecord($record);

        $organization = Organization::firstOrCreate(
            ['name' => $record['organization_name']],
        );

        $this->updateAddress($organization, $this->getOrganizationAddressData($record));

        $eventData = $this->processDateTime(
            $record['event_date'],
            $record['event_time'] ?? null,
            $record['event_timezone'] ?? null
        );
        $eventToInsert = [
            'title' => $record['event_title'],
            'description' => $record['event_description'],
            'venue_name' => $record['event_venue_name'],
            'date' => $eventData['date'],
            'time' => $eventData['time'],
            'timezone' => $eventData['timezone'],
            'is_all_day' => $eventData['is_all_day'],
        ];
        //dd($eventToInsert);

        $event = $organization->events()->create($eventToInsert);

        $this->updateAddress($event, $this->getEventAddressData($record));
    }

    private function validateRecord(array $record): void
    {
        $requiredFields = [
            'organization_name',
            'organization_street_line_1',
            'organization_city',
            'organization_state',
            'organization_postal_code',
            'event_title',
            'event_description',
            'event_date',
            'event_timezone',
            'event_street_line_1',
            'event_city',
            'event_state',
            'event_postal_code',
            'event_venue_name',
        ];

        $missingFields = array_filter(
            $requiredFields,
            fn($field) =>
            !isset($record[$field]) || empty(trim($record[$field]))
        );

        if (!empty($missingFields)) {
            throw new \InvalidArgumentException(
                'Missing required fields: ' . implode(', ', $missingFields)
            );
        }
    }

    private function handleFailedRecord(array $record, int $index, Throwable $e): void
    {
        $this->failureCount++;
        $this->failedRecords[] = [
            'index' => $index + 2, // Adding 2 to account for 0-based index and header row
            'record' => $record,
            'error' => $e->getMessage(),
            'timestamp' => now()->toDateTimeString(),
        ];

        // Log to Laravel's error log as well
        Log::error("Dance event import failed for record " . ($index + 2), [
            'error' => $e->getMessage(),
            'record' => $record,
        ]);
    }

    private function displaySummary(): void
    {
        $this->info('Import Summary:');
        $this->line("✓ Successfully imported: {$this->successCount} records");

        if ($this->failureCount > 0) {
            $this->warn("⚠ Failed to import: {$this->failureCount} records");
            $this->line("  Details written to: " . $this->option('log-file'));
        }
    }

    private function writeErrorLog(): void
    {
        if (empty($this->failedRecords)) {
            return;
        }

        $logFile = storage_path('logs/' . $this->option('log-file'));
        $content = "Dance Events Import Errors - " . now()->toDateTimeString() . "\n\n";

        foreach ($this->failedRecords as $record) {
            $content .= "Row {$record['index']}:\n";
            $content .= "Error: {$record['error']}\n";
            $content .= "Record Data:\n";
            $content .= json_encode($record['record'], JSON_PRETTY_PRINT) . "\n\n";
        }

        file_put_contents($logFile, $content, FILE_APPEND);
    }

    private function updateAddress($model, array $addressData): void
    {
        $address = $model->address()->firstOrNew([], $addressData);
        $geocodeData = $this->geocoder->geocode($addressData);

        if ($geocodeData) {
            $address->latitude = $geocodeData['latitude'];
            $address->longitude = $geocodeData['longitude'];
        }
        $model->address()->save($address);
    }

    private function getOrganizationAddressData(array $record): array
    {
        return $this->formatAddressData($record, 'organization');
    }

    private function getEventAddressData(array $record): array
    {
        return $this->formatAddressData($record, 'event');
    }

    private function formatAddressData(array $record, string $prefix): array
    {
        return [
            'street_line_1' => $record["{$prefix}_street_line_1"],
            'street_line_2' => $record["{$prefix}_street_line_2"] ?? null,
            'city' => $record["{$prefix}_city"],
            'state' => $record["{$prefix}_state"],
            'postal_code' => $record["{$prefix}_postal_code"],
            'country' => $record["{$prefix}_country"] ?? 'US'
        ];
    }

    private function processDateTime(
        string $date,
        ?string $time,
        string $timezone
    ): array {
        $parsedDate = Carbon::parse($date)->format('Y-m-d');
        $validatedTimezone = $this->validateAndGetTimezone($timezone);

        if (empty($time)) {
            return [
                'date' => $parsedDate,
                'time' => null,
                'timezone' => $validatedTimezone,
                'is_all_day' => true,
            ];
        }

        $dateTime = Carbon::parse("$date $time", $validatedTimezone)->utc();

        return [
            'date' => $dateTime->format('Y-m-d'),
            'time' => $dateTime->format('H:i:s'),
            'timezone' => $validatedTimezone,
            'is_all_day' => false,
        ];
    }

    private function validateAndGetTimezone(string $timezone): string
    {
        $validTimezones = \DateTimeZone::listIdentifiers();

        if (!in_array($timezone, $validTimezones)) {
            throw new \InvalidArgumentException(
                "Invalid timezone: {$timezone}. Please use a valid PHP timezone identifier."
            );
        }

        return $timezone;
    }
}
