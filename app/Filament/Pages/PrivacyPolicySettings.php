<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class PrivacyPolicySettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected string $view = 'filament.pages.privacy-policy-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $navigationLabel = 'Privacy policy';

    protected static ?string $title = 'Privacy policy';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'privacy_policy_markdown' => Setting::privacyPolicyMarkdown(),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Page content')
                    ->description('Edit the Markdown content shown on the public privacy policy page.')
                    ->components([
                        Textarea::make('privacy_policy_markdown')
                            ->label('Privacy policy content')
                            ->required()
                            ->rows(28)
                            ->autosize()
                            ->maxLength(60000)
                            ->helperText('Markdown is supported. Raw HTML is stripped before the public page renders.')
                            ->columnSpanFull(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save policy')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        $state = $this->form->getState();

        Setting::set(Setting::PRIVACY_POLICY, $state['privacy_policy_markdown'] ?? '');

        Notification::make()
            ->title('Privacy policy saved')
            ->success()
            ->send();
    }
}
