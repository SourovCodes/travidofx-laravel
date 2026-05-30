<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Order')
                    ->columns(2)
                    ->components([
                        Placeholder::make('placed_at')
                            ->label('Placed')
                            ->content(fn ($record) => $record?->created_at?->format('M j, Y g:i a')),
                        Placeholder::make('status')
                            ->content(fn ($record) => $record?->status),
                        Placeholder::make('plan_name')
                            ->label('Plan')
                            ->content(fn ($record) => $record?->plan_name),
                        Placeholder::make('amount')
                            ->label('Total')
                            ->content(fn ($record) => $record
                                ? '$'.number_format($record->amount_cents / 100, 2).' '.strtoupper($record->currency)
                                : null),
                        Placeholder::make('payment_method')
                            ->label('Payment method')
                            ->content(fn ($record) => $record?->payment_method),
                    ]),

                Section::make('Customer')
                    ->columns(2)
                    ->components([
                        TextInput::make('email')->disabled(),
                        TextInput::make('country')->disabled(),
                        TextInput::make('first_name')->disabled(),
                        TextInput::make('last_name')->disabled(),
                        Textarea::make('additional_info')
                            ->rows(3)
                            ->disabled()
                            ->columnSpanFull(),
                    ]),

                Section::make('Stripe')
                    ->columns(2)
                    ->components([
                        TextInput::make('stripe_session_id')->disabled(),
                        TextInput::make('stripe_payment_intent_id')->disabled(),
                    ])
                    ->collapsed(),
            ]);
    }
}
