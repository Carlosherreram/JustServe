<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\TableController;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Tables
Route::apiResource('/tables',TableController::class)
->only('show','index');
//Reservas
Route::apiResource('/bookings',BookingController::class)->middleware('auth:sanctum');

//Restaurantes
//Esta ruta redirige a los métodos crud del controlador de restaurantes a excepción de los métodos getOne y getAll, ya que esta ruta está protegida por sanctum.
Route::apiResource('/restaurants',RestaurantController::class)
->middleware('auth:sanctum')
->except(['index','show']);

//Esta ruta dirige a los métodos de getOne y getAll, no requiere autenticación.
Route::apiResource('/restaurants',RestaurantController::class)
->only('show','index');

//Esta ruta redirige hacia el método showMine, el cual muestra todos los restaurante que pertenezcan al usuario autenticado.
Route::get('/showMine',[RestaurantController::class,'showMine'])
->middleware('auth:sanctum');

//User
//Dos rutas para el controlador de usuarios que sirven para dar de alta un usuario y obtener su token de acceso, y la otra para mediante usuario y contraseña obtener un nuevo token de acceso.
Route::post('/login',[AuthController::class,'loginUser']);
Route::post('/register',[AuthController::class,'createUser']);
