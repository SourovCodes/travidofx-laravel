import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';

export type Review = {
    id: number | string;
    name: string;
    title: string;
    rating: number;
    body: string;
};

/* -------------------- Content types -------------------- */

export type HeroContent = {
    backgroundImage: string | null;
    boxImage: string | null;
    slides: { subtitle: string; title: string; body: string }[];
};

export type SuccessKeysContent = {
    heading: string;
    items: { image: string | null; title: string; subtitle: string }[];
};

export type DescriptionContent = {
    eyebrow: string;
    body: string;
    featuresHeading: string;
    features: string[];
    disclaimer: string;
    packageImage: string | null;
    iconImage: string | null;
};

export type InvestorAccountContent = {
    enabled: boolean;
    title: string;
    intro: string;
    rows: { icon: string; label: string; value: string }[];
    tagline: string;
};

export type ResultsContent = {
    source: string;
    heading: string;
    title: string;
    body: string;
    image: string | null;
    buttonLabel: string;
    buttonUrl: string;
};

export type WhyChooseContent = {
    emoji: string;
    heading: string;
    items: { icon: string; title: string; subtitle: string }[];
};

export type PricingBannerContent = {
    intro: string;
    heading: string;
    highlight: string;
};

export type InstallationContent = {
    heading: string;
    videoUrl: string;
    stats: { value: string; label: string }[];
};

export type GalleryContent = {
    heading: string;
    subtitle: string;
};

export type FaqContent = {
    heading: string;
    items: { question: string; answer: string }[];
};

export type TestimonialsContent = {
    heading: string;
    subtitle: string;
};

export type ContactContent = {
    heading: string;
    subtitle: string;
    ctaHeading: string;
    ctaBody: string;
};

export type HomepageContent = {
    hero: HeroContent;
    successKeys: SuccessKeysContent;
    description: DescriptionContent;
    investorAccount: InvestorAccountContent;
    results: ResultsContent;
    whyChoose: WhyChooseContent;
    pricingBanner: PricingBannerContent;
    installation: InstallationContent;
    gallery: GalleryContent;
    faq: FaqContent;
    testimonials: TestimonialsContent;
    contact: ContactContent;
};

export type GalleryItem = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    downloadUrl: string | null;
};

export type GalleryGroups = Record<GalleryStatus, GalleryItem[]>;

type GalleryStatus = 'current' | 'upcoming' | 'past';

/* -------------------- Success Keys -------------------- */

