<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTableRequest;
use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Table::where('restaurant_id',$request->restaurant_id)->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTableRequest $request)
    {
        $table = [
            'restaurant_id' => $request->restaurant_id,
            'capacidad' => $request->capacidad,
            'terraza' => $request->terraza,
            'user_id' => auth()->user()->id,
            'created_at' => now()
        ];
        DB::table('tables')->insert($table);
        return response()->json(['message' => 'Mesa creada'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Table $table)
    {
        return Table::whereId($table->id)->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Table $table)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Table $table)
    {
        //
    }
}
