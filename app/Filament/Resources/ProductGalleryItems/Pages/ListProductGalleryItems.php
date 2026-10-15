<?php

namespace App\Filament\Resources\ProductGalleryItems\Pages;

use App\Filament\Resources\ProductGalleryItems\ProductGalleryItemResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListProductGalleryItems extends ListRecords
{
    protected static string $resource = ProductGalleryItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
