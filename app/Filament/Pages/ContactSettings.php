<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ContactSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected string $view = 'filament.pages.contact-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChatBubbleLeftRight;

    protected static ?string $navigationLabel = 'Contact settings';

    protected static ?string $title = 'Contact settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'whatsapp_number' => Setting::whatsappNumber(),
            'telegram_url' => Setting::telegramUrl(),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Messaging links')
                    ->description('Update the WhatsApp and Telegram links used across the public website and checkout.')
                    ->columns(2)
                    ->components([
                        TextInput::make('whatsapp_number')
                            ->label('WhatsApp number')
                            ->required()
                            ->maxLength(40)
                            ->helperText('Use the full international number. Spaces, dashes, and plus signs are accepted.'),
                        TextInput::make('telegram_url')
                            ->label('Telegram link or username')
                            ->required()
                            ->maxLength(500)
                            ->helperText('Accepts a full link, username, or @username.'),
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

        Setting::set(
            Setting::CONTACT_WHATSAPP_NUMBER,
            Setting::normalizeWhatsappNumber($state['whatsapp_number'] ?? ''),
        );
        Setting::set(
            Setting::CONTACT_TELEGRAM_URL,
            Setting::normalizeTelegramUrl($state['telegram_url'] ?? ''),
        );

        Notification::make()
            ->title('Contact settings saved')
            ->success()
            ->send();
    }
}
