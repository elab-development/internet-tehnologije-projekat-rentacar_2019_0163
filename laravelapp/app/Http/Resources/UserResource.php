<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'jmbg' => $this->jmbg,
            'br_lk' => $this->br_lk,
            'adresa' => $this->adresa,
            'kontakt' => $this->kontakt,
            'uloga' => $this->uloga,
            'dokumenta' => DokumentResource::collection($this->dokumenta),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
