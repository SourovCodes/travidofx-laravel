<?php

use App\Enums\ProductGalleryStatus;
use App\Filament\Resources\ProductGalleryItems\Pages\CreateProductGalleryItem;
use App\Models\ProductGalleryItem;
use Livewire\Livewire;

test('homepage receives published gallery items grouped by status', function () {
    ProductGalleryItem::factory()->create(['title' => 'V12 second', 'sort_order' => 2]);
    ProductGalleryItem::factory()->create(['title' => 'V12 first', 'sort_order' => 1]);
    ProductGalleryItem::factory()->status(ProductGalleryStatus::Upcoming)->create(['title' => 'V13']);
    ProductGalleryItem::factory()->status(ProductGalleryStatus::Past)->unpublished()->create(['title' => 'Hidden']);

    $gallery = $this->get(route('home'))
        ->assertOk()
        ->inertiaProps('gallery');

    expect(array_column($gallery['current'], 'title'))->toBe(['V12 first', 'V12 second'])
        ->and(array_column($gallery['upcoming'], 'title'))->toBe(['V13'])
        ->and($gallery['past'])->toBe([]);
});

test('admin can create a gallery item', function () {
    Livewire::test(CreateProductGalleryItem::class)
        ->fillForm([
            'title' => 'Tradivo V13',
            'status' => ProductGalleryStatus::Upcoming->value,
            'download_url' => 'https://example.com/v13.zip',
            'sort_order' => 1,
        ])
        ->call('create')
        ->assertHasNoFormErrors();

    $this->assertDatabaseHas('product_gallery_items', [
        'title' => 'Tradivo V13',
        'status' => 'upcoming',
        'download_url' => 'https://example.com/v13.zip',
        'is_published' => true,
    ]);
});
