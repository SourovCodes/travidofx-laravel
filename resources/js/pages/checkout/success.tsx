import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Head, Link } from '@inertiajs/react';

export default function CheckoutSuccess({ sessionId }: { sessionId?: string }) {
    return (
        <>
            <Head title="Thank You — Tradivo Magic EA V12" />
            <Header />
            <main className="flex-1 bg-black text-white">
                <section
                    className="py-20"
                    style={{ paddingTop: 'calc(var(--header-h) + 80px)' }}
                >
                    <div className="container-x mx-auto max-w-2xl text-center">
                        <div
                            aria-hidden
                            className="text-success mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10"
                        >
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="eyebrow">Order Confirmed</p>
                        <h1 className="section-title mt-3">
                            Thanks — your payment was successful
                        </h1>
                        <p className="section-subtitle mx-auto mt-4">
                            Your license keys and download links are on their way to your
                            inbox. Check spam if you don&apos;t see them within a few
                            minutes.
                        </p>
                        {sessionId && (
                            <p className="mt-6 text-xs text-white/45">
                                Reference: <code className="font-mono">{sessionId}</code>
                            </p>
                        )}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <Link href="/" className="btn-outline-white">
                                Back to home
                            </Link>
                            <a
                                href="https://wa.me/14075617294"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-elementor"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
