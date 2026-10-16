import { Head } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import LandingIcon from '@/components/LandingIcon';
import { cn } from '@/lib/utils';
import type {
    LandingColor,
    LandingContactItem,
    LandingContent,
} from '@/types/landing';

type Props = {
    content: LandingContent;
};

/** Icon badge and button gradients for each admin-selectable color. */
const COLORS: Record<
    LandingColor,
    { badge: string; button: string; field: string; tint: string }
> = {
    blue: {
        badge: 'from-[#3ba2ff] to-[#1666e5] shadow-[0_8px_24px_-8px_rgba(37,128,255,0.8)]',
        button: 'from-[#2f9bff] to-[#1565e0] shadow-[0_10px_28px_-10px_rgba(37,128,255,0.9)]',
        field: 'border-[#2f9bff]/25 bg-[#0d2347]',
        tint: 'border-[#2f9bff]/20 from-[#0f2a52]/80',
    },
    green: {
        badge: 'from-[#3ee07f] to-[#119c4b] shadow-[0_8px_24px_-8px_rgba(34,197,94,0.8)]',
        button: 'from-[#2fd06f] to-[#13994a] shadow-[0_10px_28px_-10px_rgba(34,197,94,0.9)]',
        field: 'border-[#2fd06f]/25 bg-[#0c2e24]',
        tint: 'border-[#2fd06f]/20 from-[#0c3027]/80',
    },
    purple: {
        badge: 'from-[#a77bff] to-[#6a2fe0] shadow-[0_8px_24px_-8px_rgba(139,92,246,0.8)]',
        button: 'from-[#9b6bff] to-[#6326d9] shadow-[0_10px_28px_-10px_rgba(139,92,246,0.9)]',
        field: 'border-[#9b6bff]/25 bg-[#231a4d]',
        tint: 'border-[#9b6bff]/25 from-[#251c55]/80',
    },
    orange: {
        badge: 'from-[#ffa24d] to-[#f06a10] shadow-[0_8px_24px_-8px_rgba(249,115,22,0.8)]',
        button: 'from-[#ff9a3d] to-[#ee6408] shadow-[0_10px_28px_-10px_rgba(249,115,22,0.9)]',
        field: 'border-[#ff9a3d]/25 bg-[#33200f]',
        tint: 'border-[#ff9a3d]/20 from-[#2e2214]/80',
    },
    teal: {
        badge: 'from-[#3fe0cc] to-[#0b8f84] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.8)]',
        button: 'from-[#30d3bf] to-[#0b8a80] shadow-[0_10px_28px_-10px_rgba(45,212,191,0.9)]',
        field: 'border-[#30d3bf]/25 bg-[#0b2d30]',
        tint: 'border-[#30d3bf]/20 from-[#0b2f33]/80',
    },
    pink: {
        badge: 'from-[#ff7ac0] to-[#d61f74] shadow-[0_8px_24px_-8px_rgba(236,72,153,0.8)]',
        button: 'from-[#ff6fb8] to-[#d11c6f] shadow-[0_10px_28px_-10px_rgba(236,72,153,0.9)]',
        field: 'border-[#ff6fb8]/25 bg-[#331530]',
        tint: 'border-[#ff6fb8]/20 from-[#34162f]/80',
    },
    red: {
        badge: 'from-[#ff7b7b] to-[#d42a2a] shadow-[0_8px_24px_-8px_rgba(239,68,68,0.8)]',
        button: 'from-[#ff6b6b] to-[#cf2424] shadow-[0_10px_28px_-10px_rgba(239,68,68,0.9)]',
        field: 'border-[#ff6b6b]/25 bg-[#331616]',
        tint: 'border-[#ff6b6b]/20 from-[#341818]/80',
    },
    slate: {
        badge: 'from-[#8696ad] to-[#3e4b60] shadow-[0_8px_24px_-8px_rgba(100,116,139,0.8)]',
        button: 'from-[#7d8da5] to-[#3a475b] shadow-[0_10px_28px_-10px_rgba(100,116,139,0.9)]',
        field: 'border-white/15 bg-[#1a2333]',
        tint: 'border-white/10 from-[#18202e]/80',
    },
};

/**
 * Render text where **wrapped** words are highlighted, keeping line breaks.
 */
