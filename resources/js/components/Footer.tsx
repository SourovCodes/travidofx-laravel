import { Link } from '@inertiajs/react';

const PAYMENTS = [
    { src: '/img/pay-1.png', alt: 'Payment 1' },
    { src: '/img/pay-2.png', alt: 'Payment 2' },
    { src: '/img/pay-3.png', alt: 'Payment 3' },
    { src: '/img/pay-4.png', alt: 'Payment 4' },
];

const SOCIALS: { name: string; href: string; icon: React.ReactNode }[] = [
    {
        name: 'WhatsApp',
        href: 'https://wa.me/14075617294',
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
            >
                <path d="M20.52 3.48A11.83 11.83 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.47-8.41Zm-8.48 18.36h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.62-.24-.37a9.86 9.86 0 0 1-1.51-5.3c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.04 7.01 2.9a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.9-9.95 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
            </svg>
        ),
    },
    {
        name: 'Telegram',
        href: 'https://t.me/tradivorobot',
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
            >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com/tradivorobot',
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
            >
                <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.9h-2.34v6.98A10 10 0 0 0 22 12z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/tradivorobot',
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
            >
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.14 0-3.51.01-4.75.07-.95.04-1.47.2-1.82.34a2.94 2.94 0 0 0-1.08.7c-.33.33-.54.65-.7 1.08-.13.35-.3.87-.34 1.82-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.95.2 1.47.34 1.82.16.43.37.75.7 1.08.33.33.65.54 1.08.7.35.13.87.3 1.82.34 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.95-.04 1.47-.2 1.82-.34.43-.16.75-.37 1.08-.7.33-.33.54-.65.7-1.08.13-.35.3-.87.34-1.82.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.95-.2-1.47-.34-1.82a2.94 2.94 0 0 0-.7-1.08 2.94 2.94 0 0 0-1.08-.7c-.35-.13-.87-.3-1.82-.34-1.24-.06-1.61-.07-4.75-.07zm0 3.05a4.99 4.99 0 1 1 0 9.98 4.99 4.99 0 0 1 0-9.98zm0 8.23a3.24 3.24 0 1 0 0-6.48 3.24 3.24 0 0 0 0 6.48zm6.36-8.43a1.17 1.17 0 1 1-2.33 0 1.17 1.17 0 0 1 2.33 0z" />
            </svg>
        ),
    },
    {
        name: 'TikTok',
        href: 'https://tiktok.com/@tradivo.robot',
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
            >
                <path d="M16.6 5.82A4.27 4.27 0 0 1 15.54 3H12.4v12.32a2.45 2.45 0 0 1-2.45 2.45 2.45 2.45 0 0 1-2.45-2.45 2.45 2.45 0 0 1 2.45-2.45c.27 0 .53.05.77.13v-3.2a5.62 5.62 0 0 0-.77-.06A5.65 5.65 0 0 0 4.3 15.4a5.65 5.65 0 0 0 5.65 5.65 5.65 5.65 0 0 0 5.65-5.65V9.3a7.39 7.39 0 0 0 4.32 1.4V7.5a4.31 4.31 0 0 1-3.32-1.68z" />
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/@Tradivo_Robot',
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
            >
                <path d="M23.5 6.5a3 3 0 0 0-2.1-2.13C19.56 4 12 4 12 4s-7.56 0-9.4.37A3 3 0 0 0 .5 6.5C.13 8.34.13 12 .13 12s0 3.66.37 5.5a3 3 0 0 0 2.1 2.13C4.44 20 12 20 12 20s7.56 0 9.4-.37a3 3 0 0 0 2.1-2.13c.37-1.84.37-5.5.37-5.5s0-3.66-.37-5.5zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
            </svg>
        ),
    },
];

export default function Footer() {
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
                            Tradivo.com
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

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        {SOCIALS.map((s) => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.name}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition-colors hover:border-shape hover:bg-shape/10 hover:text-white"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
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
