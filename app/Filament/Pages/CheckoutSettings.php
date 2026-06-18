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
            'stripe_fee_percent' => self::rateToPercent(Setting::paymentFeeRateFor('stripe')),
            'skrill_fee_percent' => self::rateToPercent(Setting::paymentFeeRateFor('skrill')),
            'payoneer_fee_percent' => self::rateToPercent(Setting::paymentFeeRateFor('payoneer')),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Payment processing fees')
                    ->description('Set the fee percentage added on top of each manual payment method shown at checkout.')
                    ->columns(3)
                    ->components([
                        self::percentInput('stripe_fee_percent', 'Card (Stripe) fee (%)'),
                        self::percentInput('skrill_fee_percent', 'Skrill / Neteller fee (%)'),
                        self::percentInput('payoneer_fee_percent', 'Payoneer / Wise fee (%)'),
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

        Setting::set(Setting::PAYMENT_FEE_RATE_STRIPE, ((float) ($state['stripe_fee_percent'] ?? 0)) / 100);
        Setting::set(Setting::PAYMENT_FEE_RATE_SKRILL, ((float) ($state['skrill_fee_percent'] ?? 0)) / 100);
        Setting::set(Setting::PAYMENT_FEE_RATE_PAYONEER, ((float) ($state['payoneer_fee_percent'] ?? 0)) / 100);

        Notification::make()
            ->title('Settings saved')
            ->success()
            ->send();
    }

    private static function percentInput(string $name, string $label): TextInput
    {
        return TextInput::make($name)
            ->label($label)
            ->required()
            ->numeric()
            ->minValue(0)
            ->maxValue(100)
            ->step(0.01)
            ->suffix('%')
            ->helperText('Set to 0 to disable.');
    }

    private static function rateToPercent(float $rate): float
    {
        return round($rate * 100, 2);
    }
}
