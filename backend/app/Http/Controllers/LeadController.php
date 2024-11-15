<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index()
    {
        return Lead::paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:leads',
        ]);

        return Lead::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);
        $lead->update($request->all());
        return $lead;
    }

    public function destroy($id)
    {
        Lead::destroy($id);
        return response()->json(['message' => 'Lead deleted successfully']);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        return Lead::where('name', 'like', "%$query%")
            ->orWhere('email', 'like', "%$query%")
            ->paginate(10);
    }
}
