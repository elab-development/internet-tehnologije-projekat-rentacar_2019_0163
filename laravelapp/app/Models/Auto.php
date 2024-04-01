<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auto extends Model
{
    use HasFactory;
    protected $fillable = [
        'marka', // Marka automobila
        'model', // Model automobila
        'godina_proizvodnje', // Godina proizvodnje
        'boja', // Boja automobila
        'broj_vrata', // Broj vrata
        'prenos', // Način prenosa brzina (automatski, manuelni)
        'registraciona_oznaka', // Registraciona oznaka
        'istek_registracije', // Datum isteka registracije
        'maksimalan_broj_putnika', // Maksimalan broj putnika
        'cena_po_danu',  
    ];

    // Metoda za definisanje veze sa rezervacijama
    public function rezervacije()
    {
        return $this->hasMany(Rezervacija::class);
    }
}
