<?php

namespace App\Filament\Resources\CryptoWallets;

use App\Filament\Resources\CryptoWallets\Pages\CreateCryptoWallet;
use App\Filament\Resources\CryptoWallets\Pages\EditCryptoWallet;
use App\Filament\Resources\CryptoWallets\Pages\ListCryptoWallets;
use App\Filament\Resources\CryptoWallets\Schemas\CryptoWalletForm;
use App\Filament\Resources\CryptoWallets\Tables\CryptoWalletsTable;
use App\Models\CryptoWallet;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CryptoWalletResource extends Resource
{
    protected static ?string $model = CryptoWallet::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCurrencyDollar;

    protected static ?string $navigationLabel = 'Crypto wallets';

    protected static ?string $modelLabel = 'Crypto wallet';

    protected static ?string $recordTitleAttribute = 'asset';

    public static function form(Schema $schema): Schema
    {
        return CryptoWalletForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CryptoWalletsTable::configure($table);
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
            'index' => ListCryptoWallets::route('/'),
            'create' => CreateCryptoWallet::route('/create'),
            'edit' => EditCryptoWallet::route('/{record}/edit'),
        ];
    }
}
