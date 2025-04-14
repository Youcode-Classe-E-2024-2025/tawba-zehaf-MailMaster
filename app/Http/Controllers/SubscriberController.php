<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscriber;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscribers = Subscriber::all();
        return response()->json($subscribers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:subscribers',
            'name' => 'nullable|string|max:255',
        ]);

        $subscriber = Subscriber::create($request->all());

        return response()->json(['message' => 'Subscriber created successfully', 'subscriber' => $subscriber], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subscriber = Subscriber::find($id);

        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        return response()->json($subscriber);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $subscriber = Subscriber::find($id);

        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        $request->validate([
            'email' => 'sometimes|required|string|email|max:255|unique:subscribers,email,' . $id,
            'name' => 'nullable|string|max:255',
        ]);

        $subscriber->update($request->all());

        return response()->json(['message' => 'Subscriber updated successfully', 'subscriber' => $subscriber]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subscriber = Subscriber::find($id);

        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        $subscriber->delete();

        return response()->json(['message' => 'Subscriber deleted successfully']);
    }
    public function publicSubscribe(Request $request)
{
    $request->validate([
        'email' => 'required|email|unique:subscribers,email'
    ]);

    $subscriber = Subscriber::create([
        'email' => $request->email,
        'status' => 'active',
        'is_public' => true
    ]);

    return response()->json([
        'message' => 'Successfully subscribed to newsletter',
        'subscriber' => $subscriber
    ], 201);
}
}