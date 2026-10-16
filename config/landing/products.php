<?php

/*
|--------------------------------------------------------------------------
| Landing page 2 (products) defaults
|--------------------------------------------------------------------------
|
| The landing page is served on its own domains (set in its admin
| settings page). These values are used whenever an admin has not saved a
| custom value. Text marked as "highlight" turns **wrapped words** gold.
| A blank button link scrolls to the pricing section on the page.
|
*/

return [
    'domains' => ['products.tradivofx.com'],

    'seo' => [
        'title' => 'Tradivo Magic EA for MT5 | Automated Trading, Full Control',
        'description' => 'Tradivo Magic EA is an Expert Advisor for MetaTrader 5 that automates predefined trading strategies with customizable risk management and trading parameters.',
    ],

    'hero' => [
        'badge' => 'Compatible with MetaTrader 5 (MT5)',
        'title' => 'Trade Smarter with **Tradivo Magic EA** for MT5',
        'subtitle' => 'Automated Trading. Full Control. Designed for MT5.',
        'body' => "Tradivo Magic EA is an Expert Advisor (EA) for MetaTrader 5 that helps traders automate predefined trading strategies with customizable risk management and trading parameters.\n\nWhether you're looking to reduce screen time or execute your strategy consistently, Tradivo Magic EA gives you the tools to automate your trading workflow.",
        'image' => null,
        'default_image' => '/img/tradivo-package.jpeg',
        'button_label' => 'Get Started',
        'button_url' => null,
    ],

    'why_choose' => [
        'heading' => 'Why Choose **Tradivo Magic EA**?',
        'items' => [
            'Automated trade execution based on predefined logic',
            'Customizable risk management settings',
            'Built-in money management features',
            'Flexible trading parameters',
            'Easy setup and activation',
            'License management with ongoing support',
            'Regular software updates',
        ],
    ],

    'consistency' => [
        'heading' => 'Built for Traders Who Want **Consistency**',
        'intro' => 'Tradivo Magic EA can help you:',
        'items' => [
            'Execute your trading strategy consistently',
            'Reduce manual trade execution',
            'Save time by automating routine trading tasks',
            'Maintain disciplined trading according to your configured rules',
        ],
        'note' => 'The software does not remove market risk, and users remain responsible for their own trading decisions and account management.',
    ],

    'setup' => [
        'heading' => 'Simple **Setup**',
        'steps' => [
            'Choose your preferred license plan.',
            'Install the EA on MetaTrader 5.',
            'Activate your license and configure your preferred settings.',
            'Monitor your trading and adjust settings whenever needed.',
        ],
    ],

    'included' => [
        'heading' => "What's **Included**",
        'items' => [
            'Tradivo Magic EA License',
            'Installation Guide',
            'License Activation',
            'Customer Support',
            'Product Updates',
        ],
    ],

    'pricing' => [
        'heading' => 'Pricing',
        'body' => 'Choose the license plan that best suits your trading needs.',
        'show_plans' => true,
        'button_label' => 'View Plans & Get Started',
        'button_url' => null,
    ],

    'faq' => [
        'heading' => 'Frequently Asked Questions',
        'items' => [
            [
                'question' => 'Is Tradivo Magic EA a broker?',
                'answer' => 'No. Tradivo Magic EA is trading automation software designed for MetaTrader 5.',
            ],
            [
                'question' => 'Can beginners use it?',
                'answer' => 'Basic knowledge of MetaTrader 5 and financial market trading is recommended before using any automated trading software.',
            ],
            [
                'question' => 'Will I receive updates?',
                'answer' => 'Yes. Eligible licenses include product updates and technical support according to the selected plan.',
            ],
        ],
    ],

    'risk' => [
        'heading' => 'Trade with Responsibility',
        'body' => 'Trading CFDs, Forex, Gold, and other financial instruments carries a high level of risk and may not be suitable for all investors. You should carefully consider your objectives, experience, and risk tolerance before using automated trading software. Past performance does not guarantee future results.',
    ],

    'cta' => [
        'heading' => 'Ready to Explore **Tradivo Magic EA**?',
        'body' => 'Learn more about the available license plans and start using Tradivo Magic EA with MetaTrader 5.',
        'button_label' => 'View Pricing & Get Started',
        'button_url' => null,
    ],
];
