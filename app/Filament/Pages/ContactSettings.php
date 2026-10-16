<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
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
            'whatsapp_message' => Setting::whatsappMessage(),
            'social_links' => Setting::socialLinkRows(),
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
                        Textarea::make('whatsapp_message')
                            ->label('WhatsApp pre-filled message')
                            ->rows(2)
                            ->maxLength(500)
                            ->helperText('Typed into the chat when visitors tap the WhatsApp button. Leave blank for no message.')
                            ->columnSpanFull(),
                    ]),
                Section::make('Footer social links')
                    ->description('Icons shown in the website footer, in this order. Add, remove, or reorder them freely.')
                    ->components([
                        Repeater::make('social_links')
                            ->hiddenLabel()
                            ->schema([
                                Select::make('platform')
                                    ->options(Setting::SOCIAL_PLATFORMS)
                                    ->required()
                                    ->native(false)
                                    ->live(),
                                TextInput::make('url')
                                    ->label('Link')
                                    ->url()
                                    ->maxLength(500)
                                    ->required(fn (Get $get): bool => ! in_array($get('platform'), ['whatsapp', 'telegram'], true))
                                    ->helperText(fn (Get $get): ?string => in_array($get('platform'), ['whatsapp', 'telegram'], true)
                                        ? 'Leave blank to use the messaging link above.'
                                        : null),
                            ])
                            ->columns(2)
                            ->maxItems(12)
                            ->reorderable()
                            ->defaultItems(0)
                            ->addActionLabel('Add social link')
                            ->itemLabel(fn (array $state): ?string => Setting::SOCIAL_PLATFORMS[$state['platform'] ?? ''] ?? null),
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
        Setting::set(Setting::CONTACT_WHATSAPP_MESSAGE, trim((string) ($state['whatsapp_message'] ?? '')));
        Setting::set(
            Setting::SOCIAL_LINKS,
            Setting::normalizeSocialLinkRows(array_values($state['social_links'] ?? [])),
        );

        Notification::make()
            ->title('Contact settings saved')
            ->success()
            ->send();
    }
}
