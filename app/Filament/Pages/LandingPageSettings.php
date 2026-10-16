<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Closure;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Forms\Components\FileUpload;
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

class LandingPageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    /**
     * Repeater fields stored as plain lists, as [section, key] pairs.
     *
     * @var array<int, array{0: string, 1: string}>
     */
    private const LIST_FIELDS = [
        ['hero', 'features'],
        ['contact', 'items'],
        ['about', 'features'],
        ['highlights', 'items'],
        ['footer', 'social_links'],
    ];

    private const HIGHLIGHT_HINT = 'Wrap words in **double asterisks** to show them in green.';

    private const DOMAIN_REGEX = '/^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/';

    protected string $view = 'filament.pages.landing-page-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedGlobeAlt;

    protected static ?string $navigationLabel = 'Landing page';

    protected static ?string $title = 'Landing page settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'domains' => Setting::landingPageDomains(),
            'content' => Setting::landingPageContentState(),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Landing page')
                    ->persistTabInQueryString()
                    ->tabs([
                        $this->generalTab(),
                        $this->heroTab(),
                        $this->contactTab(),
                        $this->aboutTab(),
                        $this->highlightsAndFooterTab(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getHeaderActions(): array
    {
        $domains = Setting::landingPageDomains();

        if ($domains === []) {
            return [];
        }

        return [
            ActionGroup::make(array_map(
                fn (string $domain): Action => Action::make('view-'.md5($domain))
                    ->label($domain)
                    ->url("https://{$domain}", shouldOpenInNewTab: true),
                $domains,
            ))
                ->label('View landing page')
                ->icon(Heroicon::OutlinedArrowTopRightOnSquare)
                ->color('gray')
                ->button(),
        ];
    }

    public function save(): void
    {
        $state = $this->form->getState();
        $content = $state['content'] ?? [];

        foreach (self::LIST_FIELDS as [$section, $key]) {
            $content[$section][$key] = array_values($content[$section][$key] ?? []);
        }

        Setting::set(Setting::LANDING_PAGE_DOMAINS, Setting::normalizeDomains($state['domains'] ?? []));
        Setting::set(Setting::LANDING_PAGE_CONTENT, $content);

        $this->data['domains'] = Setting::landingPageDomains();

        Notification::make()
            ->title('Landing page saved')
            ->success()
            ->send();
    }

    private function generalTab(): Tab
    {
        return Tab::make('Domain & header')
            ->components([
                Section::make('Domains')
                    ->description('Visitors on these domains see the landing page instead of the main website. Every other path on them redirects to the main website.')
                    ->components([
                        TagsInput::make('domains')
                            ->label('Landing page domains')
                            ->placeholder('Type a domain and press Enter')
                            ->reorderable()
                            ->splitKeys(['Tab', ',', ' '])
                            ->rules(['array', 'max:20'])
                            ->nestedRecursiveRules([
                                'string',
                                'max:253',
                                fn (): Closure => function (string $attribute, mixed $value, Closure $fail): void {
                                    $domain = Setting::normalizeDomain($value);

                                    if (! preg_match(self::DOMAIN_REGEX, $domain)) {
                                        $fail("\"{$value}\" is not a valid domain. Use a domain like info.example.com.");

                                        return;
                                    }

                                    if ($domain === Setting::normalizeDomain(parse_url((string) config('app.url'), PHP_URL_HOST))) {
                                        $fail("{$domain} is the main website domain. Use a different domain or subdomain.");
                                    }
                                },
                            ])
                            ->helperText('Add each domain in cPanel too, with its document root set to tradivofx/current/public. Remove every domain to turn the landing page off.'),
                    ]),
                Section::make('Search & browser tab')
                    ->columns(2)
                    ->components([
                        TextInput::make('content.seo.title')
                            ->label('Page title')
                            ->required()
                            ->maxLength(120),
                        Textarea::make('content.seo.description')
                            ->label('Meta description')
                            ->rows(2)
                            ->maxLength(300),
                    ]),
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
            ]);
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

    private static function imageUpload(string $name, string $label): FileUpload
    {
        return FileUpload::make($name)
            ->label($label)
            ->image()
            ->disk(Setting::HOMEPAGE_UPLOAD_DISK)
            ->visibility('public')
            ->directory('landing')
            ->maxSize(5120);
    }
}
