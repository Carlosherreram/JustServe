<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */

     //Aquí se valida la petición de inicio de sesión de un usuario.
    public function rules(): array
    {
        return [
            'username'=>'required|string|max:30',
            'password'=>'required|string',
        ];
    }
}
