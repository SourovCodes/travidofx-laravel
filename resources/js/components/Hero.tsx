import { useEffect, useState } from 'react';

type Slide = {
    sub: string;
    firstWord: string;
    titleRest: React.ReactNode;
    body: React.ReactNode;
};

const SLIDES: Slide[] = [
    {
        sub: 'Advanced Trading Solution',
        firstWord: 'Tradivo',
        titleRest: (
            <>
                {' '}
                Magic EA V12
                <br />
                for Gold Trading
            </>
        ),
        body: (
            <>
                Automated <strong>XAUUSD</strong> trading on MT5 with
                <br />
                <strong>HTF trend filtering</strong>,{' '}
                <strong>counter-trend grid execution</strong>, and
                <br />
                <strong>smart basket profit targeting</strong>.
            </>
        ),
    },
    {
        sub: 'Start Automated Trading',
        firstWord: 'Start',
        titleRest: (
            <>
                {' '}
                with Your
                <br />
                Trading Plan
            </>
        ),
        body: (
            <>
                Test <strong>Tradivo Magic EA V12</strong> on MT5.
                <br />
                <strong>Counter-trend grid</strong>,{' '}
                <strong>drawdown protection</strong>, and
                <br />
                <strong>news filter</strong> built in — no emotional trading.
            </>
        ),
    },
    {
        sub: 'Built for Gold Markets',
        firstWord: 'Gold',
        titleRest: <> Automation, One EA</>,
        body: (
            <>
                Optimized for <strong>XAUUSD</strong> on the
                <br />
                <strong>1M timeframe</strong>. Choose Balanced, Aggressive,
                <br />
                or Cent Account mode — disciplined algorithmic execution.
            </>
        ),
    },
];

export default function Hero() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(
            () => setIdx((i) => (i + 1) % SLIDES.length),
            7000,
        );

        return () => clearInterval(t);
    }, []);

    return (
        <section
            id="home"
            className="relative overflow-hidden bg-black text-white"
        >
            <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/img/hero.png)' }}
            />
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(60% 80% at 25% 50%, rgba(0,0,0,0.75), transparent 70%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            <div className="relative flex min-h-[600px] w-full items-center px-6 pt-[calc(var(--header-h)+40px)] pb-20 sm:px-10 lg:min-h-screen lg:px-20 lg:pt-[calc(var(--header-h)+120px)] lg:pb-[160px] xl:px-28">
                <div className="relative w-full max-w-3xl lg:w-3/5">
                    {SLIDES.map((s, i) => (
                        <div
                            key={i}
                            className="slide-fade"
                            data-active={i === idx ? 'true' : 'false'}
                        >
                            <h4 className="px-1 font-display text-[clamp(.78rem,1vw+.4rem,1.15rem)] font-bold tracking-[0.22em] text-shape uppercase">
                                {s.sub}
                            </h4>
                            <h1 className="mt-3 px-2 font-display text-[clamp(1.55rem,3.6vw+0.4rem,3.6rem)] leading-[1.05] font-medium tracking-tight text-white uppercase sm:mt-4">
                                <span className="first-word">
                                    {s.firstWord}
                                </span>
                                {s.titleRest}
                            </h1>
                            <p className="mt-4 max-w-xl px-3 text-[clamp(.85rem,0.9vw+.55rem,1.15rem)] leading-[1.65] text-white/85 sm:mt-6">
                                {s.body}
                            </p>
                        </div>
                    ))}
                </div>

                <nav className="dot-nav" aria-label="Hero slides">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            data-active={i === idx ? 'true' : 'false'}
                            data-label={`0${i + 1}`}
                            onClick={() => setIdx(i)}
                        />
                    ))}
                </nav>
            </div>
        </section>
    );
}
