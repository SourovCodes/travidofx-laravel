<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class CryptoWallet extends Model
{
    protected $fillable = [
        'key',
        'asset',
        'network',
        'address',
        'sort_order',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'active' => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function setKeyAttribute(string $value): void
    {
        $this->attributes['key'] = strtolower(trim($value));
    }
}
