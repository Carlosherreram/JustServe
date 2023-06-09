<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'food',
        'location',
        'name',
    ];
    //Relación 1:N entre restaurantes y usuarios.
    public function user(){
        return $this->belongsTo(User::class);
    }
}
