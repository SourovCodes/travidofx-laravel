<?php

namespace App\Filament\Pages;

use App\Enums\LandingPage;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs\Tab;

class ProductsLandingPageSettings extends LandingPageSettingsPage
{
    private const HIGHLIGHT_HINT = 'Wrap words in **double asterisks** to show them in gold.';

    private const BUTTON_URL_HINT = 'Full https:// link, e.g. to checkout. Leave blank to scroll to the pricing section.';

    protected static ?int $navigationSort = 2;

    public static function landingPage(): LandingPage
    {
        return LandingPage::Products;
    }

    protected function listFields(): array
    {
        return [
            ['setup', 'steps'],
            ['faq', 'items'],
        ];
    }

    protected function generalComponents(): array
    {
        return [];
    }

    protected function contentTabs(): array
    {
        return [
            $this->heroTab(),
            $this->benefitsTab(),
            $this->setupTab(),
            $this->pricingTab(),
            $this->faqAndRiskTab(),
        ];
    }

    private function heroTab(): Tab
    {
        return Tab::make('Hero')
            ->components([
                TextInput::make('content.hero.badge')
                    ->label('Badge')
                    ->maxLength(80),
                Textarea::make('content.hero.title')
                    ->label('Title')
                    ->required()
                    ->rows(2)
                    ->maxLength(140)
                    ->helperText(self::HIGHLIGHT_HINT),
                TextInput::make('content.hero.subtitle')
                    ->label('Subtitle')
                    ->maxLength(140),
                Textarea::make('content.hero.body')
                    ->label('Text')
                    ->rows(6)
                    ->maxLength(1500)
                    ->helperText('Leave a blank line between paragraphs.'),
                self::imageUpload('content.hero.image', 'Product image')
                    ->helperText('Leave empty to use the Tradivo product box.'),
                Section::make('Button')
                    ->columns(2)
                    ->components([
                        TextInput::make('content.hero.button_label')
                            ->label('Text')
                            ->maxLength(60)
                            ->helperText('Leave blank to hide the button.'),
                        self::buttonUrlInput('content.hero.button_url'),
                    ]),
            ]);
    }

    private function benefitsTab(): Tab
    {
        return Tab::make('Benefits')
            ->components([
                Section::make('Why choose')
                    ->components([
                        TextInput::make('content.why_choose.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(120)
                            ->helperText(self::HIGHLIGHT_HINT),
                        self::itemsInput('content.why_choose.items'),
                    ]),
                Section::make('Consistency')
                    ->components([
                        TextInput::make('content.consistency.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(120)
                            ->helperText(self::HIGHLIGHT_HINT),
                        TextInput::make('content.consistency.intro')
                            ->label('Intro line')
                            ->maxLength(160),
                        self::itemsInput('content.consistency.items'),
                        Textarea::make('content.consistency.note')
                            ->label('Note')
                            ->rows(2)
                            ->maxLength(500),
                    ]),
            ]);
    }

    private function setupTab(): Tab
    {
        return Tab::make("Setup & what's included")
            ->components([
                Section::make('Setup steps')
                    ->components([
                        TextInput::make('content.setup.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(120)
                            ->helperText(self::HIGHLIGHT_HINT),
                        Repeater::make('content.setup.steps')
                            ->label('Steps')
                            ->helperText('Numbered automatically in this order.')
                            ->simple(
                                TextInput::make('text')
                                    ->required()
                                    ->maxLength(200),
                            )
                            ->maxItems(8)
                            ->reorderable()
                            ->addActionLabel('Add step'),
                    ]),
                Section::make("What's included")
                    ->components([
                        TextInput::make('content.included.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(120)
                            ->helperText(self::HIGHLIGHT_HINT),
                        self::itemsInput('content.included.items'),
                    ]),
            ]);
    }

    private function pricingTab(): Tab
    {
        return Tab::make('Pricing & call to action')
            ->components([
                Section::make('Pricing')
                    ->components([
                        TextInput::make('content.pricing.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(120)
                            ->helperText(self::HIGHLIGHT_HINT),
                        Textarea::make('content.pricing.body')
                            ->label('Text')
                            ->rows(2)
                            ->maxLength(300),
                        Toggle::make('content.pricing.show_plans')
                            ->label('Show pricing plans')
                            ->helperText('Shows the packages from Homepage settings › Pricing. Buy buttons go to checkout on the main website.')
                            ->inline(false),
                        TextInput::make('content.pricing.button_label')
                            ->label('Button text')
                            ->maxLength(60)
                            ->helperText('Shown when plans are hidden or a button link is set. Leave blank to hide.'),
                        TextInput::make('content.pricing.button_url')
                            ->label('Button link')
                            ->url()
                            ->maxLength(500)
                            ->helperText('Leave blank to link to the pricing section of the main website.'),
                    ]),
                Section::make('Closing call to action')
                    ->components([
                        TextInput::make('content.cta.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(120)
                            ->helperText(self::HIGHLIGHT_HINT),
                        Textarea::make('content.cta.body')
                            ->label('Text')
                            ->rows(2)
                            ->maxLength(300),
                        TextInput::make('content.cta.button_label')
                            ->label('Button text')
                            ->maxLength(60)
                            ->helperText('Leave blank to hide the button.'),
                        self::buttonUrlInput('content.cta.button_url'),
                    ]),
            ]);
    }

    private function faqAndRiskTab(): Tab
    {
        return Tab::make('FAQ & risk')
            ->components([
                Section::make('FAQ')
                    ->components([
                        TextInput::make('content.faq.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(120),
                        Repeater::make('content.faq.items')
                            ->label('Questions')
                            ->schema([
                                TextInput::make('question')
                                    ->required()
                                    ->maxLength(200),
                                Textarea::make('answer')
                                    ->required()
                                    ->rows(3)
                                    ->maxLength(1500),
                            ])
                            ->maxItems(20)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('Add question')
                            ->itemLabel(fn (array $state): ?string => $state['question'] ?? null),
                    ]),
                Section::make('Risk warning')
                    ->components([
                        TextInput::make('content.risk.heading')
                            ->label('Heading')
                            ->maxLength(120),
                        Textarea::make('content.risk.body')
                            ->label('Text')
                            ->required()
                            ->rows(4)
                            ->maxLength(1500),
                    ]),
            ]);
    }

    private static function itemsInput(string $name): TagsInput
    {
        return TagsInput::make($name)
            ->label('Points')
            ->reorderable()
            ->splitKeys(['Enter'])
            ->rules(['array', 'max:20'])
            ->nestedRecursiveRules(['string', 'max:200'])
            ->placeholder('Type a point and press Enter');
    }

    private static function buttonUrlInput(string $name): TextInput
    {
        return TextInput::make($name)
            ->label('Link')
            ->url()
            ->maxLength(500)
            ->helperText(self::BUTTON_URL_HINT);
    }
}
