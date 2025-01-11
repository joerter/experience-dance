<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name(),
            'description' => fake()->text(),
            'url' => fake()->url(),
            'venue_name' => fake()->company(),
            'datetime' => fake()->dateTimeBetween('+1 week', '+2 weeks'),
            'is_all_day' => false,
        ];
    }
}
