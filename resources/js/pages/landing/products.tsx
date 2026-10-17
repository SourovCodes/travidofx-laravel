import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Faq from '@/components/Faq';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import HighlightedText from '@/components/HighlightedText';
import LandingIcon from '@/components/LandingIcon';
import Pricing from '@/components/Pricing';
import type { PricingPackage } from '@/components/Pricing';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';
import type { ProductsLandingContent } from '@/types/landing';

type Props = {
    content: ProductsLandingContent;
    pricingPackages: PricingPackage[];
    mainSiteUrl: string;
};

const NAV = [
    { label: 'Features', href: '#features' },
    { label: 'Setup', href: '#setup' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
];

function Gold({ text }: { text: string }) {
    return (
        <HighlightedText
            text={text}
            highlightClassName="bg-gradient-to-r from-[#f2c26b] to-[#ae8348] bg-clip-text text-transparent"
        />
    );
}

function isExternal(url: string): boolean {
    return /^https?:\/\//i.test(url);
}

function CtaButton({
    href,
    label,
    className,
}: {
    href: string;
    label: string;
    className?: string;
}) {
    if (label === '') {
        return null;
    }

    const external = isExternal(href);

    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#c99a57] to-[#ae8348] px-7 py-3.5 font-display text-[15px] font-bold text-white shadow-[0_14px_36px_-14px_rgba(174,131,72,0.95)] transition hover:brightness-110',
                className,
            )}
        >
            {label}
            <LandingIcon name="chevron" size={18} />
        </a>
    );
}

function SectionHeading({
    eyebrow,
    heading,
    body,
}: {
    eyebrow?: string;
    heading: string;
    body?: string;
}) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="section-title mt-3">
                <Gold text={heading} />
            </h2>
            {body && <p className="section-subtitle mx-auto mt-4">{body}</p>}
        </div>
    );
}

export default function ProductsLanding({
    content,
    pricingPackages,
    mainSiteUrl,
}: Props) {
    const {
        seo,
        hero,
        whyChoose,
        consistency,
        setup,
        included,
        pricing,
        faq,
        risk,
        cta,
    } = content;

    return (
        <>
            <Head title={seo.title}>
                {seo.description !== '' && (
                    <meta name="description" content={seo.description} />
                )}
            </Head>

            <LandingHeader hero={hero} />

            <main className="flex-1 bg-black text-white">
                <Hero hero={hero} />

                {whyChoose.items.length > 0 && (
                    <WhyChoose whyChoose={whyChoose} />
                )}

                {consistency.items.length > 0 && (
                    <Consistency consistency={consistency} />
                )}

                {setup.steps.length > 0 && <Setup setup={setup} />}

                {included.items.length > 0 && <Included included={included} />}

                <PricingSection
                    pricing={pricing}
                    packages={pricingPackages}
                    mainSiteUrl={mainSiteUrl}
                />

                <Faq content={faq} />

                {risk.body !== '' && <Risk risk={risk} />}

                <ClosingCta cta={cta} />
            </main>

            <LandingFooter mainSiteUrl={mainSiteUrl} />
            <FloatingContactButtons />
        </>
    );
}

function LandingHeader({ hero }: { hero: ProductsLandingContent['hero'] }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                scrolled || open
                    ? 'bg-black/85 shadow-[0_2px_18px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md'
                    : 'bg-transparent',
            )}
        >
            <div className="container-x flex items-center justify-between gap-6 py-3.5">
                <a href="#top" aria-label="Tradivo Magic EA">
                    <img
                        src="/img/logo.png"
                        alt="Tradivo"
                        className="h-10 w-auto md:h-12"
                    />
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="font-display text-[15px] font-semibold text-white/85 transition hover:text-shape"
                        >
                            {item.label}
                        </a>
                    ))}
                    <CtaButton
                        href={hero.buttonUrl}
                        label={hero.buttonLabel}
                        className="px-5 py-2.5 text-sm"
                    />
                </nav>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white md:hidden"
                >
                    <LandingIcon name="menu" size={22} />
                </button>
            </div>

            {open && (
                <nav
                    className="container-x flex flex-col pb-4 md:hidden"
                    onClick={() => setOpen(false)}
                >
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="border-t border-white/10 py-3 font-display font-semibold text-white/85"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
}

function Hero({ hero }: { hero: ProductsLandingContent['hero'] }) {
    return (
        <section
            id="top"
            className="relative overflow-hidden bg-[radial-gradient(70%_60%_at_80%_30%,rgba(174,131,72,0.28),transparent_70%),radial-gradient(50%_50%_at_10%_0%,rgba(3,0,46,0.9),transparent_70%)] pt-28 pb-16 md:pt-36 md:pb-24"
        >
            <div className="container-x grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
                <Reveal>
                    {hero.badge !== '' && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-shape/50 bg-shape/10 px-4 py-1.5 font-display text-xs font-bold tracking-wider text-[#f2c26b] uppercase">
                            <LandingIcon name="check" size={15} />
                            {hero.badge}
                        </span>
                    )}

                    <h1 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.1] font-bold tracking-tight">
                        <Gold text={hero.title} />
                    </h1>

                    {hero.subtitle !== '' && (
                        <p className="mt-4 font-display text-lg font-semibold text-white/90 md:text-xl">
                            {hero.subtitle}
                        </p>
                    )}

                    {hero.paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="mt-4 max-w-xl text-[15px] leading-7 text-white/70 md:text-base"
                        >
                            {paragraph}
                        </p>
                    ))}

                    <div className="mt-8">
                        <CtaButton
                            href={hero.buttonUrl}
                            label={hero.buttonLabel}
                        />
                    </div>
                </Reveal>

                {hero.image && (
                    <Reveal delay={120} className="relative">
                        <div
                            aria-hidden
                            className="absolute inset-6 rounded-full bg-shape/30 blur-3xl"
                        />
                        <img
                            src={hero.image}
                            alt="Tradivo Magic EA"
                            className="relative mx-auto w-full max-w-md rounded-xl shadow-[0_40px_80px_-30px_rgba(174,131,72,0.7)]"
                        />
                    </Reveal>
                )}
            </div>
        </section>
    );
}

