<?php

namespace App\Filament\Resources\ProductGalleryItems\Pages;

use App\Filament\Resources\ProductGalleryItems\ProductGalleryItemResource;
use Filament\Resources\Pages\CreateRecord;

class CreateProductGalleryItem extends CreateRecord
{
    protected static string $resource = ProductGalleryItemResource::class;
}
