<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantRequest extends FormRequest
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

     //Aquí se valida la petición para dar de alta un restaurante, y también para actualizarlo.
    public function rules(): array
    {
        return [
            'food' => 'required|in:tradicional,burguer,chino,mexicana,italiana,pizza,otro',
            'name' => 'required|string|max:45',
            'location' => 'required|string|max:50',

        ];
    }
}
