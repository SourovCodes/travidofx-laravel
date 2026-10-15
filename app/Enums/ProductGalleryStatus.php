<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ProductGalleryStatus: string implements HasLabel
{
    case Current = 'current';
    case Upcoming = 'upcoming';
    case Past = 'past';

    public function getLabel(): string
    {
        return match ($this) {
            self::Current => 'Current',
            self::Upcoming => 'Upcoming',
            self::Past => 'Past',
        };
    }
}
