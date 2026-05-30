<?php

namespace App\Filament\Resources\Coupons\Tables;

use App\Models\Coupon;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CouponsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')
                    ->badge()
                    ->color('warning')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('description')
                    ->limit(50)
                    ->toggleable(),
                TextColumn::make('discount_type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state) => $state === Coupon::TYPE_PERCENT ? 'info' : 'gray'),
                TextColumn::make('discount_value')
                    ->label('Value')
                    ->formatStateUsing(fn ($state, Coupon $record) => $record->discount_type === Coupon::TYPE_PERCENT
                        ? rtrim(rtrim(number_format((float) $state, 2), '0'), '.').'%'
                        : '$'.number_format((float) $state, 2))
                    ->sortable(),
                IconColumn::make('active')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime('M j, Y g:i a')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                TernaryFilter::make('active'),
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
