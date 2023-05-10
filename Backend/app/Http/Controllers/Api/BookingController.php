<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBookingRequest;
use App\Http\Requests\TablesAvailableRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Table;
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
            return Booking::paginate(10)->where('user_id', auth()->user()->id);
        }
    }

    /**
     * Display a listing of available tables
     */
    public function tablesAvailable(TablesAvailableRequest $request)
    {
        $tables = Table::where('restaurant_id', $request->restaurant_id)->get();

        $available = collect();

        foreach ($tables as $table) {
            $bookings = Booking::where('table_id', $table->id)
                ->where('date', '=', $request->date)
                ->where('start_time', '<=', $request->end_time)
                ->where('end_time', '>=', $request->start_time)
                ->get();

            if ($bookings->isEmpty()) {
                $available->push($table);
            }
        }
        return $available->toJson();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateBookingRequest $request)
    {
        $bookings = Booking::where('table_id', $request->table_id)
            ->where('date', '=', $request->date)
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
            'date' => $request->date,
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
        return Booking::whereId($booking->id)->where('user_id', auth()->user()->id)->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        $bookings = Booking::where('table_id', $booking->table_id)
            ->where('date', '=', $request->date)
            ->where('start_time', '<=', $request->end_time)
            ->where('end_time', '>=', $request->start_time)
            ->get();

        if ($bookings->count() > 0) {
            return response()->json(['error' => 'Ocupada'], 400);

        }
        if (auth()->check()) {
            if ($booking->user_id == auth()->user()->id) {
                $booking->update([
                    'table_id' => $booking->table_id,
                    'date' => $request->date,
                    'start_time' => $request->start_time,
                    'end_time' => $request->end_time,
                ]);
            } else {
                return response()->json(['error' => 'Esta reserva no es tuya'], 401);
            }
        } else {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
        return response()->json(['message' => 'Reserva '], 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        if ($booking->user_id == auth()->user()->id) {
            return $booking->delete();
        }
    }
}