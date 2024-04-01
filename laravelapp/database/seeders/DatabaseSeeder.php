<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Auto;
use App\Models\Dokument;
use App\Models\Rezervacija;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         // Kreiranje admin i user korisnika
        User::factory()->create([
            'name' => 'Sebastijan Vlatkovic',
            'email' => 'vlatkovicsebastijan@gmail.com',
            'uloga' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'jk20201008',
            'email' => 'jk20201008@student.fon.bg.ac.rs',
            'uloga' => 'user',
        ]);

        // Kreiranje dodatnih 10 usera
        User::factory()->count(10)->create();

        // Kreiranje 50 automobila
        Auto::factory()->count(50)->create();

        // Kreiranje rezervacija
        $users = User::all();
        $autos = Auto::all();
        foreach ($users as $user) {
            // Kreiranje 10 rezervacija za svakog korisnika
            $user->rezervacije()->saveMany(Rezervacija::factory()->count(10)->make([
                'automobil_id' => $autos->random()->id,
            ]));
        }

        // Kreiranje 5 dokumenata
        Dokument::factory()->count(5)->create();
    }
}
