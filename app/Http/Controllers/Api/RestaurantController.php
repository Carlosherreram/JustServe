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
        if (auth()->check()) {
            $restaurante = [
                'user_id' => auth()->user()->id,
                'food' => $storeRestaurant->food,
                'location' => $storeRestaurant->location,
                'name' => $storeRestaurant->name,
            ];
            DB::table('restaurants')->insert($restaurante);
            if(!auth()->user()->owner){
                auth()->user()->update(['owner'=>true]);
            }
            return $restaurante;
        } else {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        return Restaurant::whereName($restaurant->name)->first(['food', 'location', 'name']);
    }

    /**
     * Get restaurants by owner id
     */

     public function showMine(){
        if (auth()->check()) {
        return Restaurant::whereUser_id(auth()->user()->id)->paginate(10,['food','location','name']);
        }
        else {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
    } 
     

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRestaurantRequest $request, Restaurant $restaurant)
    {
        if (auth()->check()) {
            if($restaurant->user_id == auth()->user()->id){
                $restaurant->update([
                    'name'=>$request->name,
                    'location'=>$request->location,
                    'food'=>$request->food,
                ]);
            }
            else{
                return response()->json(['error'=>'No eres el propietario'], 401);
            }
        }

        else {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        if($restaurant->user_id == auth()->user()->id){
            return $restaurant->delete();
        }
    }
}