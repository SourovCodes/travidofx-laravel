import { Link } from '@inertiajs/react';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';

export type Review = {
    id: number | string;
    name: string;
    title: string;
    rating: number;
    body: string;
};

/* -------------------- Success Keys -------------------- */

const KEYS_IMGS = [
    {
        src: '/img/rslide-1.png',
        title: 'High Profit',
        subtitle: 'Up to 50% Profit Monthly.',
    },
    {
        src: '/img/rslide-2.png',
        title: 'Low Risk',
        subtitle: '<10% (6% Current DD)',
    },
    {
        src: '/img/rslide-3.png',
        title: 'Stability',
        subtitle: 'The 5th Month LIVE',
    },
    {
        src: '/img/rslide-4.png',
        title: 'Money Management',
        subtitle: 'Daily Target and DD Controller',
    },
];

export function SuccessKeys() {
    return (
        <section className="relative overflow-hidden bg-black py-16 md:py-20">
            <div className="container-x">
                <Reveal>
                    <h3 className="text-center font-display text-[1.7rem] font-medium text-white md:text-[2rem]">
                        Success Keys
                    </h3>
                </Reveal>
            </div>

            <div className="container-x">
                <Reveal>
                    <div className="no-scrollbar -mx-2 mt-10 overflow-x-auto">
                        <div
                            className="flex px-2"
                            style={{ scrollSnapType: 'x mandatory', gap: 24 }}
                        >
                            {KEYS_IMGS.map((item, i) => (
                                <div
                                    key={item.src}
                                    className="min-w-[180px] shrink-0 basis-[calc((100%-3*24px)/4)]"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    <div className="aspect-[300/199] overflow-hidden rounded border border-white/[0.06] bg-card">
                                        <img
                                            src={item.src}
                                            alt={
                                                item.title ??
                                                `Success key ${i + 1}`
                                            }
                                            width={300}
                                            height={199}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    {item.title ? (
                                        <div className="mt-4 text-center">
                                            <h4 className="font-display text-lg font-semibold text-white">
                                                {item.title}
                                            </h4>
                                            <p className="mt-1 text-sm leading-5 text-white/70">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- Description -------------------- */

export function Description() {
    return (
        <section
            id="description"
            className="relative overflow-hidden bg-black pt-20 pb-20 md:pt-28"
        >
            <div className="container-x grid items-center gap-12 lg:grid-cols-2">
                <Reveal>
                    <h6 className="font-display text-[clamp(1rem,0.7vw+.6rem,1.15rem)] leading-tight font-bold tracking-[0.18em] text-shape uppercase">
                        Tradivo Magic EA V12
                        <br />
                        Advanced Gold &amp; BTC Expert Advisor MT5
                    </h6>

                    <div className="mt-7 space-y-5 text-[15px] leading-[1.75] text-white/85">
                        <p>
                            A powerful multi-asset Expert Advisor built for
                            XAUUSD &amp; BTCUSD traders who want intelligent
                            automation, controlled recovery logic, and stable
                            basket management.
                        </p>
                        <p>
                            Tradivo Magic EA V12 combines HTF trend filtering,
                            counter-trend grid execution, recovery protection,
                            and smart basket profit targeting into one complete
                            automated trading system.
                        </p>
                        <p className="pt-1 font-bold text-white">
                            Included Trading Modes:
                        </p>
                        <ul className="space-y-1.5">
                            <li>
                                -{' '}
                                <strong className="text-white">
                                    Balanced Mode
                                </strong>{' '}
                                — stable growth with controlled recovery and
                                moderate drawdown.
                            </li>
                            <li>
                                -{' '}
                                <strong className="text-white">
                                    Aggressive Mode
                                </strong>{' '}
                                — faster basket cycles with higher profit
                                potential and increased risk.
                            </li>
                            <li>
                                -{' '}
                                <strong className="text-white">
                                    Cent Account Mode
                                </strong>{' '}
                                — optimized settings for small balances and USC
                                accounts.
                            </li>
                        </ul>

                        <div className="pt-3">
                            <p className="font-bold text-white">
                                What&apos;s included with Tradivo Magic EA V12:
                            </p>
                            <ul className="mt-3 space-y-2">
                                {[
                                    'Full MT5 Expert Advisor package',
                                    'Gold (XAUUSD) + BTCUSD support',
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
                                ].map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-start gap-2.5"
                                    >
                                        <span className="mt-0.5 text-[#3ad072]">
                                            ✅
                                        </span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="max-w-xl pt-3 text-[13px] leading-relaxed text-white/70">
                            ⚠️ Trading involves risk. Past performance does not
                            guarantee future results. Market conditions, broker
                            execution, spread, volatility, and risk settings can
                            affect overall performance.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={120} direction="down">
                    <div className="relative flex min-h-[520px] items-center justify-center">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -inset-8 bg-[radial-gradient(closest-side,rgba(174,131,72,0.18),transparent_70%)] blur-2xl"
                        />
                        <img
                            src="/img/tradivo-package.jpeg"
                            alt="Tradivo Magic EA V12 product box"
                            width={800}
                            height={1100}
                            className="relative h-auto w-full max-w-[420px] rounded-md shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
                        />
                        <img
                            src="/img/tradivo-icon.jpeg"
                            alt="Tradivo mark"
                            width={475}
                            height={358}
                            className="absolute right-0 -bottom-6 h-auto w-[38%] max-w-[220px] rounded-md drop-shadow-[0_22px_28px_rgba(0,0,0,0.55)] sm:-right-4 md:-right-6"
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- Results header + cards -------------------- */

export type ResultLinks = {
    balanced: string;
    aggressive: string;
};

const DEFAULT_RESULT_LINKS: ResultLinks = {
    balanced: 'https://www.myfxbook.com/members/Tradivorobot/tradivorobot/12044419',
    aggressive:
        'https://www.myfxbook.com/members/Tradivorobot/tradivo-magic-ea/12044405',
};

export function ResultsHeader({
    source = 'Myfxbook V3.9',
}: {
    source?: string;
}) {
    return (
        <section
            id="results"
            className="relative bg-black pt-16 pb-10 md:pt-20"
        >
            <div className="container-x text-center">
                <Reveal>
                    <p className="text-[15px] tracking-wide text-white/85">
                        Verified Performance Statistics By {source}
                    </p>
                    <h2 className="section-title mt-4">
                        Unlock the Full Power of Automated Trading with Tradivo
                    </h2>
                </Reveal>
            </div>
        </section>
    );
}

export function Results({
    links = DEFAULT_RESULT_LINKS,
}: {
    links?: ResultLinks;
}) {
    return (
        <section className="relative bg-black pb-16 md:pb-24">
            <div className="container-x grid gap-10 lg:grid-cols-2">
                <ResultCard
                    title="Tradivo Magic EA V12 — Balanced Mode"
                    body="Designed for consistent monthly growth potential with strict risk control and intelligent trade management."
                    img="/img/v12-balance.png"
                    href={links.balanced}
                />
                <ResultCard
                    title="Tradivo Magic EA V12 — Aggressive Mode"
                    body="Designed for high-profit performance — stronger lot scaling, up to 50% monthly returns with faster basket cycles."
                    img="/img/v10-agreesive.png"
                    href={links.aggressive}
                />
            </div>
        </section>
    );
}

function ResultCard({
    title,
    body,
    img,
    href,
}: {
    title: string;
    body: string;
    img: string;
    href: string;
}) {
    return (
        <Reveal>
            <div className="text-center">
                <h6 className="font-display text-[1.15rem] font-bold tracking-wider text-white uppercase">
                    {title}
                </h6>
                <p className="mx-auto mt-3 max-w-md leading-[1.7] text-white/80">
                    {body}
                </p>
                <div className="mt-6 overflow-hidden rounded border border-white/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
                    <img
                        src={img}
                        alt={`${title} chart`}
                        width={940}
                        height={644}
                        className="h-auto w-full"
                    />
                </div>
                <div className="mt-6">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-white"
                    >
                        Check Results --&gt;
                    </a>
                </div>
            </div>
        </Reveal>
    );
}

/* -------------------- Why Traders Choose -------------------- */

const WHY = [
    {
        icon: 'check',
        title: 'Verified Logic',
        sub: 'Tested strategy with consistent execution',
    },
    {
        icon: 'preset',
        title: 'Smart Grid System',
        sub: 'Counter-trend entries for better pricing',
    },
    {
        icon: 'moon',
        title: 'Recovery Engine',
        sub: 'Smart basket recovery after drawdown',
    },
    {
        icon: 'shield',
        title: 'Drawdown Protection',
        sub: 'Hard DD limit for account safety',
    },
    {
        icon: 'infinity',
        title: 'News Filter',
        sub: 'Avoids high-impact volatility',
    },
    {
        icon: 'monitor',
        title: 'MT5 Platform',
        sub: 'Works on MT5 with dual asset support',
    },
];

export function WhyChoose() {
    return (
        <section className="relative bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="text-center">
                        <div className="text-3xl" aria-hidden>
                            🧠
                        </div>
                        <h1 className="mt-3 font-display text-[clamp(1.6rem,2.2vw+.7rem,2.4rem)] font-medium text-white">
                            Why Traders Choose Tradivo Magic EA V12
                        </h1>
                    </div>
                </Reveal>

                <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {WHY.map((w, i) => (
                        <Reveal key={w.title} delay={(i % 3) * 90}>
                            <div className="text-center">
                                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center text-white">
                                    <WhyIcon name={w.icon} />
                                </div>
                                <h3 className="mt-3 font-display text-[1.2rem] font-medium text-white">
                                    {w.title}
                                </h3>
                                <p className="mt-2 text-[14px] leading-relaxed text-white/70">
                                    {w.sub}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhyIcon({ name }: { name: string }) {
    const baseProps = {
        width: 38,
        height: 38,
        viewBox: '0 0 512 512',
        fill: 'currentColor',
        xmlns: 'http://www.w3.org/2000/svg',
    };

    switch (name) {
        case 'check':
            return (
                <svg {...baseProps}>
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                </svg>
            );
        case 'preset':
            return (
                <svg {...baseProps}>
                    <path d="M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-96 464H48V256h320v208zm96-96h-48V144c0-26.5-21.5-48-48-48H144V48h320v320z" />
                </svg>
            );
        case 'moon':
            return (
                <svg {...baseProps}>
                    <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
                </svg>
            );
        case 'monitor':
            return (
                <svg {...baseProps} viewBox="0 0 576 512">
                    <path d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" />
                </svg>
            );
        case 'infinity':
            return (
                <svg {...baseProps} viewBox="0 0 640 512">
                    <path d="M471.1 96C405 96 353.3 137.3 320 174.6 286.7 137.3 235 96 168.9 96 75.8 96 0 167.8 0 256s75.8 160 168.9 160c66.1 0 117.8-41.3 151.1-78.6 33.3 37.3 85 78.6 151.1 78.6 93.1 0 168.9-71.8 168.9-160S564.2 96 471.1 96zM168.9 320c-40.2 0-72.9-28.7-72.9-64s32.7-64 72.9-64c38.2 0 73.4 36.1 94 64-20.4 27.6-55.9 64-94 64zm302.2 0c-38.2 0-73.4-36.1-94-64 20.4-27.6 55.9-64 94-64 40.2 0 72.9 28.7 72.9 64s-32.7 64-72.9 64z" />
                </svg>
            );
        case 'shield':
            return (
                <svg {...baseProps}>
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                </svg>
            );
        default:
            return null;
    }
}

/* -------------------- Pricing intro banner -------------------- */

export function PricingBanner() {
    return (
        <section className="relative bg-black pt-14 pb-10 text-center">
            <div className="container-x">
                <Reveal>
                    <p className="mx-auto max-w-3xl text-[15px] text-white/85">
                        Receive your <strong>download links</strong>,{' '}
                        <strong>activation email</strong>, and{' '}
                        <strong>step-by-step setup video</strong> immediately
                        after purchase.
                    </p>
                    <h2 className="section-title mt-4">
                        Get Instant Access to Tradivo Magic EA V12
                    </h2>
                    <p className="mt-3 font-display font-semibold text-white/95">
                        🔥 Launch Discount Active – Ends Soon
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- Installation -------------------- */

const STEPS = [
    {
        title: '1. Choose Your Plan',
        body: 'Select Basic, Advanced, Pro or Business. After checkout, you receive the EA instantly via email.',
    },
    {
        title: '2. Download the EA Package',
        body: 'Get Tradivo Magic EA V12.0 (MT5), setup video, license activation guide and the Set file.',
    },
    {
        title: '3. Install & Activate the EA',
        body: 'MT5 → File → Open Data Folder → MQL5/Experts. Refresh, drag onto XAUUSD and enter your license key.',
    },
    {
        title: '4. Select Your Trading Mode',
        body: 'Choose the Symbol and mode, then load the .set file. EA Settings → Load → select the .set file → OK.',
    },
    {
        title: '5. Start Automated Trading',
        body: "Enable Algo Trading and allow DLL imports. The blue icon confirms it's running.",
    },
    {
        title: '6. Monitor & Get Support',
        body: 'Receive lifetime updates, support via email/Telegram and access to new set files, tutorials and risk management help.',
    },
];

export function Installation() {
    return (
        <section className="relative bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="text-center">
                        <h2 className="section-title">
                            Tradivo Magic EA Installation Guide
                        </h2>
                    </div>
                </Reveal>

                <Reveal delay={120}>
                    <div className="mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-md border border-white/10 bg-black/60">
                        <iframe
                            src="https://www.youtube.com/embed/vg8RFEG9mTk"
                            title="Tradivo Magic EA installation guide"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                        />
                    </div>
                </Reveal>

                <div className="mt-14 grid gap-6 sm:grid-cols-3">
                    <StatCol value="50%" label="Up to 50% Monthly Returns" />
                    <StatCol value="24/7" label="VPS-Friendly Automation" />
                    <StatCol value="V12" label="Tradivo Magic EA V12" />
                </div>

                <Reveal delay={120}>
                    <div className="mt-16 text-center">
                        <h2 className="section-title">
                            Steps of Purchase to Profit
                        </h2>
                        <h3 className="mt-2 font-display text-[1.4rem] font-medium text-white md:text-[1.7rem]">
                            How to Start with Tradivo Magic EA V12
                        </h3>
                        <p className="section-subtitle mx-auto mt-4">
                            Follow these simple steps to install, activate, and
                            start trading automatically with Tradivo Magic EA
                            V12.0 on MT5.
                        </p>
                    </div>
                </Reveal>

                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {STEPS.map((s, i) => (
                        <Reveal key={s.title} delay={(i % 3) * 90}>
                            <div className="h-full rounded-md border border-white/10 bg-black/30 p-6">
                                <h4 className="font-display text-[1.05rem] font-semibold text-white">
                                    {s.title}
                                </h4>
                                <p className="mt-3 text-[14px] leading-relaxed text-white/75">
                                    {s.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatCol({ value, label }: { value: string; label: string }) {
    return (
        <Reveal>
            <div className="text-center">
                <div className="font-display text-[clamp(2.4rem,4vw+.5rem,3.4rem)] leading-none font-extrabold text-shape">
                    {value}
                </div>
                <p className="mt-3 text-[15px] text-white/80">{label}</p>
            </div>
        </Reveal>
    );
}

/* -------------------- FxBlue header -------------------- */

export function FxBlueHeader() {
    return (
        <section className="relative bg-black pt-14 pb-10">
            <div className="container-x text-center">
                <Reveal>
                    <h2 className="section-title">
                        Experience Real-Time, Verified Trading Success!
                    </h2>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- FxBlue widget gallery -------------------- */

const RESULT_GALLERY = [
    '/img/rslide-2.png',
    '/img/rslide-3.png',
    '/img/rslide-4.png',
    '/img/rslide-5.png',
];

export function FxBlueWidget() {
    return (
        <section className="relative bg-black pt-12 pb-16">
            <div className="container-x">
                <Reveal>
                    <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
                        <img
                            src="/img/rslide-1.png"
                            alt="FXBlue live account performance widget"
                            width={1280}
                            height={850}
                            className="h-auto w-full"
                        />
                    </div>
                </Reveal>

                <Reveal delay={120}>
                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {RESULT_GALLERY.map((src, i) => (
                            <div
                                key={src}
                                className="overflow-hidden rounded-md border border-white/10 bg-white/[0.03]"
                            >
                                <img
                                    src={src}
                                    alt={`Verified trading result ${i + 1}`}
                                    width={1280}
                                    height={850}
                                    className="h-auto w-full"
                                />
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- Testimonials -------------------- */

export function Testimonials({ reviews }: { reviews: Review[] }) {
    return (
        <section id="reviews" className="relative bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="section-title">
                            What Our Clients Say About Us?
                        </h2>
                        <p className="section-subtitle mx-auto mt-4">
                            Testimonials and success stories from traders
                            running Tradivo Magic EA V12 on live and cent
                            accounts.
                        </p>
                        <div className="mt-7 flex justify-center">
                            <Link href="/reviews" className="btn-outline-white">
                                Write a Review --&gt;
                            </Link>
                        </div>
                    </div>
                </Reveal>

                {reviews.length ? (
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((t, i) => (
                            <Reveal key={t.id} delay={(i % 3) * 90}>
                                <TestimonialCard
                                    name={
                                        t.title
                                            ? `${t.name}, ${t.title}`
                                            : t.name
                                    }
                                    body={t.body}
                                    rating={t.rating}
                                />
                            </Reveal>
                        ))}
                    </div>
                ) : (
                    <Reveal>
                        <div className="mt-12 rounded-md border border-white/10 bg-white/[0.03] px-6 py-8 text-center text-white/70">
                            No client reviews published yet.
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}

function TestimonialCard({
    name,
    body,
    rating = 5,
}: {
    name: string;
    body: string;
    rating?: number;
}) {
    return (
        <div className="flex h-full flex-col rounded-md border border-white/10 bg-black/30 p-6">
            <div
                className="mb-3 flex gap-0.5 text-shape"
                aria-label={`${rating} stars`}
            >
                {Array.from({ length: rating }).map((_, j) => (
                    <svg
                        key={j}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                ))}
            </div>
            <p className="flex-1 text-[14px] leading-[1.7] text-white/85">
                &ldquo;{body}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
                <div
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-shape/40 bg-shape/20 font-display font-semibold text-shape"
                >
                    {name.slice(0, 1).toUpperCase()}
                </div>
                <div className="font-display text-sm font-semibold text-white">
                    {name}
                </div>
            </div>
        </div>
    );
}

/* -------------------- Contact CTA -------------------- */

export function ContactCta() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-black py-20 md:py-24"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-[480px] w-[480px] rounded-full bg-shape/20 blur-3xl"
            />
            <div className="container-x mx-auto max-w-3xl text-center">
                <Reveal>
                    <h2 className="section-title">
                        We&apos;re Here to Support Your Trading Success
                    </h2>
                    <p className="mt-3 text-white/80">
                        Our Forex Trading Bot&apos;s dedicated support team will
                        reach you very soon
                    </p>
                </Reveal>
            </div>

            <div className="container-x mt-14 grid items-start gap-10 lg:grid-cols-2">
                <Reveal>
                    <h3 className="font-display text-[clamp(1.6rem,2vw+.5rem,2.2rem)] font-medium text-white">
                        Ready to Automate Your Gold &amp; BTC Trading?
                    </h3>
                    <p className="mt-4 max-w-xl leading-[1.7] text-white/80">
                        Discover what Tradivo Magic EA V12 can do for your
                        trading. Our team is ready to help you set up,
                        fine-tune, and get the most out of every basket cycle.
                    </p>
                </Reveal>

                <Reveal delay={120}>
                    <ContactForm />
                </Reveal>
            </div>
        </section>
    );
}
