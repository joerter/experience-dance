<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GeocodingService
{
    private string $accessToken;
    private string $baseUrl = 'https://api.mapbox.com/search/geocode/v6/forward';

    public function __construct()
    {
        $this->accessToken = config('services.mapbox.access_token');
    }

    public function geocode(array $address): ?array
    {
        $cacheKey = 'geocode_' . md5($address['street_line_1'] . $address['city'] . $address['state'] . $address['postal_code']);
        Log::info('Geocoding address', [
            'address_string' => sprintf(
                '%s, %s, %s %s',
                $address['street_line_1'],
                $address['city'],
                $address['state'],
                $address['postal_code']
            ),
        ]);

        return Cache::remember($cacheKey, now()->addDays(30), function () use ($address) {
            $response = Http::get($this->baseUrl, [
                'access_token' => $this->accessToken,
                'address_line1' => $address['street_line_1'],
                'place' => $address['city'],
                'region' => $address['state'],
                'postcode' => $address['postal_code'],
                'country' => 'US',
                'types' => 'address'
            ]);

            if (!$response->successful()) {
                Log::error('Mapbox geocoding failed', [
                    'address_string' => sprintf(
                        '%s, %s, %s %s',
                        $address['street_line_1'],
                        $address['city'],
                        $address['state'],
                        $address['postal_code']
                    ),
                    'status_code' => $response->status(),
                    'error_body' => $response->json() ?? $response->body()
                ]);
                return null;
            }

            $data = $response->json();

            if (empty($data['features'])) {
                Log::warning('No geocoding results found', [
                    'address_string' => sprintf(
                        '%s, %s, %s %s',
                        $address['street_line_1'],
                        $address['city'],
                        $address['state'],
                        $address['postal_code']
                    )
                ]);
                return null;
            }

            $coordinates = $data['features'][0]['geometry']['coordinates'];
            Log::info('Got coordinates successfully', ['coordinates' => $coordinates]);

            return [
                'longitude' => $coordinates[0],
                'latitude' => $coordinates[1],
            ];
        });
    }
}
