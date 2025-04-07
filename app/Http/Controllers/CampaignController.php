<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $campaigns = Campaign::all();
        return response()->json($campaigns);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $campaign = Campaign::create($request->all());

        return response()->json(['message' => 'Campaign created successfully', 'campaign' => $campaign], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $campaign = Campaign::find($id);

        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }

        return response()->json($campaign);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $campaign = Campaign::find($id);

        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
        ]);

        $campaign->update($request->all());

        return response()->json(['message' => 'Campaign updated successfully', 'campaign' => $campaign]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $campaign = Campaign::find($id);

        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }

        $campaign->delete();

        return response()->json(['message' => 'Campaign deleted successfully']);
    }
}