import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { TiltBand } from '@/components/Shape';

const POLICY_TEXT = `# Privacy Policy

**Last Updated:** May 2026

Welcome to [Tradivo](https://tradivofx.com) ("Tradivo", "we", "our", or "us").
Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, services, products, Expert Advisors (EAs), digital tools, and related support systems.

By accessing or using our website and services, you agree to the terms of this Privacy Policy.

---

# 1. Who We Are

Tradivo provides automated trading software, Expert Advisors (EA), trading tools, digital products, educational resources, and customer support services for MetaTrader platforms (MT5/MT4).

---

# 2. Information We Collect

We may collect the following information:

## A. Personal Information

When you purchase a product, contact support, or register on our website, we may collect:

* Full name
* Email address
* WhatsApp or Telegram contact
* Billing details
* Country/location
* Trading account number (for license activation)
* VPS or broker information (only if required for setup support)

---

## B. Technical & Usage Data

We automatically collect certain information such as:

* IP address
* Browser type
* Device information
* Operating system
* Website activity
* Pages visited
* Referral source
* Cookie data

This helps us improve website performance and user experience.

---

# 3. How We Use Your Information

We use your information to:

* Deliver and activate purchased products
* Provide technical support
* Verify licenses and prevent abuse
* Improve our website and services
* Send important updates and product notifications
* Process payments securely
* Respond to inquiries and customer requests
* Prevent fraud, unauthorized access, or illegal activity

We do **not** sell your personal information to third parties.

---

# 4. Payment Security

All payments are processed through secure third-party payment providers.
Tradivo does not directly store your full card or banking information.

We use industry-standard security measures to protect transaction data.

---

# 5. Cookies & Tracking Technologies

Tradivo uses cookies and analytics technologies to:

* Improve website speed and functionality
* Remember user preferences
* Analyze traffic and visitor behavior
* Improve advertising and marketing performance

You may disable cookies through your browser settings, although some website features may not function properly.

---

# 6. License & Account Verification

To protect our software and prevent unauthorized sharing, we may collect:

* MT5/MT4 account number
* Device or VPS identification
* License activation logs

This information is used strictly for security and license management purposes.

---

# 7. Third-Party Services

We may use trusted third-party services including:

* Payment gateways
* Analytics tools
* Hosting providers
* Email marketing platforms
* Customer support tools

These services may process limited user data necessary to operate our business.

We are not responsible for the privacy practices of external third-party websites linked from our platform.

---

# 8. Data Protection & Security

We implement reasonable security measures including:

* SSL encryption
* Secure servers
* Restricted data access
* Firewall protection
* Authentication systems

While we work hard to protect your data, no online transmission or storage system can be guaranteed 100% secure.

---

# 9. Marketing Communications

We may occasionally send:

* Product updates
* Discount offers
* New feature announcements
* Trading-related notifications

You can unsubscribe from marketing emails anytime using the unsubscribe link.

---

# 10. Refund & Financial Disclaimer

Tradivo provides software tools for automated trading.
Trading Forex, Gold, Crypto, and CFDs involves substantial financial risk.

We do not guarantee profits, fixed returns, or future performance. Past performance does not guarantee future results.

Users are fully responsible for:

* Their trading decisions
* Risk management
* Broker selection
* Account performance

---

# 11. Children's Privacy

Our services are not intended for individuals under 18 years of age.
We do not knowingly collect personal information from minors.

---

# 12. Your Rights

Depending on your location, you may have the right to:

* Request access to your data
* Correct inaccurate information
* Request deletion of your data
* Withdraw consent
* Object to certain processing activities

To make a request, contact us using the information below.

---

# 13. Data Retention

We retain your information only as long as necessary to:

* Provide services
* Maintain licenses
* Resolve disputes
* Meet legal obligations
* Prevent fraud or abuse

---

# 14. Changes to This Privacy Policy

We may update this Privacy Policy at any time.
Changes will be posted on this page with the updated effective date.

Continued use of our website means you accept the updated policy.

---

# 15. Contact Information

For privacy-related questions or support, contact:

**Tradivo Support**
Email: info@tradivofx.com
Website: https://tradivofx.com
WhatsApp: +

---

# Risk Warning

Trading leveraged financial instruments carries a high level of risk and may not be suitable for all investors. You should never trade with money you cannot afford to lose.

Tradivo EA is a software tool only and does not provide financial, investment, or legal advice.`;

