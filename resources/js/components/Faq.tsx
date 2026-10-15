import { useState } from 'react';
import Reveal from '@/components/Reveal';
import type { FaqContent } from '@/components/Sections';

type Item = { q: string; a: string };

export default function Faq({ content }: { content: FaqContent }) {
    const items: Item[] = content.items.map((item) => ({
        q: item.question,
        a: item.answer,
    }));
    const half = Math.ceil(items.length / 2);
    const left = items.slice(0, half);
    const right = items.slice(half);

    if (!items.length) {
        return null;
    }

    return (
        <section id="faq" className="bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="section-title">{content.heading}</h2>
                    </div>
                </Reveal>

                <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                    <FaqColumn items={left} startIndex={0} />
                    <FaqColumn items={right} startIndex={left.length} />
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
                    <Reveal key={idx} delay={i * 50}>
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
                                    <p className="pr-10 pb-5 text-[14px] leading-[1.7] whitespace-pre-line text-white/70">
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
