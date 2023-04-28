<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

     /*
     Una migración que crea la tabla de restaurantes en la BBDD, la fk a usuario hace referencia al usuario que será propietario de cada restaurante.
     */
    public function up(): void
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->string('food');
            $table->string('location');
            $table->string('name')->unique();
            $table->foreignId('user_id'); // Owner
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
