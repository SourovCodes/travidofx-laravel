import { Head } from '@inertiajs/react';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { TiltBand } from '@/components/Shape';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy | Tradivo FX Limited" />
            <Header />
            <main className="flex-1 bg-black pt-[var(--header-h)]">
                <section className="relative overflow-hidden bg-[#03002E] py-16 md:py-24">
                    <div className="container-x">
                        <p className="eyebrow">Tradivo FX Limited</p>
                        <h1 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.4rem)] leading-tight font-medium text-white">
                            Privacy Policy
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                            How we collect, use, store, and protect information
                            across our website, products, support, payments, and
                            license systems.
                        </p>
                    </div>
                </section>

                <TiltBand />

                <section className="bg-black py-14 md:py-20">
                    <div className="container-x">
                        <article className="mx-auto max-w-4xl rounded-md border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_80px_-50px_rgba(174,131,72,0.65)] md:p-10">
                            <div className="space-y-6">
                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    Privacy Policy
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    <strong className="font-semibold text-white">
                                        Last Updated:
                                    </strong>{' '}
                                    May 2026
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Welcome to{' '}
                                    <a
                                        href="https://tradivofx.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-shape underline underline-offset-4 hover:text-shape-soft"
                                    >
                                        Tradivo
                                    </a>{' '}
                                    (&quot;Tradivo&quot;, &quot;we&quot;,
                                    &quot;our&quot;, or &quot;us&quot;). Your
                                    privacy is important to us. This Privacy
                                    Policy explains how we collect, use, store,
                                    and protect your information when you use
                                    our website, services, products, Expert
                                    Advisors (EAs), digital tools, and related
                                    support systems.
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    By accessing or using our website and
                                    services, you agree to the terms of this
                                    Privacy Policy.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    1. Who We Are
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Tradivo provides automated trading software,
                                    Expert Advisors (EA), trading tools, digital
                                    products, educational resources, and
                                    customer support services for MetaTrader
                                    platforms (MT5/MT4).
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    2. Information We Collect
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We may collect the following information:
                                </p>
                                <h3 className="pt-2 font-display text-xl font-medium text-white md:text-2xl">
                                    A. Personal Information
                                </h3>
                                <p className="text-[15px] leading-8 text-white/75">
                                    When you purchase a product, contact
                                    support, or register on our website, we may
                                    collect:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Full name
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Email address
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        WhatsApp or Telegram contact
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Billing details
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Country/location
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Trading account number (for license
                                        activation)
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        VPS or broker information (only if
                                        required for setup support)
                                    </li>
                                </ul>

                                <h3 className="pt-2 font-display text-xl font-medium text-white md:text-2xl">
                                    B. Technical &amp; Usage Data
                                </h3>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We automatically collect certain information
                                    such as:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        IP address
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Browser type
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Device information
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Operating system
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Website activity
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Pages visited
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Referral source
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Cookie data
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    This helps us improve website performance
                                    and user experience.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    3. How We Use Your Information
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We use your information to:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Deliver and activate purchased products
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Provide technical support
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Verify licenses and prevent abuse
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Improve our website and services
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Send important updates and product
                                        notifications
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Process payments securely
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Respond to inquiries and customer
                                        requests
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Prevent fraud, unauthorized access, or
                                        illegal activity
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We do{' '}
                                    <strong className="font-semibold text-white">
                                        not
                                    </strong>{' '}
                                    sell your personal information to third
                                    parties.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    4. Payment Security
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    All payments are processed through secure
                                    third-party payment providers. Tradivo does
                                    not directly store your full card or banking
                                    information.
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We use industry-standard security measures
                                    to protect transaction data.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    5. Cookies &amp; Tracking Technologies
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Tradivo uses cookies and analytics
                                    technologies to:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Improve website speed and functionality
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Remember user preferences
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Analyze traffic and visitor behavior
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Improve advertising and marketing
                                        performance
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    You may disable cookies through your browser
                                    settings, although some website features may
                                    not function properly.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    6. License &amp; Account Verification
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    To protect our software and prevent
                                    unauthorized sharing, we may collect:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        MT5/MT4 account number
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Device or VPS identification
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        License activation logs
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    This information is used strictly for
                                    security and license management purposes.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    7. Third-Party Services
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We may use trusted third-party services
                                    including:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Payment gateways
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Analytics tools
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Hosting providers
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Email marketing platforms
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Customer support tools
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    These services may process limited user data
                                    necessary to operate our business.
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We are not responsible for the privacy
                                    practices of external third-party websites
                                    linked from our platform.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    8. Data Protection &amp; Security
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We implement reasonable security measures
                                    including:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        SSL encryption
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Secure servers
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Restricted data access
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Firewall protection
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Authentication systems
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    While we work hard to protect your data, no
                                    online transmission or storage system can be
                                    guaranteed 100% secure.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    9. Marketing Communications
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We may occasionally send:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Product updates
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Discount offers
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        New feature announcements
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Trading-related notifications
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    You can unsubscribe from marketing emails
                                    anytime using the unsubscribe link.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    10. Refund &amp; Financial Disclaimer
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Tradivo provides software tools for
                                    automated trading. Trading Forex, Gold,
                                    Crypto, and CFDs involves substantial
                                    financial risk.
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We do not guarantee profits, fixed returns,
                                    or future performance. Past performance does
                                    not guarantee future results.
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Users are fully responsible for:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Their trading decisions
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Risk management
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Broker selection
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Account performance
                                    </li>
                                </ul>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    11. Children&apos;s Privacy
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Our services are not intended for
                                    individuals under 18 years of age. We do not
                                    knowingly collect personal information from
                                    minors.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    12. Your Rights
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Depending on your location, you may have the
                                    right to:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Request access to your data
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Correct inaccurate information
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Request deletion of your data
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Withdraw consent
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Object to certain processing activities
                                    </li>
                                </ul>
                                <p className="text-[15px] leading-8 text-white/75">
                                    To make a request, contact us using the
                                    information below.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    13. Data Retention
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We retain your information only as long as
                                    necessary to:
                                </p>
                                <ul className="space-y-3 pl-5 text-white/75">
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Provide services
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Maintain licenses
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Resolve disputes
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Meet legal obligations
                                    </li>
                                    <li className="list-disc leading-7 marker:text-shape">
                                        Prevent fraud or abuse
                                    </li>
                                </ul>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    14. Changes to This Privacy Policy
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    We may update this Privacy Policy at any
                                    time. Changes will be posted on this page
                                    with the updated effective date.
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Continued use of our website means you
                                    accept the updated policy.
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    15. Contact Information
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    For privacy-related questions or support,
                                    contact:
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    <strong className="font-semibold text-white">
                                        Tradivo Support
                                    </strong>
                                    <br />
                                    Email: info@tradivofx.com
                                    <br />
                                    Website:{' '}
                                    <a
                                        href="https://tradivofx.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-shape underline underline-offset-4 hover:text-shape-soft"
                                    >
                                        https://tradivofx.com
                                    </a>
                                    <br />
                                    WhatsApp: +
                                </p>

                                <hr className="border-white/10" />

                                <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
                                    Risk Warning
                                </h2>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Trading leveraged financial instruments
                                    carries a high level of risk and may not be
                                    suitable for all investors. You should never
                                    trade with money you cannot afford to lose.
                                </p>
                                <p className="text-[15px] leading-8 text-white/75">
                                    Tradivo EA is a software tool only and does
                                    not provide financial, investment, or legal
                                    advice.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
