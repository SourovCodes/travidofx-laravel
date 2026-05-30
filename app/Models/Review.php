<?php

namespace App\Models;

use Database\Factories\ReviewFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    /** @use HasFactory<ReviewFactory> */
    use HasFactory;

    public const STATUS_PENDING = 'pending';

    public const STATUS_APPROVED = 'approved';

    protected $fillable = [
        'name',
        'email',
        'title',
        'rating',
        'body',
        'status',
        'featured',
        'admin_note',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'featured' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_APPROVED);
    }
}
