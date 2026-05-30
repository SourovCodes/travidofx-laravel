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

class CheckoutSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected string $view = 'filament.pages.checkout-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static ?string $navigationLabel = 'Checkout settings';

    protected static ?string $title = 'Checkout settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'payment_fee_percent' => round(Setting::getFloat(Setting::PAYMENT_FEE_RATE, 0.05) * 100, 2),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Payment processing')
                    ->description('Fee added on top of card/Skrill/Payoneer payments shown at checkout.')
                    ->components([
                        TextInput::make('payment_fee_percent')
                            ->label('Payment fee (%)')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100)
                            ->step(0.01)
                            ->suffix('%')
                            ->helperText('For example, enter 5 for a 5% fee. Set to 0 to disable.'),
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

        $percent = (float) ($state['payment_fee_percent'] ?? 0);
        Setting::set(Setting::PAYMENT_FEE_RATE, $percent / 100);

        Notification::make()
            ->title('Settings saved')
            ->success()
            ->send();
    }
}
