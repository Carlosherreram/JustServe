<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function menu(){
        return $this->belongsTo(Menu::class);
    }
    public function plates() {
        return $this->hasMany(Plate::class);
    }
}