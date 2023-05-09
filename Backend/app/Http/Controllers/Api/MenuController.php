<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Models\Plate;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($restaurant_id)
    {
        $menu = Menu::where('restaurant_id', $restaurant_id)->first();
        $plates = Plate::where('menu_id', $menu->id)->get();
        $response = array();
        foreach ($plates as $plate ){
            $plato = [
                'name'=>$plate->name,
                'description'=>$plate->description,
                'categorie'=>$plate->categorie
            ];
            array_push($response, $plato);
        }
        return $response;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        //
    }
}
