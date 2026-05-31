<?php

namespace App\Filament\Resources\CryptoWallets\Pages;

use App\Filament\Resources\CryptoWallets\CryptoWalletResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCryptoWallet extends EditRecord
{
    protected static string $resource = CryptoWalletResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
