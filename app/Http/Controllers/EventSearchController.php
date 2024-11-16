<?php

namespace App\Http\Controllers;

use App\Services\SearchBoxService;
use Illuminate\Http\Request;

class EventSearchController extends Controller
{
    private SearchBoxService $searchBoxService;

    public function __construct(SearchBoxService $searchBoxService)
    {
        $this->searchBoxService = $searchBoxService;
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $sessionToken = $request->input('sessionToken');
        $results = $this->searchBoxService->search($query, $sessionToken);

        return response()->json($results);
    }
}
