<?php

namespace Database\Factories;

use App\Enums\ProductGalleryStatus;
use App\Models\ProductGalleryItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductGalleryItem>
 */
class ProductGalleryItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'image' => null,
            'status' => ProductGalleryStatus::Current,
            'download_url' => fake()->url(),
            'sort_order' => 0,
            'is_published' => true,
        ];
    }

    public function status(ProductGalleryStatus $status): static
    {
        return $this->state(fn (array $attributes): array => [
            'status' => $status,
        ]);
    }

    public function unpublished(): static
    {
        return $this->state(fn (array $attributes): array => [
            'is_published' => false,
        ]);
    }
}
