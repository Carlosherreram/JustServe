<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->check()) {
        return Booking::paginate(10)->where('user_id',auth()->user()->id);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $bookings = Booking::where('table_id', $request->table_id)
                        ->where('date','=',$request->date)
                        ->where('start_time', '<=', $request->end_time)
                        ->where('end_time', '>=', $request->start_time)
                        ->get();

    if ($bookings->count() > 0) {
        return response()->json(['error' => 'Ocupada'], 400);
    }
    $booking = [
        'table_id' => $request->table_id,
        'start_time' => $request->start_time,
        'end_time' => $request->end_time,
        'date'=> $request->date,
        'user_id' => auth()->user()->id,
        'created_at' => now()
        ];
    DB::table('bookings')->insert($booking);

    

    return response()->json(['message' => 'Reserva hecha'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return Booking::whereId($booking->id)->where('user_id',auth()->user()->id)->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        if (auth()->check()) {
            if($booking->user_id == auth()->user()->id){
                $booking->update([
                    'date'->$request->date,
                    'start_time'->$request->start_time,
                    'end_time'->$request->end_time,
                ]);
            }
            else{
                return response()->json(['error'=>'Esta reserva no es tuya'], 401);
            }
        }

        else {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
        return response()->json(['message' => 'Reserva '], 201);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        if($booking->user_id == auth()->user()->id){
            return $booking->delete();
        }
    }
}