type PolicyBlock =
    | { type: 'heading'; level: number; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'rule' };

function renderInline(text: string): ReactNode[] {
    const parts: ReactNode[] = [];
    const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text))) {
        if (match.index > cursor) {
            parts.push(text.slice(cursor, match.index));
        }

        if (match[2]) {
            parts.push(
                <strong
                    key={`${match.index}-strong`}
                    className="font-semibold text-white"
                >
                    {match[2]}
                </strong>,
            );
        } else if (match[3] && match[4]) {
            parts.push(
                <a
                    key={`${match.index}-link`}
                    href={match[4]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-shape underline underline-offset-4 hover:text-shape-soft"
                >
                    {match[3]}
                </a>,
            );
        }

        cursor = pattern.lastIndex;
    }

    if (cursor < text.length) {
        parts.push(text.slice(cursor));
    }

    return parts;
}

function parsePolicy(markdown: string): PolicyBlock[] {
    const blocks: PolicyBlock[] = [];
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    let paragraph: string[] = [];
    let list: string[] = [];

    const flushParagraph = () => {
        if (paragraph.length) {
            blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
            paragraph = [];
        }
    };

    const flushList = () => {
        if (list.length) {
            blocks.push({ type: 'list', items: list });
            list = [];
        }
    };

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
            flushParagraph();
            flushList();
            continue;
        }

        if (trimmed === '---') {
            flushParagraph();
            flushList();
            blocks.push({ type: 'rule' });
            continue;
        }

        const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);

        if (heading) {
            flushParagraph();
            flushList();
            blocks.push({
                type: 'heading',
                level: heading[1].length,
                text: heading[2],
            });
            continue;
        }

        if (trimmed.startsWith('* ')) {
            flushParagraph();
            list.push(trimmed.slice(2));
            continue;
        }

        flushList();
        paragraph.push(trimmed);
    }

    flushParagraph();
    flushList();

    return blocks;
}

function PolicyContent({ blocks }: { blocks: PolicyBlock[] }) {
    return (
        <div className="space-y-6">
            {blocks.map((block, index) => {
                if (block.type === 'rule') {
                    return <hr key={index} className="border-white/10" />;
                }

                if (block.type === 'list') {
                    return (
                        <ul
                            key={index}
                            className="space-y-3 pl-5 text-white/75"
                        >
                            {block.items.map((item) => (
                                <li
                                    key={item}
                                    className="list-disc leading-7 marker:text-shape"
                                >
                                    {renderInline(item)}
                                </li>
                            ))}
                        </ul>
                    );
                }

                if (block.type === 'heading') {
                    if (block.level === 1) {
                        return (
                            <h2
                                key={index}
                                className="font-display text-2xl font-medium text-white md:text-3xl"
                            >
                                {renderInline(block.text)}
                            </h2>
                        );
                    }

                    return (
                        <h3
                            key={index}
                            className="pt-2 font-display text-xl font-medium text-white md:text-2xl"
                        >
                            {renderInline(block.text)}
                        </h3>
                    );
                }

                return (
                    <p
                        key={index}
                        className="text-[15px] leading-8 text-white/75"
                    >
                        {renderInline(block.text)}
                    </p>
                );
            })}
        </div>
    );
}

export default function PrivacyPolicy() {
    const blocks = parsePolicy(POLICY_TEXT);

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
                            <PolicyContent blocks={blocks} />
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
