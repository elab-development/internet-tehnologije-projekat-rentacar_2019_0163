<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RezervacijaResource extends JsonResource
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
            'korisnik' => new UserResource($this->korisnik),
            'auto' => new AutoResource($this->auto),
            'datum_od' => $this->datum_od,
            'datum_do' => $this->datum_do,
            'osiguranje' => $this->osiguranje,
            'cena' => $this->cena,
            'napomena' => $this->napomena,
        ];
    }
}
