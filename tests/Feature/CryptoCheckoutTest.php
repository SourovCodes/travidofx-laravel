<?php

use App\Models\CryptoWallet;
use Inertia\Testing\AssertableInertia as Assert;

test('checkout exposes active crypto wallets as payment options', function () {
    CryptoWallet::query()->create([
        'key' => 'usdt-bep20',
        'asset' => 'USDT',
        'network' => 'BEP20',
        'address' => '0xACTIVE',
        'sort_order' => 2,
        'active' => true,
    ]);
    CryptoWallet::query()->create([
        'key' => 'usdt-trc20',
        'asset' => 'USDT',
        'network' => 'TRC20',
        'address' => 'TACTIVE',
        'sort_order' => 1,
        'active' => true,
    ]);
    CryptoWallet::query()->create([
        'key' => 'inactive',
        'asset' => 'USDC',
        'network' => 'Polygon',
        'address' => '0xINACTIVE',
        'sort_order' => 0,
        'active' => false,
    ]);

    $this->get(route('checkout', ['plan' => 'pro']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('checkout/index')
            ->has('cryptoWallets', 2)
            ->where('cryptoWallets.0.key', 'usdt-trc20')
            ->where('cryptoWallets.0.address', 'TACTIVE')
            ->where('cryptoWallets.1.key', 'usdt-bep20')
            ->missing('cryptoWallets.2')
        );
});
