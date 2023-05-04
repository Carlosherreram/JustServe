<?php

namespace App\Http\Requests;

use App\Models\Restaurant;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $restaurant = Restaurant::findOrFail($this->restaurant_id);
        return $restaurant->user_id == auth()->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'restaurant_id' => ['required',Rule::exists('restaurants', 'id')],
            'capacidad' => 'required|integer',
            'terraza' => 'boolean',
            'identificacionlocal'=>'string',
        ];
    }
}
