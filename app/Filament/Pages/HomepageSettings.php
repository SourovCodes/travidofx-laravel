<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class HomepageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected string $view = 'filament.pages.homepage-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHome;

    protected static ?string $navigationLabel = 'Homepage settings';

    protected static ?string $title = 'Homepage settings';

    public ?array $data = [];

    public function mount(): void
    {
        $resultLinks = Setting::homepageResultLinks();

        $this->form->fill([
            'balanced_result_url' => $resultLinks['balanced'],
            'aggressive_result_url' => $resultLinks['aggressive'],
            'pricing_packages' => Setting::pricingPackages(),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Result buttons')
                    ->description('Update the two "Check Results" button links shown on the homepage results section.')
                    ->columns(2)
                    ->components([
                        self::urlInput('balanced_result_url', 'Balanced mode result URL'),
                        self::urlInput('aggressive_result_url', 'Aggressive mode result URL'),
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

        Setting::set(Setting::HOMEPAGE_RESULT_LINKS, [
            'balanced' => $state['balanced_result_url'] ?? '',
            'aggressive' => $state['aggressive_result_url'] ?? '',
        ]);
        Setting::set(
            Setting::PRICING_PACKAGES,
            Setting::normalizePricingPackages($state['pricing_packages'] ?? []),
        );

        Notification::make()
            ->title('Settings saved')
            ->success()
            ->send();
    }

    private static function urlInput(string $name, string $label): TextInput
    {
        return TextInput::make($name)
            ->label($label)
            ->required()
            ->url()
            ->maxLength(500);
    }
}
