<?php

namespace App\Filament\Resources\ProductGalleryItems;

use App\Filament\Resources\ProductGalleryItems\Pages\CreateProductGalleryItem;
use App\Filament\Resources\ProductGalleryItems\Pages\EditProductGalleryItem;
use App\Filament\Resources\ProductGalleryItems\Pages\ListProductGalleryItems;
use App\Filament\Resources\ProductGalleryItems\Schemas\ProductGalleryItemForm;
use App\Filament\Resources\ProductGalleryItems\Tables\ProductGalleryItemsTable;
use App\Models\ProductGalleryItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProductGalleryItemResource extends Resource
{
    protected static ?string $model = ProductGalleryItem::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static ?string $navigationLabel = 'Product gallery';

    protected static ?string $modelLabel = 'Gallery item';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ProductGalleryItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProductGalleryItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProductGalleryItems::route('/'),
            'create' => CreateProductGalleryItem::route('/create'),
            'edit' => EditProductGalleryItem::route('/{record}/edit'),
        ];
    }
}
