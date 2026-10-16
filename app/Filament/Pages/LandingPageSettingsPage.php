<?php

namespace App\Filament\Pages;

use App\Enums\LandingPage;
use App\Models\Setting;
use BackedEnum;
use Closure;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

/**
 * Settings page for one landing page: its domains, browser tab text, and content tabs.
 */
abstract class LandingPageSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    private const DOMAIN_REGEX = '/^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/';

    protected string $view = 'filament.pages.landing-page-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedGlobeAlt;

    protected static string|UnitEnum|null $navigationGroup = 'Landing pages';

    public ?array $data = [];

    abstract public static function landingPage(): LandingPage;

    /**
     * Components shown under the domain and browser tab sections on the first tab.
     *
     * @return array<int, Component>
     */
    abstract protected function generalComponents(): array;

    /**
     * Content tabs shown after the first tab.
     *
     * @return array<int, Tab>
     */
    abstract protected function contentTabs(): array;

    /**
     * Repeater fields stored as plain lists, as [section, key] pairs.
     *
     * @return array<int, array{0: string, 1: string}>
     */
    abstract protected function listFields(): array;

    public static function getNavigationLabel(): string
    {
        return static::landingPage()->getLabel();
    }

    public function getTitle(): string
    {
        return static::landingPage()->getLabel();
    }

    public function mount(): void
    {
        $this->form->fill([
            'domains' => Setting::landingPageDomains(static::landingPage()),
            'content' => Setting::landingPageContentState(static::landingPage()),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Landing page')
                    ->persistTabInQueryString()
                    ->tabs([
                        Tab::make('Domains & header')
                            ->components([
                                $this->domainsSection(),
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
                                ...$this->generalComponents(),
                            ]),
                        ...$this->contentTabs(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getHeaderActions(): array
    {
        $domains = Setting::landingPageDomains(static::landingPage());

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
        $page = static::landingPage();
        $state = $this->form->getState();
        $content = $state['content'] ?? [];

        foreach ($this->listFields() as [$section, $key]) {
            $content[$section][$key] = array_values($content[$section][$key] ?? []);
        }

        Setting::set($page->domainsSettingKey(), Setting::normalizeDomains($state['domains'] ?? []));
        Setting::set($page->contentSettingKey(), $content);

        $this->data['domains'] = Setting::landingPageDomains($page);

        Notification::make()
            ->title('Landing page saved')
            ->success()
            ->send();
    }

    private function domainsSection(): Section
    {
        return Section::make('Domains')
            ->description('Visitors on these domains see this landing page instead of the main website. Every other path on them redirects to the main website.')
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

                                return;
                            }

                            foreach (LandingPage::cases() as $otherPage) {
                                if ($otherPage !== static::landingPage() && in_array($domain, Setting::landingPageDomains($otherPage), true)) {
                                    $fail("{$domain} is already used by {$otherPage->getLabel()}.");
                                }
                            }
                        },
                    ])
                    ->helperText('Add each domain in cPanel too, with its document root set to tradivofx/current/public. Remove every domain to turn this landing page off.'),
            ]);
    }

    protected static function imageUpload(string $name, string $label): FileUpload
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
