<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rezervacija extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', // ID korisnika koji je napravio rezervaciju
        'automobil_id', // ID automobila koji je rezervisan
        'datum_od', // Datum početka rezervacije
        'datum_do', // Datum završetka rezervacije
        'osiguranje', // Da li je uključeno osiguranje (true/false)
        'cena', // Cena rezervacije
        'napomena', // Napomena vezana za rezervaciju
    ];

    // Metoda za definisanje veze sa korisnikom
    public function korisnik()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Metoda za definisanje veze sa automobilom
    public function automobil()
    {
        return $this->belongsTo(Auto::class, 'automobil_id');
    }
}
