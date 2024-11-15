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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:leads',
            'phone' => 'required|string|max:20',
            'lead_status_id' => 'required|exists:lead_statuses,id',
        ]);
    
        Lead::create($request->all());
    
        return response()->json(['message' => 'Lead created successfully!'], 201);
    }
    
    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:leads,email,' . $lead->id,
            'phone' => 'required|string|max:20',
            'lead_status_id' => 'required|exists:lead_statuses,id',
        ]);
    
        $lead->update($request->all());
    
        return response()->json(['message' => 'Lead updated successfully!']);
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
