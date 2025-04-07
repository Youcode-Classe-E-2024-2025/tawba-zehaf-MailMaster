<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;

class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $newsletters = Newsletter::all();
        return response()->json($newsletters);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        $newsletter = Newsletter::create($request->all());

        return response()->json(['message' => 'Newsletter created successfully', 'newsletter' => $newsletter], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter) {
            return response()->json(['message' => 'Newsletter not found'], 404);
        }

        return response()->json($newsletter);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter) {
            return response()->json(['message' => 'Newsletter not found'], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'published_at' => 'nullable|date',
        ]);

        $newsletter->update($request->all());

        return response()->json(['message' => 'Newsletter updated successfully', 'newsletter' => $newsletter]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter) {
            return response()->json(['message' => 'Newsletter not found'], 404);
        }

        $newsletter->delete();

        return response()->json(['message' => 'Newsletter deleted successfully']);
    }
}