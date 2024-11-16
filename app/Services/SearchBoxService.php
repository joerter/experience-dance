<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SearchBoxService
{
    private string $accessToken;
    private string $baseUrl = 'https://api.mapbox.com/search/searchbox/v1/suggest';

    public function __construct()
    {
        $this->accessToken = config('services.mapbox.access_token');
    }

    public function search(string $query, string $sessionToken): ?array
    {
        $response = Http::get($this->baseUrl, [
            'access_token' => $this->accessToken,
            'q' => $query,
            'session_token' => $sessionToken,
            'types' => 'region,city,postcode',
            'country' => 'US'
        ]);

        if (!$response->successful()) {
            Log::error('Mapbox searchbox failed', [
                'q' => $query,
                'status_code' => $response->status(),
                'error_body' => $response->json() ?? $response->body()
            ]);
            return [];
        }

        $data = $response->json();

        return $data;
    }
}
