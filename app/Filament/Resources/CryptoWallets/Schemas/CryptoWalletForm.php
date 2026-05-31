<?php

namespace App\Filament\Resources\CryptoWallets\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CryptoWalletForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Wallet')
                    ->columns(2)
                    ->components([
                        TextInput::make('key')
                            ->required()
                            ->maxLength(50)
                            ->unique(ignoreRecord: true)
                            ->placeholder('usdt-bep20')
                            ->helperText('Unique identifier (lowercase, dashes). Used internally on the checkout page.')
                            ->extraInputAttributes(['style' => 'text-transform: lowercase']),
                        Toggle::make('active')
                            ->default(true)
                            ->inline(false)
                            ->helperText('Inactive wallets are hidden from the checkout page.'),
                        TextInput::make('asset')
                            ->required()
                            ->maxLength(20)
                            ->placeholder('USDT')
                            ->helperText('Short symbol shown in the wallet picker.'),
                        TextInput::make('network')
                            ->required()
                            ->maxLength(60)
                            ->placeholder('BEP20 (BSC)')
                            ->helperText('Network label shown under the asset.'),
                        TextInput::make('address')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('0x...')
                            ->columnSpanFull(),
                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->helperText('Lower numbers appear first.'),
                    ]),
            ]);
    }
}
