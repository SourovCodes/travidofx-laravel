import { Fragment, useEffect, useState } from 'react';
import type { HeroContent } from '@/components/Sections';

const FALLBACK_BACKGROUND =
    'radial-gradient(80% 90% at 70% 50%, rgba(174,131,72,0.18), transparent 70%), #000';

export default function Hero({ content }: { content: HeroContent }) {
    const slides = content.slides;
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (slides.length < 2) {
            return;
        }

        const t = setInterval(
            () => setIdx((i) => (i + 1) % slides.length),
            7000,
        );

        return () => clearInterval(t);
    }, [slides.length]);

    return (
        <section
            id="home"
            className="relative overflow-hidden bg-black text-white"
        >
            {/* Layer 1: background */}
            <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    background: content.backgroundImage
                        ? `url(${content.backgroundImage}) center / cover no-repeat`
                        : FALLBACK_BACKGROUND,
                }}
            />
            {/* Layer 2: readability overlay */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(60% 80% at 25% 50%, rgba(0,0,0,0.75), transparent 70%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)',
                }}
            />
            {/* Layer 3: product box */}
            {content.boxImage ? (
                <img
                    src={content.boxImage}
                    alt=""
                    aria-hidden
                    className="hero-box pointer-events-none absolute top-1/2 right-[6%] hidden h-auto w-[30%] max-w-[460px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] md:block lg:top-[calc(50%+var(--header-h)/2)]"
                />
            ) : null}

            {/* Layer 4: copy */}
            <div className="relative flex min-h-[600px] w-full items-center px-6 pt-[calc(var(--header-h)+40px)] pb-20 sm:px-10 lg:min-h-screen lg:px-20 lg:pt-[calc(var(--header-h)+120px)] lg:pb-[160px] xl:px-28">
                <div
                    className={`relative w-full max-w-3xl ${content.boxImage ? 'md:w-3/5 lg:w-1/2' : 'lg:w-3/5'}`}
                >
                    {slides.map((s, i) => {
                        const [, firstWord = '', rest = ''] =
                            s.title.match(/^(\S*)([\s\S]*)$/) ?? [];

                        return (
                            <div
                                key={i}
                                className="slide-fade"
                                data-active={i === idx ? 'true' : 'false'}
                            >
                                <h4 className="px-1 font-display text-[clamp(.78rem,1vw+.4rem,1.15rem)] font-bold tracking-[0.22em] text-shape uppercase">
                                    {s.subtitle}
                                </h4>
                                <h1 className="mt-3 px-2 font-display text-[clamp(1.55rem,3.6vw+0.4rem,3.6rem)] leading-[1.05] font-medium tracking-tight text-white uppercase sm:mt-4">
                                    <span className="first-word">
                                        {firstWord}
                                    </span>
                                    <MultilineText text={rest} />
                                </h1>
                                <p
                                    className="mt-4 max-w-xl px-3 text-[clamp(.85rem,0.9vw+.55rem,1.15rem)] leading-[1.65] text-white/85 sm:mt-6"
                                    dangerouslySetInnerHTML={{ __html: s.body }}
                                />
                            </div>
                        );
                    })}
                </div>

                {slides.length > 1 ? (
                    <nav className="dot-nav" aria-label="Hero slides">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to slide ${i + 1}`}
                                data-active={i === idx ? 'true' : 'false'}
                                data-label={String(i + 1).padStart(2, '0')}
                                onClick={() => setIdx(i)}
                            />
                        ))}
                    </nav>
                ) : null}
            </div>
        </section>
    );
}

function MultilineText({ text }: { text: string }) {
    return (
        <>
            {text.split('\n').map((line, i) => (
                <Fragment key={i}>
                    {i > 0 ? <br /> : null}
                    {line}
                </Fragment>
            ))}
        </>
    );
}
