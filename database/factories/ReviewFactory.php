<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'title' => fake()->sentence(3),
            'rating' => fake()->numberBetween(4, 5),
            'body' => fake()->paragraph(3),
            'status' => Review::STATUS_PENDING,
            'featured' => false,
            'admin_note' => null,
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes): array => [
            'status' => Review::STATUS_APPROVED,
        ]);
    }

    public function featured(): static
    {
        return $this->approved()->state(fn (array $attributes): array => [
            'featured' => true,
        ]);
    }
}
