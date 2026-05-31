<?php

namespace Database\Seeders;

use App\Models\CryptoWallet;
use Illuminate\Database\Seeder;

class CryptoWalletSeeder extends Seeder
{
    public function run(): void
    {
        $wallets = [
            [
                'key' => 'usdt-bep20',
                'asset' => 'USDT',
                'network' => 'BEP20 (BSC)',
                'address' => '0xYOUR_BEP20_ADDRESS_HERE',
                'sort_order' => 1,
            ],
            [
                'key' => 'usdt-trc20',
                'asset' => 'USDT',
                'network' => 'TRC20 (Tron)',
                'address' => 'TYOUR_TRC20_ADDRESS_HERE',
                'sort_order' => 2,
            ],
            [
                'key' => 'btc',
                'asset' => 'BTC',
                'network' => 'Bitcoin',
                'address' => 'bc1YOUR_BTC_ADDRESS_HERE',
                'sort_order' => 3,
            ],
            [
                'key' => 'ltc',
                'asset' => 'LTC',
                'network' => 'Litecoin',
                'address' => 'ltc1YOUR_LTC_ADDRESS_HERE',
                'sort_order' => 4,
            ],
        ];

        foreach ($wallets as $wallet) {
            CryptoWallet::updateOrCreate(
                ['key' => $wallet['key']],
                $wallet + ['active' => true],
            );
        }
    }
}
