import { useState } from 'react';
import Reveal from '@/components/Reveal';

type Item = { q: string; a: string };

const ITEMS_LEFT: Item[] = [
    {
        q: 'What profit can I expect with Tradivo Magic EA?',
        a: "Most live accounts settle in the 40–70% monthly range. That's a guide, not a guarantee — your actual numbers depend on your broker, your risk settings, and what the market does that month.",
    },
    {
        q: 'What is the minimum recommended balance?',
        a: 'You can start much smaller on a cent account — as little as $200. But our recommendation is $2,000, where the EA performs at its best.',
    },
    {
        q: 'What settings should I use with Tradivo Magic EA?',
        a: 'Load the .set file that matches your chosen mode — Balanced, Aggressive, or Cent Account. The presets are already tuned and almost always outperform manual tweaks.',
    },
    {
        q: 'Where can I download Tradivo Magic EA?',
        a: 'Two places: the thank-you page after checkout and the confirmation email. Both include the same bundle — the EA, a setup video, and a PDF guide.',
    },
    {
        q: 'When will I receive my activation license?',
        a: "Right after checkout. Make sure to use the email you paid with — that's the address the EA activates against automatically.",
    },
    {
        q: 'Is there a money-back guarantee?',
        a: 'No refunds on Tradivo Magic EA V12 — every sale is final. Please review the plan details carefully before purchase.',
    },
];

const ITEMS_RIGHT: Item[] = [
    {
        q: 'Can I run other EAs with Tradivo Magic EA on the same account?',
        a: "Don't. Tradivo Magic manages baskets and recovery based on its own risk model. Another EA in the same account will fight that logic and skew both performance and drawdown.",
    },
    {
        q: 'What strategy does Tradivo Magic EA employ?',
        a: 'HTF trend filtering combined with a counter-trend grid system, recovery engine, drawdown protection, and an automatic news filter. It also includes a sideways market mode using anchor-based logic.',
    },
    {
        q: 'Which pair / timeframe works better for this Forex Trading Bot?',
        a: "It will run on XAUUSD/BTCUSD type symbols and the 1M timeframe — that's where the results come from.",
    },
    {
        q: 'Where can I download the latest version?',
        a: 'From the downloads area of your account. Licensed users get an email when a new build lands.',
    },
    {
        q: 'Is Tradivo Magic EA available for MetaTrader 4?',
        a: 'No. Tradivo Magic EA V12 is built exclusively for MetaTrader 5 and supports both XAUUSD and BTCUSD.',
    },
    {
        q: 'Any other questions?',
        a: 'Email info@tradivofx.com — we usually answer within a business day.',
    },
];

export default function Faq() {
    return (
        <section id="faq" className="bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="section-title">
                            Frequently Asked Question
                        </h2>
                    </div>
                </Reveal>

                <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                    <FaqColumn items={ITEMS_LEFT} startIndex={0} />
                    <FaqColumn
                        items={ITEMS_RIGHT}
                        startIndex={ITEMS_LEFT.length}
                    />
                </div>
            </div>
        </section>
    );
}

function FaqColumn({
    items,
    startIndex,
}: {
    items: Item[];
    startIndex: number;
}) {
    const [open, setOpen] = useState<number | null>(
        startIndex === 0 ? 0 : null,
    );

    return (
        <div className="space-y-3">
            {items.map((item, i) => {
                const idx = startIndex + i;
                const isOpen = open === idx;

                return (
                    <Reveal key={item.q} delay={i * 50}>
                        <div className="border-b border-white/10 transition-colors">
                            <button
                                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                                onClick={() => setOpen(isOpen ? null : idx)}
                                aria-expanded={isOpen}
                            >
                                <span className="font-display text-[15px] font-semibold text-white md:text-base">
                                    {item.q}
                                </span>
                                <span
                                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all ${
                                        isOpen
                                            ? 'rotate-180 bg-gold text-bg'
                                            : 'bg-white/8 text-white/80'
                                    }`}
                                    aria-hidden
                                >
                                    {isOpen ? '−' : '+'}
                                </span>
                            </button>
                            <div
                                className={`grid transition-all duration-300 ease-out ${
                                    isOpen
                                        ? 'grid-rows-[1fr] opacity-100'
                                        : 'grid-rows-[0fr] opacity-0'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="pr-10 pb-5 text-[14px] leading-[1.7] text-white/70">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                );
            })}
        </div>
    );
}