function Highlighted({
    text,
    highlightClassName = 'text-[#3ee07f]',
}: {
    text: string;
    highlightClassName?: string;
}) {
    return text.split('\n').map((line, lineIndex) => (
        <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split(/\*\*(.+?)\*\*/g).map((part, partIndex) =>
                partIndex % 2 === 1 ? (
                    <span key={partIndex} className={highlightClassName}>
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </Fragment>
    ));
}

function plainText(text: string): string {
    return text.replace(/\*\*(.+?)\*\*/g, '$1');
}

function isExternal(url: string): boolean {
    return /^https?:\/\//i.test(url);
}

export default function Landing({ content }: Props) {
    const { seo, header, hero, contact, about, highlights, footer } = content;

    return (
        <>
            <Head title={seo.title}>
                {seo.description !== '' && (
                    <meta name="description" content={seo.description} />
                )}
            </Head>

            <div className="relative min-h-screen overflow-x-hidden bg-[#050d1f] font-display text-white">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(60%_50%_at_75%_20%,rgba(46,204,113,0.18),transparent_70%),radial-gradient(50%_45%_at_15%_10%,rgba(37,128,255,0.22),transparent_70%)]"
                />

                <LandingHeader header={header} />

                <main className="relative">
                    <Hero hero={hero} />

                    {contact.items.length > 0 && <Contact contact={contact} />}

                    {about.enabled && <About about={about} />}

                    {highlights.length > 0 && <Highlights items={highlights} />}
                </main>

                <LandingFooter footer={footer} />
            </div>
        </>
    );
}

function Logo({ src }: { src: string | null }) {
    if (src) {
        return (
            <img
                src={src}
                alt=""
                className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
            />
        );
    }

    return (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1d5bd8] to-[#0d8f5a] text-white shadow-[0_8px_30px_-10px_rgba(46,204,113,0.8)] ring-1 ring-white/15 md:h-14 md:w-14">
            <LandingIcon name="shield" size={28} />
        </span>
    );
}

function LandingHeader({ header }: { header: LandingContent['header'] }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="relative z-20">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 md:px-6">
                <a href="#top" className="flex min-w-0 items-center gap-3">
                    <Logo src={header.logo} />
                    <span className="min-w-0">
                        <span className="block truncate text-2xl leading-tight font-extrabold tracking-tight md:text-3xl">
                            <Highlighted text={header.brand} />
                        </span>
                        {header.tagline !== '' && (
                            <span className="block truncate text-xs text-white/70 md:text-sm">
                                {header.tagline}
                            </span>
                        )}
                    </span>
                </a>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-label="Open menu"
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/10"
                    >
                        <LandingIcon name="menu" size={24} />
                    </button>

                    {menuOpen && (
                        <nav
                            className="absolute top-14 right-0 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#0b1a36]/95 py-1 shadow-2xl backdrop-blur"
                            onClick={() => setMenuOpen(false)}
                        >
                            <a
                                href="#contact"
                                className="block px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/5"
                            >
                                Get in touch
                            </a>
                            <a
                                href="#about"
                                className="block px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/5"
                            >
                                About
                            </a>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}

function Hero({ hero }: { hero: LandingContent['hero'] }) {
    return (
        <section id="top" className="relative">
            <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pt-2 pb-14 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:pt-8 md:pb-20">
                <div className="relative z-10">
                    {hero.badge !== '' && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#3ee07f]/40 bg-[#3ee07f]/10 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-[#5ff09a] uppercase">
                            <LandingIcon name="bolt" size={14} />
                            {hero.badge}
                        </span>
                    )}

                    <h1 className="mt-4 text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.08] font-extrabold tracking-tight">
                        <Highlighted text={hero.title} />
                    </h1>

                    {hero.body !== '' && (
                        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">
                            {hero.body}
                        </p>
                    )}

                    {hero.features.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                            {hero.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-[#3ee07f]">
                                        <LandingIcon
                                            name={feature.icon}
                                            size={24}
                                        />
                                    </span>
                                    <span className="max-w-[6.5rem] text-xs leading-tight font-semibold text-white/80">
                                        {feature.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <HeroVisual hero={hero} />
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(175deg,transparent_45%,rgba(62,224,127,0.55)_47%,rgba(37,128,255,0.25)_52%,transparent_56%)]"
            />
        </section>
    );
}

function HeroVisual({ hero }: { hero: LandingContent['hero'] }) {
    return (
        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
            {hero.note !== '' && (
                <p className="absolute -top-2 right-0 z-10 -rotate-12 text-right font-script text-lg leading-tight text-white md:text-xl">
                    <Highlighted text={hero.note} />
                    <span className="mt-1 block h-0.5 rounded-full bg-[#3ee07f]" />
                </p>
            )}

            {hero.image ? (
                <img
                    src={hero.image}
                    alt=""
                    className="relative mx-auto max-h-[420px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(37,128,255,0.35)]"
                />
            ) : (
                <ChartShield />
            )}

            {hero.platformLabel !== '' && (
                <span className="absolute right-2 bottom-4 inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#0b1a36]/90 px-3 py-1.5 text-lg font-extrabold shadow-xl backdrop-blur">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3ee07f] shadow-[0_0_12px_#3ee07f]" />
                    {hero.platformLabel}
                </span>
            )}
        </div>
    );
}

/** Fallback hero art: a glowing shield over a candlestick chart. */
function ChartShield() {
    const candles = [
        [18, 70, 58, 'up'],
        [32, 62, 46, 'down'],
        [46, 58, 40, 'up'],
        [60, 48, 34, 'up'],
        [74, 52, 40, 'down'],
        [88, 40, 26, 'up'],
        [102, 32, 18, 'up'],
        [116, 36, 22, 'down'],
        [130, 24, 10, 'up'],
    ] as const;

    return (
        <svg
            viewBox="0 0 160 140"
            className="mx-auto w-full max-w-[340px] drop-shadow-[0_30px_60px_rgba(37,128,255,0.35)]"
            aria-hidden
        >
            <defs>
                <linearGradient id="shield-fill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#1d5bd8" />
                    <stop offset="1" stopColor="#0d8f5a" />
                </linearGradient>
            </defs>
            {candles.map(([x, top, bottom, trend], index) => (
                <g
                    key={index}
                    stroke={trend === 'up' ? '#3ee07f' : '#ff5d6c'}
                    opacity={0.55}
                >
                    <line x1={x} y1={bottom - 6} x2={x} y2={top + 8} />
                    <rect
                        x={x - 3}
                        y={bottom}
                        width={6}
                        height={top - bottom}
                        fill={trend === 'up' ? '#3ee07f' : '#ff5d6c'}
                    />
                </g>
            ))}
            <path
                d="M80 28 112 40v26c0 24-16 38-32 46-16-8-32-22-32-46V40z"
                fill="url(#shield-fill)"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={2}
            />
            <path
                d="M64 86 76 74l8 8 14-16"
                fill="none"
                stroke="#fff"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M92 62h7v7"
                fill="none"
                stroke="#fff"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function Contact({ contact }: { contact: LandingContent['contact'] }) {
    return (
        <section id="contact" className="relative px-4 pt-10 md:px-6">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <h2 className="inline-flex items-center gap-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#3ba2ff] to-[#1666e5] shadow-[0_8px_24px_-8px_rgba(37,128,255,0.8)]">
                            <LandingIcon name="messenger" size={24} />
                        </span>
                        <Highlighted text={contact.heading} />
                    </h2>
                    {contact.subtitle !== '' && (
                        <p className="mt-2 text-[15px] text-white/75">
                            {contact.subtitle}
                        </p>
                    )}
                </div>

                <ul className="mt-6 space-y-3">
                    {contact.items.map((item, index) => (
                        <ContactRow key={index} item={item} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

function ContactRow({ item }: { item: LandingContactItem }) {
    const color = COLORS[item.color] ?? COLORS.blue;
    const external = item.url !== null && isExternal(item.url);

    return (
        <li
            className={cn(
                'flex flex-col gap-3 rounded-2xl border bg-gradient-to-r to-[#0a1630]/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:flex-row sm:items-center',
                color.tint,
            )}
        >
            <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <span
                    className={cn(
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white',
                        color.badge,
                    )}
                >
                    <LandingIcon name={item.icon} size={28} />
                </span>
                <span className="min-w-0">
                    <span className="block text-[17px] leading-snug font-bold">
                        {item.title}
                    </span>
                    {item.subtitle !== '' && (
                        <span className="block text-sm text-white/65">
                            {item.subtitle}
                        </span>
                    )}
                </span>
            </div>

            <div className="flex items-center gap-2 sm:w-[17rem] sm:shrink-0">
                {item.url ? (
                    <a
                        href={item.url}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className={cn(
                            'flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r px-4 text-[15px] font-bold text-white transition hover:brightness-110',
                            color.button,
                        )}
                    >
                        <LandingIcon name={item.icon} size={18} />
                        <span className="truncate">{item.buttonLabel}</span>
                        <LandingIcon
                            name="chevron"
                            size={16}
                            className="shrink-0 opacity-80"
                        />
                    </a>
                ) : (
                    <span
                        className={cn(
                            'flex min-h-12 min-w-0 flex-1 items-center rounded-full border px-5 text-[15px] font-semibold text-white/90',
                            color.field,
                        )}
                    >
                        <span className="truncate">{item.buttonLabel}</span>
                    </span>
                )}

                {item.copyValue && <CopyButton value={item.copyValue} />}
            </div>
        </li>
    );
}

function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            return;
        }

        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? 'Copied' : `Copy ${value}`}
            title={copied ? 'Copied' : 'Copy'}
            className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition',
                copied
                    ? 'border-[#3ee07f]/50 bg-[#3ee07f]/15 text-[#5ff09a]'
                    : 'border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/10 hover:text-white',
            )}
        >
            <LandingIcon name={copied ? 'check' : 'copy'} size={20} />
        </button>
    );
}

function About({ about }: { about: LandingContent['about'] }) {
    return (
        <section id="about" className="px-4 pt-12 md:px-6">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#eafbf3] via-[#f4fbff] to-[#dff3ff] p-6 text-[#0b1a36] shadow-[0_30px_80px_-40px_rgba(62,224,127,0.6)] md:p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.1fr_1fr_0.7fr]">
                    <div>
                        {about.badge !== '' && (
                            <span className="inline-block rounded-full bg-[#15a34a] px-3 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase">
                                {about.badge}
                            </span>
                        )}
                        <h2 className="mt-3 text-2xl leading-tight font-extrabold md:text-3xl">
                            <Highlighted
                                text={about.title}
                                highlightClassName="text-[#14a34a]"
                            />
                        </h2>
                        {about.body !== '' && (
                            <p className="mt-3 text-[15px] leading-relaxed text-[#24324d]">
                                {about.body}
                            </p>
                        )}
                        {about.tagline !== '' && (
                            <p className="mt-5 -rotate-3 font-script text-2xl leading-snug text-[#14a34a]">
                                <Highlighted text={about.tagline} />
                            </p>
                        )}
                    </div>

                    {about.features.length > 0 && (
                        <ul className="space-y-4">
                            {about.features.map((feature, index) => {
                                const color =
                                    COLORS[feature.color] ?? COLORS.blue;

                                return (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <span
                                            className={cn(
                                                'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white',
                                                color.badge,
                                            )}
                                        >
                                            <LandingIcon
                                                name={feature.icon}
                                                size={22}
                                            />
                                        </span>
                                        <span>
                                            <span className="block text-[15px] font-extrabold">
                                                {feature.title}
                                            </span>
                                            {feature.subtitle !== '' && (
                                                <span className="block text-sm text-[#3a4865]">
                                                    {feature.subtitle}
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {about.image && (
                        <img
                            src={about.image}
                            alt=""
                            className="mx-auto max-h-72 w-auto self-center object-contain md:col-span-2 lg:col-span-1"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

function Highlights({ items }: { items: LandingContent['highlights'] }) {
    return (
        <section className="px-4 pt-6 md:px-6">
            <ul className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-3 px-5 py-4"
                    >
                        <span className="text-[#3ba2ff]">
                            <LandingIcon name={item.icon} size={30} />
                        </span>
                        <span>
                            <span className="block text-sm font-bold">
                                {item.title}
                            </span>
                            {item.subtitle !== '' && (
                                <span className="block text-xs text-white/65">
                                    {item.subtitle}
                                </span>
                            )}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function LandingFooter({ footer }: { footer: LandingContent['footer'] }) {
    return (
        <footer className="relative px-4 pt-10 pb-12 text-center md:px-6">
            {footer.tagline !== '' && (
                <p className="font-script text-xl text-white">
                    {plainText(footer.tagline)}
                </p>
            )}

            {footer.socialLinks.length > 0 && (
                <ul className="mt-4 flex items-center justify-center gap-3">
                    {footer.socialLinks.map((link, index) => (
                        <li key={`${link.platform}-${index}`}>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                            >
                                <LandingIcon
                                    name={
                                        link.platform === 'website'
                                            ? 'globe'
                                            : link.platform
                                    }
                                    size={18}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </footer>
    );
}
