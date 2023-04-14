<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function loginUser(LoginUserRequest $loginUser){
    if(!Auth::attempt($loginUser->only(['username','password']))){
        return response()->json([
            'status' => false,
            'message' => 'Credenciales erróneas',
        ], 401);
    }
    else{
        $user = User::where('username',$loginUser->username)->first();
        return response()->json([
            'status'=>true,
            'message' => 'Bienvenido '.$user->username,
            'token' => $user->createToken("api token")->plainTextToken
        ], 200);
    }
   }

   public function createUser(CreateUserRequest $createuser){
    if(!$createuser->has('owner')){
            $createuser->merge(['owner' => false]);
    }
    $createuser->merge(['admin' => false]);
    $user = User::create([
        'name' => $createuser->name,
        'username'=>$createuser->username,
        'email' => $createuser->email,
        'password' => Hash::make($createuser->password),
        'age' => $createuser->age,
        'owner' => $createuser->owner,
        'admin' => $createuser->admin,
    ]);
    return ['user' => $user, 'token' => $user->createToken('api token')->plainTextToken];
   }
}