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
    public function rules(): array
    {
        //$foods = ['tradicional', 'burguer','chino','mexicana','italiana','pizza'];

        return [
            'food' => 'required|in:tradicional,burguer,chino,mexicana,italiana,pizza',
            'name' => 'required|string|max:45',
            'location' => 'required|string|max:50',

        ];
    }
}
