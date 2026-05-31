import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PaymentOptions from '@/components/PaymentOptions';
import type { CryptoWallet } from '@/components/PaymentOptions';
import {
    formatMoney,
    getExtraFee,
    getTotalWithFee,
    hasExtraFee,
} from '@/lib/payment-fees';
import type { PaymentMethod } from '@/lib/payment-fees';

type Plan = {
    name: string;
    subtitle: string;
    amount: number;
    old_amount: number;
};

type Props = {
    planSlug: string;
    plan: Plan;
    paymentFeeRate: number;
    cryptoWallets: CryptoWallet[];
};

type CheckoutForm = {
    plan: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    additionalInfo: string;
    paymentMethod: PaymentMethod;
    promoCode: string;
};

type PromoStatus = 'idle' | 'checking' | 'applied' | 'invalid';

function formatPercent(value: number) {
    return Number.isInteger(value) ? `${value}%` : `${value.toFixed(2)}%`;
}

export default function Checkout({
    planSlug,
    plan,
    paymentFeeRate,
    cryptoWallets,
}: Props) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
    const [promoStatus, setPromoStatus] = useState<PromoStatus>('idle');
    const [promoMessage, setPromoMessage] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);

    const { data, setData, post, processing, errors } = useForm<CheckoutForm>({
        plan: planSlug,
        email: '',
        firstName: '',
        lastName: '',
        country: '',
        additionalInfo: '',
        paymentMethod: 'stripe',
        promoCode: '',
    });

    const launchDiscount = plan.old_amount - plan.amount;
    const payableAmount = Math.max(0, plan.amount - couponDiscount);
    const extraFee = getExtraFee(payableAmount, paymentMethod, paymentFeeRate);
    const total = getTotalWithFee(payableAmount, paymentMethod, paymentFeeRate);
    const feePercent = paymentFeeRate * 100;

    const handleMethodChange = (m: PaymentMethod) => {
        setPaymentMethod(m);
        setData('paymentMethod', m);
    };

    const resetPromo = (code: string) => {
        setData('promoCode', code);
        setPromoStatus('idle');
        setPromoMessage('');
        setCouponDiscount(0);
    };

    const applyPromo = async () => {
        const code = data.promoCode.trim();

        if (!code) {
            return;
        }

        setPromoStatus('checking');
        setPromoMessage('');

        try {
            const response = await fetch(
                `/api/coupons/validate?code=${encodeURIComponent(code)}&plan=${planSlug}`,
                { headers: { Accept: 'application/json' } },
            );
            const json = (await response.json()) as {
                valid?: boolean;
                code?: string;
                discount?: number;
                message?: string;
            };

            if (!response.ok || !json.valid) {
                setCouponDiscount(0);
                setPromoStatus('invalid');
                setPromoMessage(json.message ?? 'Coupon code is not valid.');

                return;
            }

            setData('promoCode', json.code ?? code);
            setCouponDiscount(Number(json.discount) || 0);
            setPromoStatus('applied');
            setPromoMessage(
                `Coupon applied: -$${formatMoney(Number(json.discount) || 0)}.`,
            );
        } catch {
            setCouponDiscount(0);
            setPromoStatus('invalid');
            setPromoMessage('Could not reach coupon service. Try again.');
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (paymentMethod !== 'stripe') {
            return;
        }

        post('/checkout');
    };

    return (
        <>
            <Head title={`Checkout — ${plan.name}`} />
            <Header />
            <main className="flex-1 bg-black text-white">
                <section
                    className="py-14 md:py-20"
                    style={{ paddingTop: 'calc(var(--header-h) + 50px)' }}
                >
                    <div className="container-x">
                        <p className="eyebrow">Checkout</p>
                        <h1 className="section-title mt-3">
                            Complete Your Order
                        </h1>
                        <p className="section-subtitle mt-3">
                            You&apos;re seconds away from automated XAUUSD &amp;
                            BTCUSD trading on MT5. License keys and download
                            links are emailed instantly.
                        </p>
                    </div>
                </section>

                <section className="py-14">
                    <div className="container-x grid items-start gap-10 lg:grid-cols-[1.3fr_0.9fr]">
                        <form
                            onSubmit={submit}
                            className="space-y-8 rounded-2xl border border-white/10 bg-card p-6 md:p-8"
                        >
                            <fieldset className="space-y-5">
                                <legend className="font-display text-lg font-bold text-white">
                                    Billing Details
                                </legend>
                                <Field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(v) => setData('email', v)}
                                    error={errors.email}
                                />
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="First name"
                                        name="firstName"
                                        required
                                        value={data.firstName}
                                        onChange={(v) =>
                                            setData('firstName', v)
                                        }
                                        error={errors.firstName}
                                    />
                                    <Field
                                        label="Last name"
                                        name="lastName"
                                        required
                                        value={data.lastName}
                                        onChange={(v) => setData('lastName', v)}
                                        error={errors.lastName}
                                    />
                                </div>
                                <Field
                                    label="Country / Region"
                                    name="country"
                                    required
                                    value={data.country}
                                    onChange={(v) => setData('country', v)}
                                    error={errors.country}
                                />
                                <Field
                                    label="Additional information"
                                    name="additionalInfo"
                                    type="textarea"
                                    optional
                                    placeholder="Anything we should know about your order? (optional)"
                                    value={data.additionalInfo}
                                    onChange={(v) =>
                                        setData('additionalInfo', v)
                                    }
                                    error={errors.additionalInfo}
                                />
                            </fieldset>

                            <fieldset className="space-y-3">
                                <legend className="mb-2 font-display text-lg font-bold text-white">
                                    Promo / Coupon Code
                                </legend>
                                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <input
                                            name="promoCode"
                                            value={data.promoCode}
                                            onChange={(e) =>
                                                resetPromo(e.target.value)
                                            }
                                            placeholder="Enter your promo or coupon code"
                                            className="min-w-[220px] flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-shape focus:bg-white/[0.06] focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={applyPromo}
                                            disabled={
                                                data.promoCode.trim().length ===
                                                    0 ||
                                                promoStatus === 'checking'
                                            }
                                            className="btn-ghost disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {promoStatus === 'checking'
                                                ? 'Checking...'
                                                : 'Apply'}
                                        </button>
                                    </div>
                                    <p
                                        className={`mt-2 text-xs ${
                                            promoStatus === 'applied'
                                                ? 'text-green-100'
                                                : promoStatus === 'invalid'
                                                  ? 'text-red-100'
                                                  : 'text-white/60'
                                        }`}
                                    >
                                        {promoMessage ||
                                            'Have a code? Apply it before completing payment.'}
                                    </p>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-3">
                                <legend className="mb-2 font-display text-lg font-bold text-white">
                                    Payment Method
                                </legend>
                                <PaymentOptions
                                    amount={payableAmount}
                                    productName={plan.name}
                                    planSlug={planSlug}
                                    method={paymentMethod}
                                    onMethodChange={handleMethodChange}
                                    feeRate={paymentFeeRate}
                                    processing={processing}
                                    cryptoWallets={cryptoWallets}
                                />
                            </fieldset>
                        </form>

                        <aside className="rounded-2xl border border-white/10 bg-card p-6 lg:sticky lg:top-24">
                            <h2 className="mb-5 font-display text-lg font-bold text-white">
                                Order Summary
                            </h2>
                            <div className="flex gap-4">
                                <div className="h-16 w-16 shrink-0 rounded-lg border border-white/10 bg-black/40 p-1.5">
                                    <img
                                        src="/img/tradivo-package.jpeg"
                                        alt=""
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-display text-sm leading-snug font-bold text-white">
                                        {plan.name}
                                    </div>
                                    <div className="mt-1 text-xs text-white/65">
                                        {plan.subtitle}
                                    </div>
                                </div>
                                <div className="ml-auto font-display font-bold text-white">
                                    ${formatMoney(plan.amount)}
                                </div>
                            </div>

                            <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-white/65">Subtotal</dt>
                                    <dd className="font-display font-semibold text-white">
                                        ${formatMoney(plan.old_amount)}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-white/65">
                                        Launch discount
                                    </dt>
                                    <dd className="font-display font-semibold text-success">
                                        - ${formatMoney(launchDiscount)}
                                    </dd>
                                </div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between">
                                        <dt className="text-white/65">
                                            Coupon discount
                                        </dt>
                                        <dd className="font-display font-semibold text-success">
                                            - ${formatMoney(couponDiscount)}
                                        </dd>
                                    </div>
                                )}
                                {hasExtraFee(paymentMethod) && (
                                    <div className="flex justify-between">
                                        <dt className="text-white/65">
                                            Payment fee (
                                            {formatPercent(feePercent)})
                                        </dt>
                                        <dd className="font-display font-semibold text-white">
                                            ${formatMoney(extraFee)}
                                        </dd>
                                    </div>
                                )}
                                <div className="flex justify-between border-t border-white/10 pt-3 text-base">
                                    <dt className="font-display font-bold text-white">
                                        Total
                                    </dt>
                                    <dd className="font-display text-xl font-extrabold text-shape">
                                        ${formatMoney(total)}
                                    </dd>
                                </div>
                            </dl>

                            <ul className="mt-6 space-y-2 text-xs text-white/65">
                                <li>Instant email delivery</li>
                                <li>MT5 build + .set files included</li>
                                <li>Lifetime updates</li>
                                <li>Setup video + PDF guide</li>
                            </ul>

                            <p className="mt-6 text-xs text-white/65">
                                Need help?{' '}
                                <Link
                                    href="mailto:info@tradivofx.com"
                                    className="font-semibold text-shape hover:opacity-80"
                                >
                                    info@tradivofx.com
                                </Link>
                            </p>
                        </aside>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}

function Field({
    label,
    name,
    type = 'text',
    required = false,
    optional = false,
    placeholder,
    value,
    onChange,
    error,
}: {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'textarea';
    required?: boolean;
    optional?: boolean;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    const sharedClass =
        'w-full rounded-lg bg-white/[0.04] border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-shape focus:bg-white/[0.06]';

    return (
        <label className="block">
            <span className="mb-2 flex items-baseline gap-2 font-display text-xs font-semibold tracking-widest text-white/60 uppercase">
                <span>{label}</span>
                {required && <span className="text-shape">*</span>}
                {optional && (
                    <span className="font-normal tracking-normal text-white/40 normal-case">
                        (optional)
                    </span>
                )}
            </span>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    rows={3}
                    placeholder={placeholder}
                    className={sharedClass}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    className={sharedClass}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
        </label>
    );
}
