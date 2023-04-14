<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RestaurantController;
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

//Restaurantes
Route::apiResource('/restaurants',RestaurantController::class)
->middleware('auth:sanctum')
->except(['index','show']);

Route::apiResource('/restaurants',RestaurantController::class)
->only('show','index');

//User
Route::post('/login',[AuthController::class,'loginUser']);
Route::post('/register',[AuthController::class,'createUser']);
