<?php

namespace Database\Factories;

use App\Models\Auto;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rezervacija>
 */
class RezervacijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids = User::pluck('id')->toArray();
        $auto_ids = Auto::pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($user_ids),
            'automobil_id' => $this->faker->randomElement($auto_ids),
            'datum_od' => $this->faker->dateTimeBetween('now', '+1 month'),
            'datum_do' => $this->faker->dateTimeBetween('+1 month', '+2 month'),
            'osiguranje' => $this->faker->boolean(),
            'cena' => $this->faker->randomFloat(2, 50, 500),
            'napomena' => $this->faker->sentence(),
        ];
    }
}
