<?php

namespace App\Models;

use App\Enums\ProductGalleryStatus;
use Database\Factories\ProductGalleryItemFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductGalleryItem extends Model
{
    /** @use HasFactory<ProductGalleryItemFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'status',
        'download_url',
        'sort_order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'status' => ProductGalleryStatus::class,
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function imageUrl(): ?string
    {
        return Setting::homepageImageUrl($this->image);
    }
}
