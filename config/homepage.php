<?php

/*
|--------------------------------------------------------------------------
| Homepage content defaults
|--------------------------------------------------------------------------
|
| These values reproduce the original homepage copy and imagery. They are
| used whenever an admin has not saved a custom value in Homepage settings.
| Text fields marked as "markdown" accept **bold** and line breaks.
|
*/

return [
    'hero' => [
        'background_image' => '/img/hero.png',
        'box_image' => '/img/tradivo-package.jpeg',
        'show_box' => false,
        'slides' => [
            [
                'subtitle' => 'Advanced Trading Solution',
                'title' => "Tradivo Magic EA V12\nfor Gold Trading",
                'body' => "Automated **XAUUSD** trading on MT5 with\n**HTF trend filtering**, **counter-trend grid execution**, and\n**smart basket profit targeting**.",
            ],
            [
                'subtitle' => 'Start Automated Trading',
                'title' => "Start with Your\nTrading Plan",
                'body' => "Test **Tradivo Magic EA V12** on MT5.\n**Counter-trend grid**, **drawdown protection**, and\n**news filter** built in — no emotional trading.",
            ],
            [
                'subtitle' => 'Built for Gold Markets',
                'title' => 'Gold Automation, One EA',
                'body' => "Optimized for **XAUUSD** on the\n**1M timeframe**. Choose Balanced, Aggressive,\nor Cent Account mode — disciplined algorithmic execution.",
            ],
        ],
    ],

    'success_keys' => [
        'heading' => 'Success Keys',
        'items' => [
            ['default_image' => '/img/rslide-1.png', 'title' => 'High Profit', 'subtitle' => 'Up to 50% Profit Monthly.'],
            ['default_image' => '/img/rslide-2.png', 'title' => 'Low Risk', 'subtitle' => '<10% (6% Current DD)'],
            ['default_image' => '/img/rslide-3.png', 'title' => 'Stability', 'subtitle' => 'The 5th Month LIVE'],
            ['default_image' => '/img/rslide-4.png', 'title' => 'Money Management', 'subtitle' => 'Daily Target and DD Controller'],
        ],
    ],

    'description' => [
        'eyebrow' => "Tradivo Magic EA V12\nAdvanced Gold Expert Advisor MT5",
        'body' => <<<'MD'
A powerful Expert Advisor built for XAUUSD traders who want intelligent automation, controlled recovery logic, and stable basket management.

Tradivo Magic EA V12 combines HTF trend filtering, counter-trend grid execution, recovery protection, and smart basket profit targeting into one complete automated trading system.

**Included Trading Modes:**

- **Balanced Mode** — stable growth with controlled recovery and moderate drawdown.
- **Aggressive Mode** — faster basket cycles with higher profit potential and increased risk.
- **Cent Account Mode** — optimized settings for small balances and USC accounts.
MD,
        'features_heading' => "What's included with Tradivo Magic EA V12:",
        'features' => [
            'Full MT5 Expert Advisor package',
            'Gold (XAUUSD) support',
            'Smart counter-trend grid system',
            'HTF EMA trend filtering built in',
            'Advanced recovery & basket management',
            'Automatic news filter protection',
            'Sideways market trading mode',
            'Dynamic lot progression system',
            'Drawdown protection & risk control',
            'Compatible with Standard & USC/Cent accounts',
            'Works with Exness, Vantage or any low-spread broker',
            'One-time payment with future updates',
            'License activation system included',
            'Installation guide & setup support',
            'VPS-friendly 24/7 automation',
        ],
        'disclaimer' => '⚠️ Trading involves risk. Past performance does not guarantee future results. Market conditions, broker execution, spread, volatility, and risk settings can affect overall performance.',
        'package_image' => '/img/tradivo-package.jpeg',
        'icon_image' => '/img/tradivo-icon.jpeg',
    ],

    'results' => [
        'source' => 'Verified Performance Statistics By Myfxbook V3.9',
        'heading' => 'Unlock the Full Power of Automated Trading with Tradivo',
        'title' => 'Tradivo Magic EA V12 — Balanced Mode',
        'body' => 'Designed for consistent monthly growth potential with strict risk control and intelligent trade management.',
        'image' => '/img/v12-balance.png',
        'button_label' => 'Check Results -->',
        // When null, the legacy "balanced" result link setting is used.
        'button_url' => null,
    ],

    'why_choose' => [
        'emoji' => '🧠',
        'heading' => 'Why Traders Choose Tradivo Magic EA V12',
        'items' => [
            ['icon' => 'check', 'title' => 'Verified Logic', 'subtitle' => 'Tested strategy with consistent execution'],
            ['icon' => 'preset', 'title' => 'Smart Grid System', 'subtitle' => 'Counter-trend entries for better pricing'],
            ['icon' => 'moon', 'title' => 'Recovery Engine', 'subtitle' => 'Smart basket recovery after drawdown'],
            ['icon' => 'shield', 'title' => 'Drawdown Protection', 'subtitle' => 'Hard DD limit for account safety'],
            ['icon' => 'infinity', 'title' => 'News Filter', 'subtitle' => 'Avoids high-impact volatility'],
            ['icon' => 'monitor', 'title' => 'MT5 Platform', 'subtitle' => 'Works on MT5 with dual asset support'],
        ],
    ],

    'pricing_banner' => [
        'intro' => 'Receive your **download links**, **activation email**, and **step-by-step setup video** immediately after purchase.',
        'heading' => 'Get Instant Access to Tradivo Magic EA V12',
        'highlight' => '🔥 Launch Discount Active – Ends Soon',
    ],

    'installation' => [
        'heading' => 'Tradivo Magic EA Installation Guide',
        'video_url' => 'https://www.youtube.com/embed/vg8RFEG9mTk',
        'stats' => [
            ['value' => '50%', 'label' => 'Up to 50% Monthly Returns'],
            ['value' => '24/7', 'label' => 'VPS-Friendly Automation'],
            ['value' => 'V12', 'label' => 'Tradivo Magic EA V12'],
        ],
    ],

    'gallery' => [
        'heading' => 'Product Gallery',
        'subtitle' => 'Browse our current, upcoming, and past releases.',
    ],

    'faq' => [
        'heading' => 'Frequently Asked Question',
        'items' => [
            ['question' => 'What profit can I expect with Tradivo Magic EA?', 'answer' => "Most live accounts settle in the 40–70% monthly range. That's a guide, not a guarantee — your actual numbers depend on your broker, your risk settings, and what the market does that month."],
            ['question' => 'What is the minimum recommended balance?', 'answer' => 'You can start much smaller on a cent account — as little as $200. But our recommendation is $2,000, where the EA performs at its best.'],
            ['question' => 'What settings should I use with Tradivo Magic EA?', 'answer' => 'Load the .set file that matches your chosen mode — Balanced, Aggressive, or Cent Account. The presets are already tuned and almost always outperform manual tweaks.'],
            ['question' => 'Where can I download Tradivo Magic EA?', 'answer' => 'Two places: the thank-you page after checkout and the confirmation email. Both include the same bundle — the EA, a setup video, and a PDF guide.'],
            ['question' => 'When will I receive my activation license?', 'answer' => "Right after checkout. Make sure to use the email you paid with — that's the address the EA activates against automatically."],
            ['question' => 'Is there a money-back guarantee?', 'answer' => 'No refunds on Tradivo Magic EA V12 — every sale is final. Please review the plan details carefully before purchase.'],
            ['question' => 'Can I run other EAs with Tradivo Magic EA on the same account?', 'answer' => "Don't. Tradivo Magic manages baskets and recovery based on its own risk model. Another EA in the same account will fight that logic and skew both performance and drawdown."],
            ['question' => 'What strategy does Tradivo Magic EA employ?', 'answer' => 'HTF trend filtering combined with a counter-trend grid system, recovery engine, drawdown protection, and an automatic news filter. It also includes a sideways market mode using anchor-based logic.'],
            ['question' => 'Which pair / timeframe works better for this Forex Trading Bot?', 'answer' => "It will run on XAUUSD type symbols and the 1M timeframe — that's where the results come from."],
            ['question' => 'Where can I download the latest version?', 'answer' => 'From the downloads area of your account. Licensed users get an email when a new build lands.'],
            ['question' => 'Is Tradivo Magic EA available for MetaTrader 4?', 'answer' => 'No. Tradivo Magic EA V12 is built exclusively for MetaTrader 5 and is tuned for XAUUSD.'],
            ['question' => 'Any other questions?', 'answer' => 'Email info@tradivofx.com — we usually answer within a business day.'],
        ],
    ],

    'testimonials' => [
        'heading' => 'What Our Clients Say About Us?',
        'subtitle' => 'Testimonials and success stories from traders running Tradivo Magic EA V12 on live and cent accounts.',
    ],

    'contact' => [
        'heading' => "We're Here to Support Your Trading Success",
        'subtitle' => "Our Forex Trading Bot's dedicated support team will reach you very soon",
        'cta_heading' => 'Ready to Automate Your Gold Trading?',
        'cta_body' => 'Discover what Tradivo Magic EA V12 can do for your trading. Our team is ready to help you set up, fine-tune, and get the most out of every basket cycle.',
    ],
];
