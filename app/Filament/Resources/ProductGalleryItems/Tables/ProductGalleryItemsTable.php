<?php

namespace App\Filament\Resources\ProductGalleryItems\Tables;

use App\Enums\ProductGalleryStatus;
use App\Models\Setting;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProductGalleryItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable(),
                ImageColumn::make('image')
                    ->disk(Setting::HOMEPAGE_UPLOAD_DISK)
                    ->visibility('public'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (ProductGalleryStatus $state): string => match ($state) {
                        ProductGalleryStatus::Current => 'success',
                        ProductGalleryStatus::Upcoming => 'warning',
                        ProductGalleryStatus::Past => 'gray',
                    })
                    ->sortable(),
                TextColumn::make('download_url')
                    ->label('Download link')
                    ->limit(36)
                    ->tooltip(fn ($state) => $state)
                    ->toggleable(),
                IconColumn::make('is_published')
                    ->label('Published')
                    ->boolean(),
                TextColumn::make('updated_at')
                    ->dateTime('M j, Y g:i a')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sort_order', 'asc')
            ->reorderable('sort_order')
            ->filters([
                SelectFilter::make('status')
                    ->options(ProductGalleryStatus::class),
                TernaryFilter::make('is_published')
                    ->label('Published'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
