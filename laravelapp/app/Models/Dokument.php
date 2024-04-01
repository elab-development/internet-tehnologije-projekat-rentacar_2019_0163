<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokument extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', // ID korisnika koji je povezan s dokumentom
        'document_type', // Tip dokumenta (npr. "vozacka_dozvola", "pasos", "licna_karta")
        'document_number', // Broj dokumenta, npr broj licne karte, pasosa
        'file_path', // Putanja do slike dokumenta
    ];

    // Metoda za definiranje veze s korisnikom
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
