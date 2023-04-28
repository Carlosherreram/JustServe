<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'table_id',
        'date',
        'start_time',
        'end_time',
        'user_id'
        
    ];
    public function table(){
        return $this->belongsTo(Table::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function setStartDateTimeAttribute($value)
    {
        $this->attributes['date'] = $value->format('Y-m-d');
        $this->attributes['start_time'] = $value->format('H:i:s');
        $this->attributes['end_time'] = $value->format('H:i:s');
    }
}
