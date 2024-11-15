<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    // Specify the fields that are mass assignable
    protected $fillable = [
        'name',
        'email',
        'phone',
        'lead_status_id',
    ];

    // Optionally, specify the table name if it's different from the plural form of the model name
    protected $table = 'leads';

    // Define relationships (if applicable)
    public function leadStatus()
    {
        return $this->belongsTo(LeadStatus::class, 'lead_status_id', 'id');
    }
}
