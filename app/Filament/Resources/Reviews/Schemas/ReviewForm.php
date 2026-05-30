<?php

namespace App\Filament\Resources\Reviews\Schemas;

use App\Models\Review;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Reviewer')
                    ->columns(2)
                    ->components([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(80),
                        TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(120),
                        TextInput::make('title')
                            ->label('Headline / Title')
                            ->maxLength(80)
                            ->placeholder('Verified client')
                            ->columnSpanFull(),
                    ]),

                Section::make('Review')
                    ->columns(2)
                    ->components([
                        Select::make('rating')
                            ->options([
                                5 => '5 Stars',
                                4 => '4 Stars',
                                3 => '3 Stars',
                                2 => '2 Stars',
                                1 => '1 Star',
                            ])
                            ->required()
                            ->native(false),
                        Select::make('status')
                            ->options([
                                Review::STATUS_PENDING => 'Pending',
                                Review::STATUS_APPROVED => 'Approved',
                            ])
                            ->required()
                            ->native(false),
                        Textarea::make('body')
                            ->required()
                            ->minLength(20)
                            ->maxLength(700)
                            ->rows(6)
                            ->columnSpanFull(),
                        Toggle::make('featured')
                            ->helperText('Featured reviews appear first on the homepage testimonials.'),
                    ]),

                Section::make('Admin')
                    ->components([
                        Textarea::make('admin_note')
                            ->label('Admin notes')
                            ->rows(3)
                            ->maxLength(500)
                            ->helperText('Internal-only. Not shown to visitors.'),
                    ])
                    ->collapsed(),
            ]);
    }
}
