<?php

namespace App\Filament\Resources\ProductGalleryItems\Schemas;

use App\Enums\ProductGalleryStatus;
use App\Models\Setting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductGalleryItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Gallery item')
                    ->columns(2)
                    ->columnSpanFull()
                    ->components([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(120),
                        Select::make('status')
                            ->options(ProductGalleryStatus::class)
                            ->default(ProductGalleryStatus::Current)
                            ->required()
                            ->native(false)
                            ->helperText('Controls which homepage gallery tab the item appears in.'),
                        Textarea::make('description')
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
                        FileUpload::make('image')
                            ->image()
                            ->disk(Setting::HOMEPAGE_UPLOAD_DISK)
                            ->visibility('public')
                            ->directory('gallery')
                            ->maxSize(5120)
                            ->columnSpanFull(),
                        TextInput::make('download_url')
                            ->label('Download link')
                            ->url()
                            ->maxLength(500)
                            ->helperText('Leave blank to hide the Download button.')
                            ->columnSpanFull(),
                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->helperText('Lower numbers appear first.'),
                        Toggle::make('is_published')
                            ->label('Published')
                            ->default(true)
                            ->inline(false),
                    ]),
            ]);
    }
}
