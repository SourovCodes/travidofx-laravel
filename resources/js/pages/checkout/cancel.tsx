import { Head, Link } from '@inertiajs/react';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CheckoutCancel() {
    return (
        <>
            <Head title="Checkout Canceled — Tradivo Magic EA V12" />
            <Header />
            <main className="flex-1 bg-black text-white">
                <section
                    className="py-20"
                    style={{ paddingTop: 'calc(var(--header-h) + 80px)' }}
                >
                    <div className="container-x mx-auto max-w-2xl text-center">
                        <div
                            aria-hidden
                            className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300"
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
                                <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            </svg>
                        </div>
                        <p className="eyebrow">Payment Canceled</p>
                        <h1 className="section-title mt-3">
                            No charge was made
                        </h1>
                        <p className="section-subtitle mx-auto mt-4">
                            You canceled the checkout. Your card was not
                            charged. Try again when you&apos;re ready — your
                            spot in the launch discount is still open.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <Link href="/#prices" className="btn-elementor">
                                Back to pricing
                            </Link>
                            <Link href="/" className="btn-outline-white">
                                Back to home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
