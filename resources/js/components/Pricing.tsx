import { Link } from '@inertiajs/react';
import Reveal from '@/components/Reveal';

type Plan = {
    name: string;
    subtitle: string;
    priceNow: number;
    priceOld?: number;
    blurb: string;
    features: string[];
    cta: { label: string; href: string };
    ribbon?: { label: string; tone: 'popular' | 'best' };
};

const PLANS: Plan[] = [
    {
        name: 'Basic',
        subtitle: '3 Months Access',
        priceNow: 149,
        priceOld: 199,
        blurb: '3 Months License',
        features: ['1 Key License', 'XAUUSD Support', 'Help & Support', 'Free Updates'],
        cta: { label: 'Get it Now', href: '/checkout?plan=basic' },
    },
    {
        name: 'Pro',
        subtitle: '1 Year Access',
        priceNow: 299,
        priceOld: 399,
        blurb: '1 Year License',
        features: [
            '3 Key Licenses',
            'XAUUSD Support',
            'Priority Support',
            'Free Updates',
        ],
        cta: { label: 'Get it Now', href: '/checkout?plan=pro' },
        ribbon: { label: 'Popular', tone: 'popular' },
    },
    {
        name: 'Master',
        subtitle: '1 Year Access',
        priceNow: 499,
        priceOld: 699,
        blurb: '1 Year License',
        features: [
            '5 Key Licenses',
            'XAUUSD + BTC',
            'Premium Support',
            'Advanced Features',
            'Free Updates',
        ],
        cta: { label: 'Get it Now', href: '/checkout?plan=master' },
    },
    {
        name: 'Unlimited',
        subtitle: 'Lifetime Access',
        priceNow: 799,
        priceOld: 999,
        blurb: 'Lifetime License',
        features: [
            '10 Key Licenses',
            'XAUUSD + BTC',
            'Lifetime Updates',
            'Priority Support',
            'Full Premium Access',
        ],
        cta: { label: 'Get it Now', href: '/checkout?plan=unlimited' },
        ribbon: { label: 'Best Value', tone: 'best' },
    },
];

export default function Pricing() {
    return (
        <section id="prices" className="relative bg-black pb-20 md:pb-24">
            <div className="container-x">
                <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                    {PLANS.map((plan, i) => (
                        <Reveal key={plan.name} delay={i * 80}>
                            <PlanCard plan={plan} />
                        </Reveal>
                    ))}
                </div>

                <p className="mx-auto mt-10 max-w-2xl text-center text-[14px] text-white/75">
                    📩 For Unlimited License (for business or affiliate purposes), please
                    contact us via private message.
                </p>
            </div>
        </section>
    );
}

function PlanCard({ plan }: { plan: Plan }) {
    return (
        <div className="bg-card relative overflow-hidden rounded-sm shadow-[0_22px_50px_-25px_rgba(0,0,0,0.65)]">
            {plan.ribbon && (
                <div
                    className="pointer-events-none absolute top-0 right-0 z-10 h-[150px] w-[150px] overflow-hidden"
                    style={{ transform: 'rotate(90deg)' }}
                    aria-hidden
                >
                    <div
                        className="font-display text-center text-[13px] font-extrabold tracking-[0.18em] text-white uppercase"
                        style={{
                            width: '200%',
                            marginTop: 35,
                            lineHeight: 2,
                            transform:
                                'translateY(-50%) translateX(-50%) translateX(35px) rotate(-45deg)',
                            background:
                                plan.ribbon.tone === 'popular' ? '#003D08' : '#AE8348',
                        }}
                    >
                        {plan.ribbon.label}
                    </div>
                </div>
            )}

            <div className="bg-[#000000] px-4 pt-5 pb-4 text-center text-white">
                <h3 className="font-display text-[24px] leading-tight font-semibold text-[#F5EDED]">
                    {plan.name}
                </h3>
                <p className="mt-1 text-[13px] text-white/85">{plan.subtitle}</p>
            </div>

            <div className="px-5 pt-10 pb-6 text-center text-white">
                <div className="flex flex-wrap items-center justify-center gap-x-3 leading-none">
                    {plan.priceOld && (
                        <span className="font-display mb-2 self-end text-[1.05rem] font-normal text-white/70 line-through">
                            <span className="mr-px">$</span>
                            {plan.priceOld}
                        </span>
                    )}
                    <span className="inline-flex items-baseline">
                        <span className="font-display mr-0.5 text-[28px] font-extrabold">
                            $
                        </span>
                        <span className="font-display text-[65px] leading-[0.8] font-extrabold">
                            {plan.priceNow}
                        </span>
                    </span>
                </div>
                <p className="mt-3 text-[13px] text-white/85">{plan.blurb}</p>
            </div>

            <ul className="px-5 pb-7">
                {plan.features.map((f, i) => (
                    <li
                        key={f}
                        className="py-3 text-[14px] leading-[1.4] text-white/85 first:pt-0"
                        style={
                            i === 0
                                ? undefined
                                : { borderTop: '1px solid rgba(255,255,255,0.08)' }
                        }
                    >
                        <div className="flex items-center gap-3 px-4">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                className="text-shape shrink-0"
                                aria-hidden
                            >
                                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
                            </svg>
                            <span>{f}</span>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center px-5 pb-8">
                <Link href={plan.cta.href} className="btn-elementor">
                    {plan.cta.label}
                </Link>
            </div>
        </div>
    );
}
