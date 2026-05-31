<?php

namespace App\Filament\Resources\CryptoWallets\Pages;

use App\Filament\Resources\CryptoWallets\CryptoWalletResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCryptoWallets extends ListRecords
{
    protected static string $resource = CryptoWalletResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
