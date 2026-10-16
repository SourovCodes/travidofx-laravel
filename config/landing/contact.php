<?php

/*
|--------------------------------------------------------------------------
| Landing page 3 (contact) defaults
|--------------------------------------------------------------------------
|
| The landing page is served on its own domains (set in its admin
| settings page). These values are used whenever an admin has not saved a
| custom value. Text marked as "highlight" turns **wrapped words** green.
|
*/

return [
    'domains' => ['info.tradivofx.com'],

    'seo' => [
        'title' => 'Profit Shield EA | Smarter Tools, Safer Trading',
        'description' => 'Profit Shield EA is an automated MT5 trading solution built to help you trade with discipline, manage risk and protect your profits.',
    ],

    'header' => [
        'logo' => null,
        'brand' => 'Profit **Shield** EA',
        'tagline' => 'Smarter Tools • Safer Trading • Better Results',
    ],

    'hero' => [
        'badge' => 'Automated Trading Solution',
        'title' => "Trade Smarter\nwith **Profit Shield EA**",
        'body' => 'An advanced automated solution designed to help you trade with discipline, manage risk and protect your profits.',
        'image' => null,
        'note' => "Your\nTrading Partner",
        'platform_label' => 'MT5',
        'features' => [
            ['icon' => 'shield', 'label' => 'Risk Management'],
            ['icon' => 'gear', 'label' => 'Smart Automation'],
            ['icon' => 'chart', 'label' => 'Consistent Performance'],
        ],
    ],

    'contact' => [
        'heading' => 'Get In Touch',
        'subtitle' => 'Choose your preferred way to connect with us.',
        'items' => [
            [
                'icon' => 'telegram',
                'color' => 'blue',
                'title' => 'Telegram',
                'subtitle' => 'Direct Contact',
                'button_label' => 'Open Telegram',
                'url' => 'https://t.me/ProfitShieldEA',
                'copy_value' => 'https://t.me/ProfitShieldEA',
            ],
            [
                'icon' => 'telegram',
                'color' => 'blue',
                'title' => 'Telegram Username',
                'subtitle' => 'Copy and search in Telegram',
                'button_label' => '@ProfitShieldEA',
                'url' => null,
                'copy_value' => '@ProfitShieldEA',
            ],
            [
                'icon' => 'users',
                'color' => 'green',
                'title' => 'Telegram Group',
                'subtitle' => 'Join our community',
                'button_label' => 'Join Group',
                'url' => 'https://t.me/ProfitShieldEA',
                'copy_value' => null,
            ],
            [
                'icon' => 'whatsapp',
                'color' => 'green',
                'title' => 'WhatsApp Number',
                'subtitle' => 'Click to chat (copy number)',
                'button_label' => '+880 1XXX XXX XXX',
                'url' => 'https://wa.me/8801000000000',
                'copy_value' => '+8801000000000',
            ],
            [
                'icon' => 'whatsapp',
                'color' => 'green',
                'title' => 'WhatsApp Username',
                'subtitle' => 'Copy and search in WhatsApp',
                'button_label' => '@ProfitShieldEA',
                'url' => null,
                'copy_value' => '@ProfitShieldEA',
            ],
            [
                'icon' => 'facebook',
                'color' => 'blue',
                'title' => 'Facebook / Messenger',
                'subtitle' => 'Contact us on Facebook',
                'button_label' => 'Message Us',
                'url' => 'https://m.me/ProfitShieldEA',
                'copy_value' => null,
            ],
            [
                'icon' => 'globe',
                'color' => 'purple',
                'title' => 'Purchase from Website',
                'subtitle' => 'Get your copy directly',
                'button_label' => 'Visit Website',
                'url' => 'https://tradivofx.com',
                'copy_value' => null,
            ],
            [
                'icon' => 'email',
                'color' => 'orange',
                'title' => 'Email Contact',
                'subtitle' => 'For general inquiries',
                'button_label' => 'support@profitshieldea.com',
                'url' => 'mailto:support@profitshieldea.com',
                'copy_value' => 'support@profitshieldea.com',
            ],
        ],
    ],

    'about' => [
        'enabled' => true,
        'badge' => 'About',
        'title' => 'What is **Profit Shield EA**?',
        'body' => 'Profit Shield EA is a powerful automated trading solution built to help you trade with confidence. It uses smart technology, disciplined risk management and advanced algorithms to aim for consistent performance while protecting your capital.',
        'tagline' => "Trade with Confidence\nProtect Your Profits",
        'image' => null,
        'features' => [
            ['icon' => 'shield', 'color' => 'green', 'title' => 'Smart Risk Control', 'subtitle' => 'Helps manage risk and protect your capital.'],
            ['icon' => 'gear', 'color' => 'blue', 'title' => 'Fully Automated', 'subtitle' => 'Works 24/5 with precision and discipline.'],
            ['icon' => 'chart', 'color' => 'purple', 'title' => 'Optimized for MT5', 'subtitle' => 'Designed for smooth and stable performance.'],
            ['icon' => 'headset', 'color' => 'orange', 'title' => 'Dedicated Support', 'subtitle' => "We're always here to help you."],
        ],
    ],

    'highlights' => [
        'items' => [
            ['icon' => 'shield', 'title' => 'Trusted Solution', 'subtitle' => 'Built for Traders'],
            ['icon' => 'chart', 'title' => 'Better Strategies', 'subtitle' => 'for Consistent Growth'],
            ['icon' => 'heart', 'title' => 'Your Success', 'subtitle' => 'is Our Priority'],
        ],
    ],

    'footer' => [
        'tagline' => "Let's Grow Together",
        'social_links' => [
            ['platform' => 'telegram', 'url' => 'https://t.me/ProfitShieldEA'],
            ['platform' => 'whatsapp', 'url' => 'https://wa.me/8801000000000'],
            ['platform' => 'facebook', 'url' => 'https://facebook.com/ProfitShieldEA'],
        ],
    ],
];
