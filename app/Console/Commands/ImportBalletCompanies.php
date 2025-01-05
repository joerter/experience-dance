<?php

namespace App\Console\Commands;

use App\Services\GeocodingService;
use Illuminate\Console\Command;
use App\Models\Organization;
use App\Models\Address;
use Illuminate\Support\Facades\DB;

class ImportBalletCompanies extends Command
{
    protected $signature = 'import:ballet-companies {file : Path to the JSON file}';
    protected $description = 'Import ballet companies from JSON file into organizations and addresses tables';
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

        if (!isset($data['companies']) || !is_array($data['companies'])) {
            $this->error('Invalid JSON structure. Expected "companies" array.');
            return 1;
        }

        $this->info('Starting import of ballet companies...');
        $bar = $this->output->createProgressBar(count($data['companies']));

        DB::beginTransaction();

        try {
            foreach ($data['companies'] as $company) {
                // Create organization
                $organization = Organization::create([
                    'name' => $company['name'],
                    'website' => $company['website'],
                ]);

                $addressData = [
                    'street_line_1' => $company['street_line_1'],
                    'street_line_2' => $company['street_line_2'],
                    'city' => $company['city'],
                    'state' => $company['state'],
                    'postal_code' => $company['postal_code'],
                    'country' => $company['country'],
                ];
                $geocodingResult = $this->geocoder->geocode($addressData);

                // Create address with polymorphic relationship
                $address = new Address([
                    'street_line_1' => $company['street_line_1'],
                    'street_line_2' => $company['street_line_2'],
                    'city' => $company['city'],
                    'state' => $company['state'],
                    'postal_code' => $company['postal_code'],
                    'country' => $company['country'],
                    'latitude' => $geocodingResult['latitude'],
                    'longitude' => $geocodingResult['longitude'],
                ]);

                // Save address with polymorphic relationship
                $organization->address()->save($address);

                $bar->advance();
            }

            DB::commit();
            $bar->finish();

            $this->newLine();
            $this->info('Successfully imported ballet companies!');

            return 0;
        } catch (\Exception $e) {
            DB::rollBack();

            $this->newLine();
            $this->error('Error during import: ' . $e->getMessage());

            return 1;
        }
    }
}
