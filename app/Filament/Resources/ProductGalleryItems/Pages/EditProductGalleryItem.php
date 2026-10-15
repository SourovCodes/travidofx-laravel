<?php

namespace App\Filament\Resources\ProductGalleryItems\Pages;

use App\Filament\Resources\ProductGalleryItems\ProductGalleryItemResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditProductGalleryItem extends EditRecord
{
    protected static string $resource = ProductGalleryItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