function CheckItem({
    text,
    compact = false,
}: {
    text: string;
    compact?: boolean;
}) {
    return (
        <span className="flex items-start gap-3">
            <span
                className={cn(
                    'mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-shape/15 text-[#f2c26b]',
                    compact ? 'h-6 w-6' : 'h-8 w-8',
                )}
            >
                <LandingIcon name="check" size={compact ? 14 : 17} />
            </span>
            <span
                className={cn(
                    'leading-7 text-white/85',
                    compact ? 'text-[15px]' : 'text-base',
                )}
            >
                {text}
            </span>
        </span>
    );
}

function WhyChoose({
    whyChoose,
}: {
    whyChoose: ProductsLandingContent['whyChoose'];
}) {
    return (
        <section id="features" className="bg-[#050505] py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <SectionHeading heading={whyChoose.heading} />
                </Reveal>

                <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {whyChoose.items.map((item, index) => (
                        <Reveal key={index} as="li" delay={index * 60}>
                            <div className="h-full rounded-lg border border-white/10 bg-card p-5 transition hover:border-shape/50">
                                <CheckItem text={item} />
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function Consistency({
    consistency,
}: {
    consistency: ProductsLandingContent['consistency'];
}) {
    return (
        <section className="bg-black py-20 md:py-24">
            <div className="container-x grid items-center gap-10 md:grid-cols-2">
                <Reveal>
                    <h2 className="section-title">
                        <Gold text={consistency.heading} />
                    </h2>
                    {consistency.intro !== '' && (
                        <p className="mt-4 font-display text-lg font-semibold text-white/85">
                            {consistency.intro}
                        </p>
                    )}
                    {consistency.note !== '' && (
                        <p className="mt-6 hidden rounded-lg border border-shape/30 bg-shape/[0.07] p-4 text-sm leading-6 text-white/65 md:block">
                            {consistency.note}
                        </p>
                    )}
                </Reveal>

                <Reveal delay={100}>
                    <ul className="space-y-4 rounded-xl border border-white/10 bg-card p-6 md:p-8">
                        {consistency.items.map((item, index) => (
                            <li key={index}>
                                <CheckItem text={item} compact />
                            </li>
                        ))}
                    </ul>
                    {consistency.note !== '' && (
                        <p className="mt-4 rounded-lg border border-shape/30 bg-shape/[0.07] p-4 text-sm leading-6 text-white/65 md:hidden">
                            {consistency.note}
                        </p>
                    )}
                </Reveal>
            </div>
        </section>
    );
}

function Setup({ setup }: { setup: ProductsLandingContent['setup'] }) {
    return (
        <section id="setup" className="bg-[#050505] py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <SectionHeading heading={setup.heading} />
                </Reveal>

                <ol
                    className={cn(
                        'mt-12 grid gap-5 sm:grid-cols-2',
                        setup.steps.length >= 4 && 'lg:grid-cols-4',
                        setup.steps.length === 3 && 'lg:grid-cols-3',
                    )}
                >
                    {setup.steps.map((step, index) => (
                        <Reveal key={index} as="li" delay={index * 80}>
                            <div className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-card p-6">
                                <span
                                    aria-hidden
                                    className="absolute -top-4 -right-1 font-display text-[5.5rem] leading-none font-extrabold text-white/[0.04]"
                                >
                                    {index + 1}
                                </span>
                                <span className="eyebrow">
                                    Step {index + 1}
                                </span>
                                <p className="mt-3 text-base leading-7 text-white/85">
                                    {step}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}

function Included({
    included,
}: {
    included: ProductsLandingContent['included'];
}) {
    return (
        <section className="bg-black py-20 md:py-24">
            <div className="container-x">
                <Reveal>
                    <div className="mx-auto max-w-3xl rounded-2xl border border-shape/30 bg-gradient-to-br from-[#1b140b] via-card to-card p-8 md:p-12">
                        <h2 className="section-title text-center">
                            <Gold text={included.heading} />
                        </h2>
                        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                            {included.items.map((item, index) => (
                                <li key={index}>
                                    <CheckItem text={item} compact />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function PricingSection({
    pricing,
    packages,
    mainSiteUrl,
}: {
    pricing: ProductsLandingContent['pricing'];
    packages: PricingPackage[];
    mainSiteUrl: string;
}) {
    const showPlans = pricing.showPlans && packages.length > 0;
    const buttonUrl = pricing.buttonUrl ?? `${mainSiteUrl}/#prices`;
    const showButton =
        pricing.buttonLabel !== '' && (!showPlans || pricing.buttonUrl);

    return (
        <section
            id="pricing"
            className={cn('bg-black pt-20 md:pt-24', !showPlans && 'pb-20')}
        >
            <div className="container-x">
                <Reveal>
                    <SectionHeading
                        heading={pricing.heading}
                        body={pricing.body}
                    />
                </Reveal>

                {showButton && (
                    <div className="mt-8 text-center">
                        <CtaButton
                            href={buttonUrl}
                            label={pricing.buttonLabel}
                        />
                    </div>
                )}
            </div>

            {showPlans && (
                <div className="mt-12">
                    <Pricing
                        packages={packages}
                        checkoutBaseUrl={mainSiteUrl}
                    />
                </div>
            )}
        </section>
    );
}

function Risk({ risk }: { risk: ProductsLandingContent['risk'] }) {
    return (
        <section className="bg-[#050505] py-16">
            <div className="container-x">
                <Reveal>
                    <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-[#f2b01e]/30 bg-[#f2b01e]/[0.05] p-6 sm:flex-row md:p-8">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f2b01e]/15 text-[#f2b01e]">
                            <LandingIcon name="shield" size={22} />
                        </span>
                        <div>
                            {risk.heading !== '' && (
                                <h2 className="font-display text-xl font-bold text-white">
                                    {risk.heading}
                                </h2>
                            )}
                            <p className="mt-2 text-sm leading-7 text-white/70">
                                {risk.body}
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function ClosingCta({ cta }: { cta: ProductsLandingContent['cta'] }) {
    if (cta.heading === '') {
        return null;
    }

    return (
        <section className="relative overflow-hidden bg-black bg-[radial-gradient(60%_80%_at_50%_100%,rgba(174,131,72,0.3),transparent_70%)] py-20 md:py-28">
            <div className="container-x text-center">
                <Reveal>
                    <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,3.6vw,3rem)] leading-tight font-bold">
                        <Gold text={cta.heading} />
                    </h2>
                    {cta.body !== '' && (
                        <p className="section-subtitle mx-auto mt-4">
                            {cta.body}
                        </p>
                    )}
                    <div className="mt-8">
                        <CtaButton
                            href={cta.buttonUrl}
                            label={cta.buttonLabel}
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function LandingFooter({ mainSiteUrl }: { mainSiteUrl: string }) {
    const { socialLinks } = usePage().props;

    return (
        <footer className="border-t border-white/10 bg-black py-10 text-white">
            <div className="container-x flex flex-col items-center justify-between gap-6 md:flex-row">
                <img
                    src="/img/logo.png"
                    alt="Tradivo"
                    className="h-10 w-auto"
                />

                {socialLinks.length > 0 && (
                    <ul className="flex flex-wrap items-center justify-center gap-3">
                        {socialLinks.map((link, index) => (
                            <li key={`${link.platform}-${index}`}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-shape"
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
            </div>

            <div className="container-x mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row">
                <p>
                    © {new Date().getFullYear()} Tradivo FX Limited. All rights
                    reserved.
                </p>
                <div className="flex gap-5">
                    <a href={mainSiteUrl} className="hover:text-shape">
                        Main website
                    </a>
                    <a
                        href={`${mainSiteUrl}/privacy-policy`}
                        className="hover:text-shape"
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}
