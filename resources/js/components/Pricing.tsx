import { Link } from '@inertiajs/react';
import Reveal from '@/components/Reveal';

type Plan = {
    slug: string;
    name: string;
    accessDuration: string;
    amount: number;
    oldAmount: number;
    features: string[];
    badge?: 'popular' | 'best_value' | null;
};

export type PricingPackage = Plan;

const BADGES = {
    popular: { label: 'Popular', tone: 'popular' },
    best_value: { label: 'Best Value', tone: 'best' },
} satisfies Record<string, { label: string; tone: 'popular' | 'best' }>;

export default function Pricing({ packages }: { packages: PricingPackage[] }) {
    return (
        <section id="prices" className="relative bg-black pb-20 md:pb-24">
            <div className="container-x">
                <div className={pricingGridClass(packages.length)}>
                    {packages.map((plan, i) => (
                        <Reveal key={plan.slug} delay={i * 80}>
                            <PlanCard plan={plan} />
                        </Reveal>
                    ))}
                </div>

                <p className="mx-auto mt-10 max-w-2xl text-center text-[14px] text-white/75">
                    📩 For Unlimited License (for business or affiliate
                    purposes), please contact us via private message.
                </p>
            </div>
        </section>
    );
}

function PlanCard({ plan }: { plan: Plan }) {
    const ribbon = plan.badge ? BADGES[plan.badge] : null;
    const hasOldPrice = plan.oldAmount > plan.amount;

    return (
        <div className="relative overflow-hidden rounded-sm bg-card shadow-[0_22px_50px_-25px_rgba(0,0,0,0.65)]">
            {ribbon && (
                <div
                    className="pointer-events-none absolute top-0 right-0 z-10 h-[150px] w-[150px] overflow-hidden"
                    style={{ transform: 'rotate(90deg)' }}
                    aria-hidden
                >
                    <div
                        className="text-center font-display text-[13px] font-extrabold tracking-[0.18em] text-white uppercase"
                        style={{
                            width: '200%',
                            marginTop: 35,
                            lineHeight: 2,
                            transform:
                                'translateY(-50%) translateX(-50%) translateX(35px) rotate(-45deg)',
                            background:
                                ribbon.tone === 'popular'
                                    ? '#003D08'
                                    : '#AE8348',
                        }}
                    >
                        {ribbon.label}
                    </div>
                </div>
            )}

            <div className="bg-[#000000] px-4 pt-5 pb-4 text-center text-white">
                <h3 className="font-display text-[24px] leading-tight font-semibold text-[#F5EDED]">
                    {plan.name}
                </h3>
                <p className="mt-1 text-[13px] text-white/85">
                    {plan.accessDuration}
                </p>
            </div>

            <div className="px-5 pt-10 pb-6 text-center text-white">
                <div className="flex flex-wrap items-center justify-center gap-x-3 leading-none">
                    {hasOldPrice && (
                        <span className="mb-2 self-end font-display text-[1.05rem] font-normal text-white/70 line-through">
                            <span className="mr-px">$</span>
                            {formatPrice(plan.oldAmount)}
                        </span>
                    )}
                    <span className="inline-flex items-baseline">
                        <span className="mr-0.5 font-display text-[28px] font-extrabold">
                            $
                        </span>
                        <span className="font-display text-[65px] leading-[0.8] font-extrabold">
                            {formatPrice(plan.amount)}
                        </span>
                    </span>
                </div>
                <p className="mt-3 text-[13px] text-white/85">
                    {plan.accessDuration}
                </p>
            </div>

            <ul className="px-5 pb-7">
                {plan.features.map((f, i) => (
                    <li
                        key={f}
                        className="py-3 text-[14px] leading-[1.4] text-white/85 first:pt-0"
                        style={
                            i === 0
                                ? undefined
                                : {
                                      borderTop:
                                          '1px solid rgba(255,255,255,0.08)',
                                  }
                        }
                    >
                        <div className="flex items-center gap-3 px-4">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                className="shrink-0 text-shape"
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
                <Link
                    href={`/checkout?plan=${encodeURIComponent(plan.slug)}`}
                    className="btn-elementor"
                >
                    Get it Now
                </Link>
            </div>
        </div>
    );
}

function pricingGridClass(count: number) {
    if (count <= 1) {
        return 'mx-auto grid max-w-sm items-start gap-6';
    }

    if (count === 2) {
        return 'mx-auto grid max-w-3xl items-start gap-6 md:grid-cols-2';
    }

    if (count === 3) {
        return 'grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3';
    }

    return 'grid items-start gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5';
}

function formatPrice(amount: number) {
    return Number.isInteger(amount) ? `${amount}` : amount.toFixed(2);
}
