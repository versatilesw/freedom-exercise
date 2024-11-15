<?php
use App\Http\Controllers\LeadController;
use App\Http\Controllers\LeadStatusController;

Route::get('/leads', [LeadController::class, 'index']);
Route::post('/leads', [LeadController::class, 'store']);
Route::put('/leads/{id}', [LeadController::class, 'update']);
Route::delete('/leads/{id}', [LeadController::class, 'destroy']);
Route::get('/leads/search', [LeadController::class, 'search']);

Route::get('/lead-statuses', [LeadStatusController::class, 'index']);
