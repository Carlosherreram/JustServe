<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            'food'=>$this->food,
            'location'=>$this->location,
            'name'=>$this->name,
            

        ];
    }
}
