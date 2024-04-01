<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AutoResource extends JsonResource
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
            'marka' => $this->marka,
            'model' => $this->model,
            'godina_proizvodnje' => $this->godina_proizvodnje,
            'boja' => $this->boja,
            'broj_vrata' => $this->broj_vrata,
            'prenos' => $this->prenos,
            'registraciona_oznaka' => $this->registraciona_oznaka,
            'istek_registracije' => $this->istek_registracije,
            'maksimalan_broj_putnika' => $this->maksimalan_broj_putnika,
            'cena_po_danu' => $this->cena_po_danu,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
