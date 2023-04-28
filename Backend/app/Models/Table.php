<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;

    protected $fillable = [
        'capacidad',
        'terraza',
    ];

    public function bookings(){
        return $this->hasMany(Booking::class);
    }

    public function restaurant(){
        return $this->belongsTo(Restaurant::class);
    }
}
