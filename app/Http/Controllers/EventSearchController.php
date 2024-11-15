<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EventSearchController extends Controller
{
    public function search(Request $request)
    {
        return response()->json(['locations' => 'well, here you go']);
    }
}