export function SuccessKeys({ content }: { content: SuccessKeysContent }) {
    if (!content.items.length) {
        return null;
    }

    return (
        <section className="relative overflow-hidden bg-black py-16 md:py-20">
            <div className="container-x">
                <Reveal>
                    <h3 className="text-center font-display text-[1.7rem] font-medium text-white md:text-[2rem]">
                        {content.heading}
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
                            {content.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="min-w-[180px] shrink-0 basis-[calc((100%-3*24px)/4)]"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    <div className="aspect-[300/199] overflow-hidden rounded border border-white/[0.06] bg-card">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={
                                                    item.title ||
                                                    `Success key ${i + 1}`
                                                }
                                                width={300}
                                                height={199}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : null}
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

export function Description({
    content,
    investorAccount,
}: {
    content: DescriptionContent;
    investorAccount: InvestorAccountContent;
}) {
    const showInvestorAccount =
        investorAccount.enabled && investorAccount.rows.length > 0;

    return (
        <section
            id="description"
            className="relative overflow-hidden bg-black pt-20 pb-20 md:pt-28"
        >
            <div className="container-x grid items-center gap-12 lg:grid-cols-2">
                <Reveal>
                    <h6 className="font-display text-[clamp(1rem,0.7vw+.6rem,1.15rem)] leading-tight font-bold tracking-[0.18em] whitespace-pre-line text-shape uppercase">
                        {content.eyebrow}
                    </h6>

                    <div className="mt-7 space-y-5 text-[15px] leading-[1.75] text-white/85">
                        <div
                            className="space-y-5 [&_li]:before:content-['-_'] [&_strong]:text-white [&_ul]:space-y-1.5"
                            dangerouslySetInnerHTML={{ __html: content.body }}
                        />

                        {content.features.length ? (
                            <div className="pt-3">
                                {content.featuresHeading ? (
                                    <p className="font-bold text-white">
                                        {content.featuresHeading}
                                    </p>
                                ) : null}
                                <ul className="mt-3 space-y-2">
                                    {content.features.map((f) => (
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
                        ) : null}

                        {content.disclaimer ? (
                            <p className="max-w-xl pt-3 text-[13px] leading-relaxed text-white/70">
                                {content.disclaimer}
                            </p>
                        ) : null}
                    </div>
                </Reveal>

                <Reveal delay={120} direction="down">
                    {showInvestorAccount ? (
                        <InvestorAccountCard content={investorAccount} />
                    ) : (
                        <div className="relative flex min-h-[520px] items-center justify-center">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -inset-8 bg-[radial-gradient(closest-side,rgba(174,131,72,0.18),transparent_70%)] blur-2xl"
                            />
                            {content.packageImage ? (
                                <img
                                    src={content.packageImage}
                                    alt="Tradivo Magic EA V12 product box"
                                    width={800}
                                    height={1100}
                                    className="relative h-auto w-full max-w-[420px] rounded-md shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
                                />
                            ) : null}
                            {content.iconImage ? (
                                <img
                                    src={content.iconImage}
                                    alt="Tradivo mark"
                                    width={475}
                                    height={358}
                                    className="absolute right-0 -bottom-6 h-auto w-[38%] max-w-[220px] rounded-md drop-shadow-[0_22px_28px_rgba(0,0,0,0.55)] sm:-right-4 md:-right-6"
                                />
                            ) : null}
                        </div>
                    )}
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- Investor account -------------------- */

function InvestorAccountCard({ content }: { content: InvestorAccountContent }) {
    const words = content.title.split(' ');
    const highlight = words.length > 1 ? words.pop() : null;
    const [taglineLeft, taglineRight] = content.tagline
        .split('|')
        .map((part) => part.trim());

    return (
        <div className="relative">
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(closest-side,rgba(132,214,58,0.16),transparent_70%)] blur-2xl"
            />
            <div className="relative rounded-2xl border border-[#84d63a]/70 bg-[#050a05]/90 p-5 shadow-[0_0_40px_-12px_rgba(132,214,58,0.55)] sm:p-7">
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[#84d63a]">
                        <InvestorIcon name="investor" size={34} />
                    </span>
                    <h3 className="font-display text-[clamp(1.25rem,1.6vw+.6rem,1.9rem)] leading-tight font-extrabold tracking-wide text-white uppercase">
                        {words.join(' ')}{' '}
                        {highlight ? (
                            <span className="text-[#84d63a]">{highlight}</span>
                        ) : null}
                    </h3>
                </div>
                {content.intro ? (
                    <p className="mt-3 text-[14px] leading-relaxed text-white/85">
                        {content.intro}
                    </p>
                ) : null}

                <dl className="mt-5 divide-y divide-[#84d63a]/25 rounded-xl border border-[#84d63a]/50 px-4 sm:px-5">
                    {content.rows.map((row, i) => (
                        <InvestorRow key={i} row={row} />
                    ))}
                </dl>

                {content.tagline ? (
                    <div className="mt-5 flex items-center justify-center gap-3 text-[13px] text-white/85">
                        <span
                            aria-hidden
                            className="hidden h-px flex-1 bg-[#84d63a]/60 sm:block"
                        />
                        <span className="text-[#84d63a]">
                            <InvestorIcon name="shield" size={18} />
                        </span>
                        <span>{taglineLeft}</span>
                        {taglineRight ? (
                            <>
                                <span aria-hidden className="text-white/50">
                                    |
                                </span>
                                <span>{taglineRight}</span>
                            </>
                        ) : null}
                        <span
                            aria-hidden
                            className="hidden h-px flex-1 bg-[#84d63a]/60 sm:block"
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function InvestorRow({ row }: { row: InvestorAccountContent['rows'][number] }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(row.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-4">
            <dt className="flex items-center gap-3 font-display text-[15px] font-semibold text-white sm:w-[45%]">
                <span className="text-[#84d63a]">
                    <InvestorIcon name={row.icon} size={22} />
                </span>
                {row.label}
            </dt>
            <dd className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/[0.04] py-2 pr-2 pl-4">
                <span className="truncate font-display text-[15px] text-white select-all">
                    {row.value}
                </span>
                <button
                    type="button"
                    onClick={copy}
                    aria-label={`Copy ${row.label.replace(/:$/, '')}`}
                    className="inline-flex h-8 shrink-0 items-center justify-center rounded-md px-2 text-[12px] text-[#84d63a] transition-colors hover:bg-[#84d63a]/10"
                >
                    {copied ? 'Copied' : <InvestorIcon name="copy" size={18} />}
                </button>
            </dd>
        </div>
    );
}

function InvestorIcon({ name, size }: { name: string; size: number }) {
    const props = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
    };

    switch (name) {
        case 'server':
            return (
                <svg {...props}>
                    <rect x="3" y="3" width="18" height="7" rx="1.5" />
                    <rect x="3" y="14" width="18" height="7" rx="1.5" />
                    <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" />
                </svg>
            );
        case 'lock':
            return (
                <svg {...props}>
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v3" />
                </svg>
            );
        case 'key':
            return (
                <svg {...props}>
                    <circle cx="8" cy="15" r="4" />
                    <path d="m10.8 12.2 8.7-8.7M16 7l2.5 2.5M18.5 4.5 21 7" />
                </svg>
            );
        case 'globe':
            return (
                <svg {...props}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                </svg>
            );
        case 'copy':
            return (
                <svg {...props}>
                    <rect x="8" y="8" width="12" height="12" rx="2" />
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
            );
        case 'shield':
            return (
                <svg {...props}>
                    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );
        case 'investor':
            return (
                <svg {...props}>
                    <circle cx="9" cy="7" r="3.5" />
                    <path d="M2.5 20a6.5 6.5 0 0 1 11.2-4.5" />
                    <circle cx="17.5" cy="16.5" r="4" />
                    <circle cx="17.5" cy="16.5" r="1.2" />
                    <path d="m20 14 2-2" />
                </svg>
            );
        default:
            return (
                <svg {...props}>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
            );
    }
}

/* -------------------- Results -------------------- */

export function Results({ content }: { content: ResultsContent }) {
    return (
        <section
            id="results"
            className="relative bg-black pt-16 pb-16 md:pt-20 md:pb-24"
        >
            <div className="container-x text-center">
                <Reveal>
                    {content.source ? (
                        <p className="text-[15px] tracking-wide text-white/85">
                            {content.source}
                        </p>
                    ) : null}
                    <h2 className="section-title mt-4">{content.heading}</h2>
                </Reveal>
            </div>

            <div className="container-x mx-auto mt-10 max-w-4xl">
                <Reveal>
                    <div className="text-center">
                        {content.title ? (
                            <h6 className="font-display text-[1.15rem] font-bold tracking-wider text-white uppercase">
                                {content.title}
                            </h6>
                        ) : null}
                        {content.body ? (
                            <p className="mx-auto mt-3 max-w-2xl leading-[1.7] whitespace-pre-line text-white/80">
                                {content.body}
                            </p>
                        ) : null}
                        {content.image ? (
                            <div className="mt-6 overflow-hidden rounded border border-white/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
                                <img
                                    src={content.image}
                                    alt={`${content.title || content.heading} chart`}
                                    width={940}
                                    height={644}
                                    className="h-auto w-full"
                                />
                            </div>
                        ) : null}
                        {content.buttonLabel ? (
                            <div className="mt-6">
                                <a
                                    href={content.buttonUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline-white"
                                >
                                    {content.buttonLabel}
                                </a>
                            </div>
                        ) : null}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- Why Traders Choose -------------------- */

export function WhyChoose({ content }: { content: WhyChooseContent }) {
    return (
        <section className="relative bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="text-center">
                        {content.emoji ? (
                            <div className="text-3xl" aria-hidden>
                                {content.emoji}
                            </div>
                        ) : null}
                        <h1 className="mt-3 font-display text-[clamp(1.6rem,2.2vw+.7rem,2.4rem)] font-medium text-white">
                            {content.heading}
                        </h1>
                    </div>
                </Reveal>

                <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {content.items.map((w, i) => (
                        <Reveal key={i} delay={(i % 3) * 90}>
                            <div className="text-center">
                                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center text-white">
                                    <WhyIcon name={w.icon} />
                                </div>
                                <h3 className="mt-3 font-display text-[1.2rem] font-medium text-white">
                                    {w.title}
                                </h3>
                                <p className="mt-2 text-[14px] leading-relaxed text-white/70">
                                    {w.subtitle}
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

export function PricingBanner({ content }: { content: PricingBannerContent }) {
    return (
        <section className="relative bg-black pt-14 pb-10 text-center">
            <div className="container-x">
                <Reveal>
                    {content.intro ? (
                        <p
                            className="mx-auto max-w-3xl text-[15px] text-white/85"
                            dangerouslySetInnerHTML={{ __html: content.intro }}
                        />
                    ) : null}
                    <h2 className="section-title mt-4">{content.heading}</h2>
                    {content.highlight ? (
                        <p className="mt-3 font-display font-semibold text-white/95">
                            {content.highlight}
                        </p>
                    ) : null}
                </Reveal>
            </div>
        </section>
    );
}

/* -------------------- Installation -------------------- */

export function Installation({ content }: { content: InstallationContent }) {
    return (
        <section className="relative bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="text-center">
                        <h2 className="section-title">{content.heading}</h2>
                    </div>
                </Reveal>

                {content.videoUrl ? (
                    <Reveal delay={120}>
                        <div className="mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-md border border-white/10 bg-black/60">
                            <iframe
                                src={content.videoUrl}
                                title={content.heading}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        </div>
                    </Reveal>
                ) : null}

                {content.stats.length ? (
                    <div
                        className={`mt-14 grid gap-6 ${statsGridClass(content.stats.length)}`}
                    >
                        {content.stats.map((stat, i) => (
                            <StatCol
                                key={i}
                                value={stat.value}
                                label={stat.label}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}

function statsGridClass(count: number): string {
    if (count >= 4) {
        return 'sm:grid-cols-2 lg:grid-cols-4';
    }

    return count === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
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

/* -------------------- Product gallery -------------------- */

const GALLERY_TABS: { key: GalleryStatus; label: string }[] = [
    { key: 'current', label: 'Current' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' },
];

export function ProductGallery({
    content,
    groups,
}: {
    content: GalleryContent;
    groups: GalleryGroups;
}) {
    const tabs = GALLERY_TABS.filter((tab) => groups[tab.key]?.length);
    const [active, setActive] = useState<GalleryStatus | null>(null);

    if (!tabs.length) {
        return null;
    }

    const activeKey =
        active && tabs.some((tab) => tab.key === active) ? active : tabs[0].key;

    return (
        <section id="gallery" className="relative bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="section-title">{content.heading}</h2>
                        {content.subtitle ? (
                            <p className="section-subtitle mx-auto mt-4">
                                {content.subtitle}
                            </p>
                        ) : null}
                    </div>
                </Reveal>

                {tabs.length > 1 ? (
                    <div
                        role="tablist"
                        aria-label="Product gallery"
                        className="mt-10 flex flex-wrap justify-center gap-2"
                    >
                        {tabs.map((tab) => {
                            const isActive = tab.key === activeKey;

                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActive(tab.key)}
                                    className={`rounded-full border px-5 py-2 font-display text-sm font-semibold tracking-wide transition-colors ${
                                        isActive
                                            ? 'border-shape bg-shape text-black'
                                            : 'border-white/15 text-white/75 hover:border-white/40 hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                    <span className="ml-2 opacity-60">
                                        {groups[tab.key].length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                ) : null}

                <div
                    role="tabpanel"
                    className="mt-10 flex flex-wrap justify-center gap-6"
                >
                    {groups[activeKey].map((item, i) => (
                        <Reveal
                            key={item.id}
                            delay={(i % 3) * 90}
                            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]"
                        >
                            <GalleryCard item={item} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GalleryCard({ item }: { item: GalleryItem }) {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-md border border-white/10 bg-black/30">
            <div className="aspect-[4/3] overflow-hidden bg-card">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-contain"
                    />
                ) : null}
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.1rem] font-semibold text-white">
                    {item.title}
                </h3>
                {item.description ? (
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/70">
                        {item.description}
                    </p>
                ) : (
                    <div className="flex-1" />
                )}
                {item.downloadUrl ? (
                    <div className="mt-5">
                        <a
                            href={item.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline-white"
                        >
                            Download
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

/* -------------------- Testimonials -------------------- */

export function Testimonials({
    content,
    reviews,
}: {
    content: TestimonialsContent;
    reviews: Review[];
}) {
    return (
        <section id="reviews" className="relative bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="section-title">{content.heading}</h2>
                        {content.subtitle ? (
                            <p className="section-subtitle mx-auto mt-4">
                                {content.subtitle}
                            </p>
                        ) : null}
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

export function ContactCta({ content }: { content: ContactContent }) {
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
                    <h2 className="section-title">{content.heading}</h2>
                    {content.subtitle ? (
                        <p className="mt-3 text-white/80">{content.subtitle}</p>
                    ) : null}
                </Reveal>
            </div>

            <div className="container-x mt-14 grid items-start gap-10 lg:grid-cols-2">
                <Reveal>
                    {content.ctaHeading ? (
                        <h3 className="font-display text-[clamp(1.6rem,2vw+.5rem,2.2rem)] font-medium text-white">
                            {content.ctaHeading}
                        </h3>
                    ) : null}
                    {content.ctaBody ? (
                        <p className="mt-4 max-w-xl leading-[1.7] whitespace-pre-line text-white/80">
                            {content.ctaBody}
                        </p>
                    ) : null}
                </Reveal>

                <Reveal delay={120}>
                    <ContactForm />
                </Reveal>
            </div>
        </section>
    );
}
