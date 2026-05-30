<?php

namespace App\Filament\Resources\Coupons\Schemas;

use App\Models\Coupon;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CouponForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Coupon')
                    ->columns(2)
                    ->components([
                        TextInput::make('code')
                            ->required()
                            ->maxLength(50)
                            ->placeholder('LAUNCH10')
                            ->helperText('Uppercase letters, numbers, dashes, underscores.')
                            ->extraInputAttributes(['style' => 'text-transform: uppercase']),
                        Toggle::make('active')
                            ->default(true)
                            ->inline(false),
                        TextInput::make('description')
                            ->maxLength(160)
                            ->placeholder('Launch promo for early customers')
                            ->columnSpanFull(),
                    ]),

                Section::make('Discount')
                    ->columns(2)
                    ->components([
                        Select::make('discount_type')
                            ->options([
                                Coupon::TYPE_PERCENT => 'Percent off (%)',
                                Coupon::TYPE_FIXED => 'Fixed amount off ($)',
                            ])
                            ->required()
                            ->default(Coupon::TYPE_PERCENT)
                            ->native(false),
                        TextInput::make('discount_value')
                            ->required()
                            ->numeric()
                            ->minValue(0.01)
                            ->step(0.01)
                            ->helperText('For percent type, between 0.01 and 100. For fixed, a dollar amount.'),
                    ]),
            ]);
    }
}
