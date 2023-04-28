<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //En este método se comprueban las credenciales aportadas por el usuario y de ser correctas, se le genera un nuevo token de acceso.
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

   /*Este método crea un usuario, comprueba si se ha especificado si es propietario de un restaurante y si no lo es, se pone por defecto en false. Del mismo modo,
   Establece que el usuario no es administrador, por lo demás utiliza los valores de la request.*/
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