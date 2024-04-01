<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dokument>
 */
class DokumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $documentTypes = ['vozacka_dozvola', 'pasos', 'licna_karta'];

        return [
            'user_id' => User::factory(),
            'document_type' => $this->faker->randomElement($documentTypes),
            'document_number' => $this->faker->numerify('##########'), // Replace # with random digits
            'file_path' => $this->faker->imageUrl(400, 300, 'documents'), // Generating a fake URL for the document image
        ];
    }
}
