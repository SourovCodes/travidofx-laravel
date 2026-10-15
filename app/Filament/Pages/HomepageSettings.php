<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class HomepageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    /**
     * Single image upload fields, as [section, key] pairs.
     *
     * @var array<int, array{0: string, 1: string}>
     */
    private const IMAGE_FIELDS = [
        ['hero', 'background_image'],
        ['hero', 'box_image'],
        ['description', 'package_image'],
        ['description', 'icon_image'],
        ['results', 'image'],
    ];

    /**
     * Repeater fields stored as plain lists, as [section, key] pairs.
     *
     * @var array<int, array{0: string, 1: string}>
     */
    private const LIST_FIELDS = [
        ['hero', 'slides'],
        ['success_keys', 'items'],
        ['why_choose', 'items'],
        ['installation', 'stats'],
        ['faq', 'items'],
    ];

    /** @var array<string, string> */
    private const WHY_ICON_OPTIONS = [
        'check' => 'Check mark',
        'preset' => 'Stacked squares',
        'moon' => 'Moon',
        'shield' => 'Shield',
        'infinity' => 'Infinity',
        'monitor' => 'Monitor',
    ];

    private const MARKDOWN_HINT = 'Wrap words in **double asterisks** for bold. New lines are kept.';

    protected string $view = 'filament.pages.homepage-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHome;

    protected static ?string $navigationLabel = 'Homepage settings';

    protected static ?string $title = 'Homepage settings';

    public ?array $data = [];

    public function mount(): void
    {
        $content = Setting::homepageContentState();

        // Bundled default images aren't uploads, so leave the upload fields empty for them.
        foreach (self::IMAGE_FIELDS as [$section, $key]) {
            if (Setting::isBundledAsset($content[$section][$key] ?? null)) {
                $content[$section][$key] = null;
            }
        }

        $content['results']['button_url'] ??= Setting::homepageResultLinks()['balanced'];

        $this->form->fill([
            'content' => $content,
            'pricing_packages' => Setting::pricingPackages(),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Homepage')
                    ->persistTabInQueryString()
                    ->tabs([
                        $this->heroTab(),
                        $this->successKeysTab(),
                        $this->descriptionTab(),
                        $this->resultsTab(),
                        $this->whyChooseTab(),
                        $this->pricingTab(),
                        $this->installationTab(),
                        $this->galleryTab(),
                        $this->faqTab(),
                        $this->testimonialsAndContactTab(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save settings')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        $state = $this->form->getState();
        $content = $state['content'] ?? [];

        foreach (self::LIST_FIELDS as [$section, $key]) {
            $content[$section][$key] = array_values($content[$section][$key] ?? []);
        }

        Setting::set(Setting::HOMEPAGE_CONTENT, $content);
        Setting::set(
            Setting::PRICING_PACKAGES,
            Setting::normalizePricingPackages($state['pricing_packages'] ?? []),
        );

        Notification::make()
            ->title('Settings saved')
            ->success()
            ->send();
    }

    private function heroTab(): Tab
    {
        return Tab::make('Hero')
            ->components([
                Section::make('Layers')
                    ->description('The background and the product box are separate layers. Leave an image empty to use the default.')
                    ->columns(2)
                    ->components([
                        self::imageUpload('content.hero.background_image', 'Background image')
                            ->helperText('Full-width background. Use an image without the product box when the box layer is on.'),
                        self::imageUpload('content.hero.box_image', 'Product box image')
                            ->helperText('Shown on the right side of the hero. Transparent PNG works best.'),
                        Toggle::make('content.hero.show_box')
                            ->label('Show product box layer')
                            ->inline(false)
                            ->columnSpanFull(),
                    ]),
                Section::make('Slides')
                    ->components([
                        Repeater::make('content.hero.slides')
                            ->hiddenLabel()
                            ->schema([
                                TextInput::make('subtitle')
                                    ->required()
                                    ->maxLength(80),
                                Textarea::make('title')
                                    ->required()
                                    ->rows(2)
                                    ->maxLength(120)
                                    ->helperText('The first word is highlighted. New lines are kept.'),
                                Textarea::make('body')
                                    ->required()
                                    ->rows(3)
                                    ->maxLength(400)
                                    ->helperText(self::MARKDOWN_HINT)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->minItems(1)
                            ->maxItems(6)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('Add slide')
                            ->itemLabel(fn (array $state): ?string => $state['subtitle'] ?? null),
                    ]),
            ]);
    }

    private function successKeysTab(): Tab
    {
        return Tab::make('Success keys')
            ->components([
                TextInput::make('content.success_keys.heading')
                    ->label('Heading')
                    ->required()
                    ->maxLength(120),
                Repeater::make('content.success_keys.items')
                    ->label('Cards')
                    ->schema([
                        Hidden::make('default_image'),
                        self::imageUpload('image', 'Image')
                            ->columnSpanFull(),
                        TextInput::make('title')
                            ->maxLength(80),
                        TextInput::make('subtitle')
                            ->maxLength(120),
                    ])
                    ->columns(2)
                    ->maxItems(8)
                    ->reorderable()
                    ->collapsible()
                    ->addActionLabel('Add card')
                    ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
            ]);
    }

    private function descriptionTab(): Tab
    {
        return Tab::make('Description')
            ->components([
                Textarea::make('content.description.eyebrow')
                    ->label('Eyebrow heading')
                    ->required()
                    ->rows(2)
                    ->maxLength(200),
                Textarea::make('content.description.body')
                    ->label('Body')
                    ->required()
                    ->rows(12)
                    ->maxLength(5000)
                    ->helperText('Markdown: blank line between paragraphs, **bold**, and "- " for list items.'),
                TextInput::make('content.description.features_heading')
                    ->label('Features heading')
                    ->maxLength(160),
                TagsInput::make('content.description.features')
                    ->label('Features')
                    ->reorderable()
                    ->rules(['array', 'max:30'])
                    ->nestedRecursiveRules(['string', 'max:160'])
                    ->placeholder('Type a feature and press Enter'),
                Textarea::make('content.description.disclaimer')
                    ->label('Disclaimer')
                    ->rows(3)
                    ->maxLength(600),
                Section::make('Images')
                    ->description('Leave empty to use the default image.')
                    ->columns(2)
                    ->components([
                        self::imageUpload('content.description.package_image', 'Product image'),
                        self::imageUpload('content.description.icon_image', 'Overlay badge image'),
                    ]),
            ]);
    }

    private function resultsTab(): Tab
    {
        return Tab::make('Results')
            ->components([
                TextInput::make('content.results.source')
                    ->label('Intro line')
                    ->maxLength(160),
                TextInput::make('content.results.heading')
                    ->label('Heading')
                    ->required()
                    ->maxLength(160),
                TextInput::make('content.results.title')
                    ->label('Card title')
                    ->maxLength(160),
                Textarea::make('content.results.body')
                    ->label('Card text')
                    ->rows(3)
                    ->maxLength(600),
                self::imageUpload('content.results.image', 'Chart image')
                    ->helperText('Leave empty to use the default image.'),
                TextInput::make('content.results.button_label')
                    ->label('Button label')
                    ->maxLength(60)
                    ->helperText('Leave blank to hide the button.'),
                TextInput::make('content.results.button_url')
                    ->label('Button URL')
                    ->url()
                    ->maxLength(500),
            ]);
    }

    private function whyChooseTab(): Tab
    {
        return Tab::make('Why choose')
            ->components([
                TextInput::make('content.why_choose.emoji')
                    ->label('Emoji above heading')
                    ->maxLength(16),
                TextInput::make('content.why_choose.heading')
                    ->label('Heading')
                    ->required()
                    ->maxLength(160),
                Repeater::make('content.why_choose.items')
                    ->label('Items')
                    ->schema([
                        Select::make('icon')
                            ->options(self::WHY_ICON_OPTIONS)
                            ->required()
                            ->native(false),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(80),
                        TextInput::make('subtitle')
                            ->maxLength(160)
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->maxItems(12)
                    ->reorderable()
                    ->collapsible()
                    ->addActionLabel('Add item')
                    ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
            ]);
    }

    private function pricingTab(): Tab
    {
        return Tab::make('Pricing')
            ->components([
                Section::make('Pricing banner')
                    ->components([
                        Textarea::make('content.pricing_banner.intro')
                            ->label('Intro')
                            ->rows(2)
                            ->maxLength(300)
                            ->helperText(self::MARKDOWN_HINT),
                        TextInput::make('content.pricing_banner.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(160),
                        TextInput::make('content.pricing_banner.highlight')
                            ->label('Highlight line')
                            ->maxLength(160),
                    ]),
                Section::make('Pricing packages')
                    ->description('Show between 2 and 4 packages. The slug is used by checkout URLs, so keep it stable for active packages.')
                    ->components([
                        Repeater::make('pricing_packages')
                            ->hiddenLabel()
                            ->schema([
                                TextInput::make('slug')
                                    ->required()
                                    ->maxLength(50)
                                    ->regex('/^[a-z0-9-]+$/')
                                    ->helperText('Lowercase letters, numbers, and dashes only. Used in /checkout?plan=...'),
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(80)
                                    ->placeholder('Pro'),
                                TextInput::make('access_duration')
                                    ->label('Access duration')
                                    ->required()
                                    ->maxLength(120)
                                    ->placeholder('1 Year Access'),
                                TextInput::make('amount')
                                    ->label('Current price ($)')
                                    ->required()
                                    ->numeric()
                                    ->minValue(0.01)
                                    ->step(0.01),
                                TextInput::make('old_amount')
                                    ->label('Old price ($)')
                                    ->numeric()
                                    ->minValue(0.01)
                                    ->step(0.01)
                                    ->helperText('Leave blank or match current price to hide the strikethrough discount.'),
                                Select::make('badge')
                                    ->options(Setting::PRICING_BADGE_OPTIONS)
                                    ->placeholder('No badge')
                                    ->native(false),
                                TagsInput::make('features')
                                    ->required()
                                    ->reorderable()
                                    ->rules(['array', 'max:12'])
                                    ->nestedRecursiveRules(['string', 'max:160'])
                                    ->placeholder('Type a feature and press Enter')
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->minItems(2)
                            ->maxItems(4)
                            ->reorderable()
                            ->addActionLabel('Add package')
                            ->itemLabel(fn (array $state): ?string => $state['name'] ?? null),
                    ]),
            ]);
    }

    private function installationTab(): Tab
    {
        return Tab::make('Installation')
            ->components([
                TextInput::make('content.installation.heading')
                    ->label('Heading')
                    ->required()
                    ->maxLength(160),
                TextInput::make('content.installation.video_url')
                    ->label('Video embed URL')
                    ->url()
                    ->maxLength(500)
                    ->helperText('YouTube embed link, e.g. https://www.youtube.com/embed/VIDEO_ID. Leave blank to hide the video.'),
                Repeater::make('content.installation.stats')
                    ->label('Stats')
                    ->schema([
                        TextInput::make('value')
                            ->required()
                            ->maxLength(20),
                        TextInput::make('label')
                            ->required()
                            ->maxLength(80),
                    ])
                    ->columns(2)
                    ->maxItems(4)
                    ->reorderable()
                    ->addActionLabel('Add stat'),
            ]);
    }

    private function galleryTab(): Tab
    {
        return Tab::make('Gallery')
            ->components([
                TextInput::make('content.gallery.heading')
                    ->label('Heading')
                    ->required()
                    ->maxLength(160),
                TextInput::make('content.gallery.subtitle')
                    ->label('Subtitle')
                    ->maxLength(300)
                    ->helperText('Gallery items are managed under Product gallery in the sidebar.'),
            ]);
    }

    private function faqTab(): Tab
    {
        return Tab::make('FAQ')
            ->components([
                TextInput::make('content.faq.heading')
                    ->label('Heading')
                    ->required()
                    ->maxLength(160),
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
                    ->maxItems(30)
                    ->reorderable()
                    ->collapsible()
                    ->collapsed()
                    ->addActionLabel('Add question')
                    ->itemLabel(fn (array $state): ?string => $state['question'] ?? null),
            ]);
    }

    private function testimonialsAndContactTab(): Tab
    {
        return Tab::make('Testimonials & contact')
            ->components([
                Section::make('Testimonials')
                    ->components([
                        TextInput::make('content.testimonials.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(160),
                        Textarea::make('content.testimonials.subtitle')
                            ->label('Subtitle')
                            ->rows(2)
                            ->maxLength(300),
                    ]),
                Section::make('Contact')
                    ->components([
                        TextInput::make('content.contact.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(160),
                        TextInput::make('content.contact.subtitle')
                            ->label('Subtitle')
                            ->maxLength(300),
                        TextInput::make('content.contact.cta_heading')
                            ->label('Form side heading')
                            ->maxLength(160),
                        Textarea::make('content.contact.cta_body')
                            ->label('Form side text')
                            ->rows(3)
                            ->maxLength(600),
                    ]),
            ]);
    }

    private static function imageUpload(string $name, string $label): FileUpload
    {
        return FileUpload::make($name)
            ->label($label)
            ->image()
            ->disk(Setting::HOMEPAGE_UPLOAD_DISK)
            ->visibility('public')
            ->directory('homepage')
            ->maxSize(5120);
    }
}
