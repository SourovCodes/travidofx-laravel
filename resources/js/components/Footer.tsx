import { Link, usePage } from '@inertiajs/react';
import {
    TelegramIcon,
    WhatsAppIcon,
} from '@/components/FloatingContactButtons';

const PAYMENTS = [
    { src: '/img/pay-1.png', alt: 'Payment 1' },
    { src: '/img/pay-2.png', alt: 'Payment 2' },
    { src: '/img/pay-3.png', alt: 'Payment 3' },
    { src: '/img/pay-4.png', alt: 'Payment 4' },
];

export const SOCIAL_ICON_PATHS: Record<string, string> = {
    facebook:
        'M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.9h-2.34v6.98A10 10 0 0 0 22 12z',
    instagram:
        'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.14 0-3.51.01-4.75.07-.95.04-1.47.2-1.82.34a2.94 2.94 0 0 0-1.08.7c-.33.33-.54.65-.7 1.08-.13.35-.3.87-.34 1.82-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.95.2 1.47.34 1.82.16.43.37.75.7 1.08.33.33.65.54 1.08.7.35.13.87.3 1.82.34 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.95-.04 1.47-.2 1.82-.34.43-.16.75-.37 1.08-.7.33-.33.54-.65.7-1.08.13-.35.3-.87.34-1.82.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.95-.2-1.47-.34-1.82a2.94 2.94 0 0 0-.7-1.08 2.94 2.94 0 0 0-1.08-.7c-.35-.13-.87-.3-1.82-.34-1.24-.06-1.61-.07-4.75-.07zm0 3.05a4.99 4.99 0 1 1 0 9.98 4.99 4.99 0 0 1 0-9.98zm0 8.23a3.24 3.24 0 1 0 0-6.48 3.24 3.24 0 0 0 0 6.48zm6.36-8.43a1.17 1.17 0 1 1-2.33 0 1.17 1.17 0 0 1 2.33 0z',
    tiktok: 'M16.6 5.82A4.27 4.27 0 0 1 15.54 3H12.4v12.32a2.45 2.45 0 0 1-2.45 2.45 2.45 2.45 0 0 1-2.45-2.45 2.45 2.45 0 0 1 2.45-2.45c.27 0 .53.05.77.13v-3.2a5.62 5.62 0 0 0-.77-.06A5.65 5.65 0 0 0 4.3 15.4a5.65 5.65 0 0 0 5.65 5.65 5.65 5.65 0 0 0 5.65-5.65V9.3a7.39 7.39 0 0 0 4.32 1.4V7.5a4.31 4.31 0 0 1-3.32-1.68z',
    youtube:
        'M23.5 6.5a3 3 0 0 0-2.1-2.13C19.56 4 12 4 12 4s-7.56 0-9.4.37A3 3 0 0 0 .5 6.5C.13 8.34.13 12 .13 12s0 3.66.37 5.5a3 3 0 0 0 2.1 2.13C4.44 20 12 20 12 20s7.56 0 9.4-.37a3 3 0 0 0 2.1-2.13c.37-1.84.37-5.5.37-5.5s0-3.66-.37-5.5zM9.75 15.5v-7l6.5 3.5-6.5 3.5z',
    x: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z',
    linkedin:
        'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
    discord:
        'M20.32 4.37A19.8 19.8 0 0 0 15.4 2.85a13.7 13.7 0 0 0-.63 1.29 18.4 18.4 0 0 0-5.53 0 13 13 0 0 0-.64-1.29 19.7 19.7 0 0 0-4.93 1.52C.53 9.05-.32 13.6.1 18.1a19.9 19.9 0 0 0 6.04 3.05c.49-.66.92-1.36 1.3-2.1a12.9 12.9 0 0 1-2.05-.98c.17-.13.34-.26.5-.39a14.2 14.2 0 0 0 12.2 0c.16.14.33.27.5.39-.65.39-1.34.72-2.05.98.38.74.81 1.44 1.3 2.1a19.8 19.8 0 0 0 6.04-3.05c.5-5.22-.84-9.73-3.56-13.73zM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42z',
    website:
        'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14a8.2 8.2 0 0 1 0-4h3.38a16.5 16.5 0 0 0 0 4H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.07 16zm2.95-8H5.07a7.99 7.99 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.02 8zM12 19.96A14.1 14.1 0 0 1 10.09 16h3.82A14.1 14.1 0 0 1 12 19.96zM14.34 14H9.66a14.7 14.7 0 0 1 0-4h4.68a14.7 14.7 0 0 1 0 4zm.26 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14a16.5 16.5 0 0 0 0-4h3.38a8.2 8.2 0 0 1 0 4h-3.38z',
};

function SocialIcon({ platform }: { platform: string }) {
    if (platform === 'whatsapp') {
        return <WhatsAppIcon />;
    }

    if (platform === 'telegram') {
        return <TelegramIcon />;
    }

    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
        >
            <path
                d={SOCIAL_ICON_PATHS[platform] ?? SOCIAL_ICON_PATHS.website}
            />
        </svg>
    );
}

export default function Footer() {
    const { socialLinks } = usePage().props;

    return (
        <>
            <section className="relative bg-black pt-14 pb-10">
                <div className="container-x text-center">
                    <h3 className="font-display text-[1.5rem] font-medium text-white md:text-[1.8rem]">
                        We accept payment methods
                    </h3>
                </div>

                <div className="container-x mt-10">
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                        {PAYMENTS.map((p) => (
                            <img
                                key={p.src}
                                src={p.src}
                                alt={p.alt}
                                width={120}
                                height={120}
                                className="h-16 w-auto object-contain md:h-20"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative bg-black pt-12 pb-14">
                <div className="container-x mx-auto max-w-3xl text-center">
                    <h2 className="font-display text-[clamp(1.8rem,2.4vw+.8rem,2.6rem)] font-medium">
                        <Link
                            href="/"
                            className="text-white transition-colors hover:text-shape"
                        >
                            Tradivofx.com
                        </Link>
                    </h2>
                    <p className="mt-5 text-[15px] leading-[1.75] text-white/80">
                        Discover the edge in automated trading with Tradivo
                        Magic EA V12 — an advanced Gold Expert Advisor for MT5.
                        HTF trend filtering, counter-trend grid execution,
                        recovery protection, and smart basket profit targeting
                        in one disciplined algorithmic system. Powered by
                        Tradivo FX Limited.
                    </p>

                    <div className="mt-10 flex justify-center">
                        <img
                            src="/img/logo.png"
                            alt="Tradivo Magic EA V12"
                            width={820}
                            height={250}
                            className="h-16 w-auto md:h-20"
                        />
                    </div>

                    {socialLinks.length ? (
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            {socialLinks.map((s, i) => (
                                <a
                                    key={`${s.platform}-${i}`}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition-colors hover:border-shape hover:bg-shape/10 hover:text-white"
                                >
                                    <SocialIcon platform={s.platform} />
                                </a>
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>

            <footer
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: 15,
                }}
            >
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <a
                        href="mailto:info@tradivofx.com"
                        style={{ color: 'white' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        © Tradivo FX Limited · info@tradivofx.com
                    </a>
                    <span aria-hidden className="text-white/45">
                        ·
                    </span>
                    <Link
                        href="/privacy-policy"
                        className="text-white transition-colors hover:text-shape"
                    >
                        Privacy Policy
                    </Link>
                </div>
            </footer>
        </>
    );
}
