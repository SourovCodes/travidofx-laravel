<?php

namespace App\Filament\Resources\Orders\Tables;

use App\Models\Order;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')
                    ->label('Placed')
                    ->dateTime('M j, Y g:i a')
                    ->sortable(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('plan_name')
                    ->label('Plan')
                    ->wrap()
                    ->searchable(),
                TextColumn::make('amount_cents')
                    ->label('Total')
                    ->money(fn (Order $record) => $record->currency, divideBy: 100)
                    ->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state) => match ($state) {
                        Order::STATUS_PAID => 'success',
                        Order::STATUS_PENDING => 'warning',
                        Order::STATUS_FAILED => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('payment_method')
                    ->label('Method')
                    ->toggleable(),
                TextColumn::make('coupon_code')
                    ->label('Coupon')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('coupon_discount_cents')
                    ->label('Coupon discount')
                    ->money(fn (Order $record) => $record->currency, divideBy: 100)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('first_name')
                    ->label('First')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('last_name')
                    ->label('Last')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('country')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('plan_slug')
                    ->label('Slug')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('stripe_session_id')
                    ->label('Stripe session')
                    ->copyable()
                    ->limit(16)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('stripe_payment_intent_id')
                    ->label('Payment intent')
                    ->copyable()
                    ->limit(16)
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        Order::STATUS_PENDING => 'Pending',
                        Order::STATUS_PAID => 'Paid',
                        Order::STATUS_FAILED => 'Failed',
                    ]),
                SelectFilter::make('plan_slug')
                    ->label('Plan')
                    ->options(collect(config('plans.lookup'))
                        ->mapWithKeys(fn ($plan, $slug) => [$slug => $plan['name']])
                        ->all()),
            ])
            ->recordActions([])
            ->toolbarActions([]);
    }
}
