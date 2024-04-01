<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Auto>
 */
class AutoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $marke = ['Volkswagen', 'Toyota', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Renault'];
        $modeli = ['Golf', 'Corolla', 'Focus', '3 Series', 'C-Class', 'A4', 'Clio'];
        $boje = ['crvena', 'plava', 'zelena', 'siva', 'crna', 'bela', 'žuta'];

        return [
            'marka' => $this->faker->randomElement($marke),
            'model' => $this->faker->randomElement($modeli),
            'godina_proizvodnje' => $this->faker->numberBetween(1990, 2022),
            'boja' => $this->faker->randomElement($boje),
            'broj_vrata' => $this->faker->numberBetween(3, 5),
            'prenos' => $this->faker->randomElement(['automatski', 'manuelni']),
            'registraciona_oznaka' => $this->faker->regexify('[A-Z]{2}-[0-9]{3}-[A-Z]{2}'),
            'istek_registracije' => $this->faker->dateTimeBetween('now', '+1 year'),
            'maksimalan_broj_putnika' => $this->faker->numberBetween(1, 7),
            'cena_po_danu' => $this->faker->numberBetween(20, 200),
        ];
    }
}
