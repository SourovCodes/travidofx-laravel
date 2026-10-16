<?php

namespace App\Filament\Pages;

use App\Enums\LandingPage;
use App\Models\Setting;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs\Tab;

class ContactLandingPageSettings extends LandingPageSettingsPage
{
    private const HIGHLIGHT_HINT = 'Wrap words in **double asterisks** to show them in green.';

    protected static ?int $navigationSort = 3;

    public static function landingPage(): LandingPage
    {
        return LandingPage::Contact;
    }

    protected function listFields(): array
    {
        return [
            ['hero', 'features'],
            ['contact', 'items'],
            ['about', 'features'],
            ['highlights', 'items'],
            ['footer', 'social_links'],
        ];
    }

    protected function generalComponents(): array
    {
        return [
            Section::make('Header')
                ->columns(2)
                ->components([
                    self::imageUpload('content.header.logo', 'Logo')
                        ->helperText('Square image, shown left of the name. Leave empty to use the shield icon.'),
                    TextInput::make('content.header.brand')
                        ->label('Brand name')
                        ->required()
                        ->maxLength(80)
                        ->helperText(self::HIGHLIGHT_HINT),
                    TextInput::make('content.header.tagline')
                        ->label('Tagline')
                        ->maxLength(120)
                        ->columnSpanFull(),
                ]),
        ];
    }

    protected function contentTabs(): array
    {
        return [
            $this->heroTab(),
            $this->contactTab(),
            $this->aboutTab(),
            $this->highlightsAndFooterTab(),
        ];
    }

    private function heroTab(): Tab
    {
        return Tab::make('Hero')
            ->components([
                TextInput::make('content.hero.badge')
                    ->label('Badge')
                    ->maxLength(60),
                Textarea::make('content.hero.title')
                    ->label('Title')
                    ->required()
                    ->rows(2)
                    ->maxLength(120)
                    ->helperText(self::HIGHLIGHT_HINT.' New lines are kept.'),
                Textarea::make('content.hero.body')
                    ->label('Text')
                    ->rows(3)
                    ->maxLength(400),
                Section::make('Image')
                    ->columns(2)
                    ->components([
                        self::imageUpload('content.hero.image', 'Hero image')
                            ->helperText('Shown on the right, e.g. the robot. Transparent PNG works best.'),
                        Textarea::make('content.hero.note')
                            ->label('Handwritten note')
                            ->rows(2)
                            ->maxLength(60)
                            ->helperText('Shown above the image. Leave blank to hide.'),
                        TextInput::make('content.hero.platform_label')
                            ->label('Platform badge')
                            ->maxLength(20)
                            ->helperText('Shown on the image, e.g. MT5. Leave blank to hide.'),
                    ]),
                Repeater::make('content.hero.features')
                    ->label('Feature chips')
                    ->schema([
                        self::iconSelect(),
                        TextInput::make('label')
                            ->required()
                            ->maxLength(40),
                    ])
                    ->columns(2)
                    ->maxItems(4)
                    ->reorderable()
                    ->addActionLabel('Add feature')
                    ->itemLabel(fn (array $state): ?string => $state['label'] ?? null),
            ]);
    }

    private function contactTab(): Tab
    {
        return Tab::make('Get in touch')
            ->components([
                TextInput::make('content.contact.heading')
                    ->label('Heading')
                    ->required()
                    ->maxLength(80),
                TextInput::make('content.contact.subtitle')
                    ->label('Subtitle')
                    ->maxLength(160),
                Repeater::make('content.contact.items')
                    ->label('Contact rows')
                    ->schema([
                        self::iconSelect(),
                        self::colorSelect(),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(60),
                        TextInput::make('subtitle')
                            ->maxLength(80),
                        TextInput::make('button_label')
                            ->label('Button text')
                            ->required()
                            ->maxLength(60),
                        TextInput::make('url')
                            ->label('Button link')
                            ->maxLength(500)
                            ->rule('regex:/^(https?:\/\/|mailto:|tel:)\S+$/i')
                            ->validationMessages(['regex' => 'Use a full link starting with https://, mailto: or tel:.'])
                            ->helperText('https://, mailto: or tel: link. Leave blank to show the text as a plain field.'),
                        TextInput::make('copy_value')
                            ->label('Copy button value')
                            ->maxLength(200)
                            ->helperText('Copied when the copy icon is clicked. Leave blank to hide the copy icon.')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->maxItems(12)
                    ->reorderable()
                    ->collapsible()
                    ->addActionLabel('Add contact row')
                    ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
            ]);
    }

    private function aboutTab(): Tab
    {
        return Tab::make('About')
            ->components([
                Toggle::make('content.about.enabled')
                    ->label('Show about section')
                    ->inline(false),
                TextInput::make('content.about.badge')
                    ->label('Badge')
                    ->maxLength(30),
                TextInput::make('content.about.title')
                    ->label('Title')
                    ->required()
                    ->maxLength(120)
                    ->helperText(self::HIGHLIGHT_HINT),
                Textarea::make('content.about.body')
                    ->label('Text')
                    ->rows(4)
                    ->maxLength(1000),
                Textarea::make('content.about.tagline')
                    ->label('Handwritten tagline')
                    ->rows(2)
                    ->maxLength(80),
                self::imageUpload('content.about.image', 'Image')
                    ->helperText('Shown on the right on wide screens. Leave empty to hide.'),
                Repeater::make('content.about.features')
                    ->label('Features')
                    ->schema([
                        self::iconSelect(),
                        self::colorSelect(),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(60),
                        TextInput::make('subtitle')
                            ->maxLength(120),
                    ])
                    ->columns(2)
                    ->maxItems(6)
                    ->reorderable()
                    ->collapsible()
                    ->addActionLabel('Add feature')
                    ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
            ]);
    }

    private function highlightsAndFooterTab(): Tab
    {
        return Tab::make('Highlights & footer')
            ->components([
                Section::make('Highlights strip')
                    ->components([
                        Repeater::make('content.highlights.items')
                            ->hiddenLabel()
                            ->schema([
                                self::iconSelect(),
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(40),
                                TextInput::make('subtitle')
                                    ->maxLength(60),
                            ])
                            ->columns(3)
                            ->maxItems(4)
                            ->reorderable()
                            ->addActionLabel('Add highlight')
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
                    ]),
                Section::make('Footer')
                    ->components([
                        TextInput::make('content.footer.tagline')
                            ->label('Handwritten tagline')
                            ->maxLength(60),
                        Repeater::make('content.footer.social_links')
                            ->label('Social icons')
                            ->schema([
                                Select::make('platform')
                                    ->options(Setting::SOCIAL_PLATFORMS)
                                    ->required()
                                    ->native(false),
                                TextInput::make('url')
                                    ->label('Link')
                                    ->url()
                                    ->required()
                                    ->maxLength(500),
                            ])
                            ->columns(2)
                            ->maxItems(10)
                            ->reorderable()
                            ->addActionLabel('Add social link')
                            ->itemLabel(fn (array $state): ?string => Setting::SOCIAL_PLATFORMS[$state['platform'] ?? ''] ?? null),
                    ]),
            ]);
    }

    private static function iconSelect(): Select
    {
        return Select::make('icon')
            ->options(Setting::LANDING_ICONS)
            ->required()
            ->searchable()
            ->native(false);
    }

    private static function colorSelect(): Select
    {
        return Select::make('color')
            ->options(Setting::LANDING_COLORS)
            ->required()
            ->native(false);
    }
}
