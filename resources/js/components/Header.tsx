import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const NAV = [
    { label: 'Home', href: '#home' },
    { label: 'Description', href: '#description' },
    { label: 'Results', href: '#results' },
    { label: 'Prices', href: '#prices' },
    { label: 'FAQ', href: '#faq' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();
    const onHome = url === '/' || url.startsWith('/?') || url.startsWith('/#');
    const hrefFor = (anchor: string) => (onHome ? anchor : `/${anchor}`);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-black/85 shadow-[0_2px_18px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md'
                    : 'bg-transparent'
            }`}
            style={{ minHeight: 'var(--header-h)' }}
        >
            <div className="container-x flex items-center justify-between gap-6 py-3.5">
                <Link href="/" className="flex items-center" aria-label="Tradivo home">
                    <img
                        src="/img/logo.png"
                        alt="Tradivo Magic EA V12"
                        width={820}
                        height={250}
                        className="h-12 w-auto object-contain md:h-14"
                    />
                </Link>

                <nav className="hidden items-center gap-9 lg:flex">
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={hrefFor(item.href)}
                            className="font-display hover:text-shape text-[15px] font-medium text-white/95 transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <a
                        href={hrefFor('#prices')}
                        className="btn-buy-now hidden sm:inline-flex"
                    >
                        Buy Now
                    </a>
                    <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white lg:hidden"
                        aria-label="Toggle menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            {open ? (
                                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                            ) : (
                                <>
                                    <path d="M4 7h16" strokeLinecap="round" />
                                    <path d="M4 12h16" strokeLinecap="round" />
                                    <path d="M4 17h16" strokeLinecap="round" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden">
                    <div className="container-x flex flex-col gap-0.5 py-3">
                        {NAV.map((item) => (
                            <a
                                key={item.href}
                                href={hrefFor(item.href)}
                                onClick={() => setOpen(false)}
                                className="font-display rounded-md px-2 py-3 text-[15px] font-medium text-white/90 hover:bg-white/5"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={hrefFor('#prices')}
                            onClick={() => setOpen(false)}
                            className="btn-buy-now mt-2"
                        >
                            Buy Now
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
