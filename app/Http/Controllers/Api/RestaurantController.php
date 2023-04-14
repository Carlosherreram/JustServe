<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRestaurantRequest;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Restaurant::paginate(10, ['food', 'location', 'name',]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRestaurantRequest $storeRestaurant)
    {
        /*
        if (auth()->check()) {
            return Restaurant::create([
                'user_id' => auth()->user()->id,
                'food' => $storeRestaurant->food,
                'location' => $storeRestaurant->location,
                'name' => $storeRestaurant->name,
            ]);
        } else {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }*/

        $restaurante = [
            'user_id' => auth()->user()->id,
            'food' => $storeRestaurant->food,
            'location' => $storeRestaurant->location,
            'name' => $storeRestaurant->name,
        ];
        DB::table('restaurants')->insert($restaurante);
        return $restaurante;

    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        return Restaurant::whereName($restaurant->name)->first(['food', 'location', 'name']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        //
    }
}