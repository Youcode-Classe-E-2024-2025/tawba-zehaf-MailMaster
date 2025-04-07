<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MailingList;

class MailingListController extends Controller
{
    public function index()
    {
        return response()->json(MailingList::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $list = MailingList::create($request->all());
        return response()->json(['message' => 'List created', 'list' => $list], 201);
    }

    public function show($id)
    {
        $list = MailingList::find($id);
        if (!$list) {
            return response()->json(['message' => 'List not found'], 404);
        }
        return response()->json($list);
    }

    public function update(Request $request, $id)
    {
        $list = MailingList::find($id);
        if (!$list) {
            return response()->json(['message' => 'List not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        $list->update($request->all());
        return response()->json(['message' => 'List updated', 'list' => $list]);
    }

    public function destroy($id)
    {
        $list = MailingList::find($id);
        if (!$list) {
            return response()->json(['message' => 'List not found'], 404);
        }

        $list->delete();
        return response()->json(['message' => 'List deleted']);
    }
}