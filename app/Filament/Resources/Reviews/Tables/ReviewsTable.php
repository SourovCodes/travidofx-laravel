<?php

namespace App\Filament\Resources\Reviews\Tables;

use App\Models\Review;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Headline')
                    ->limit(40)
                    ->toggleable(),
                TextColumn::make('email')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('rating')
                    ->badge()
                    ->color('warning')
                    ->formatStateUsing(fn (int $state) => str_repeat('★', $state)),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state) => match ($state) {
                        Review::STATUS_APPROVED => 'success',
                        Review::STATUS_PENDING => 'warning',
                        default => 'gray',
                    }),
                IconColumn::make('featured')
                    ->boolean(),
                TextColumn::make('body')
                    ->limit(60)
                    ->wrap()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->dateTime('M j, Y g:i a')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        Review::STATUS_PENDING => 'Pending',
                        Review::STATUS_APPROVED => 'Approved',
                    ]),
                TernaryFilter::make('featured'),
            ])
            ->recordActions([
                Action::make('approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Review $record) => $record->status === Review::STATUS_PENDING)
                    ->action(fn (Review $record) => $record->update(['status' => Review::STATUS_APPROVED])),
                Action::make('unpublish')
                    ->icon('heroicon-o-eye-slash')
                    ->color('warning')
                    ->visible(fn (Review $record) => $record->status === Review::STATUS_APPROVED)
                    ->action(fn (Review $record) => $record->update(['status' => Review::STATUS_PENDING])),
                Action::make('feature')
                    ->icon('heroicon-o-star')
                    ->color('warning')
                    ->visible(fn (Review $record) => ! $record->featured && $record->status === Review::STATUS_APPROVED)
                    ->action(fn (Review $record) => $record->update(['featured' => true])),
                Action::make('unfeature')
                    ->icon('heroicon-o-star')
                    ->color('gray')
                    ->visible(fn (Review $record) => $record->featured)
                    ->action(fn (Review $record) => $record->update(['featured' => false])),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
