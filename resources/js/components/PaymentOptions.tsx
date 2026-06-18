import {
    DEFAULT_FEE_RATES,
    formatMoney,
    getExtraFee,
    getRate,
    getTotalWithFee,
    hasExtraFee,
} from '@/lib/payment-fees';
import type { FeeRates, PaymentMethod } from '@/lib/payment-fees';

const WHATSAPP_NUMBER = '14075617294';

function formatPercent(value: number) {
    return Number.isInteger(value) ? `${value}%` : `${value.toFixed(2)}%`;
}

function waLink(message: string) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function PaymentOptions({
    amount,
    productName,
    planSlug,
    method,
    onMethodChange,
    feeRates = DEFAULT_FEE_RATES,
    processing = false,
}: {
    amount: number;
    productName: string;
    planSlug: string;
    method: PaymentMethod;
    onMethodChange: (method: PaymentMethod) => void;
    feeRates?: FeeRates;
    processing?: boolean;
}) {
    const fee = getExtraFee(amount, method, feeRates);
    const total = getTotalWithFee(amount, method, feeRates);
    const feePercentLabel = formatPercent(getRate(feeRates, method) * 100);
    const labelFor = (m: PaymentMethod) =>
        formatPercent(getRate(feeRates, m) * 100);

    return (
        <div className="space-y-3">
            <input type="hidden" name="plan" value={planSlug} />
            <input type="hidden" name="paymentMethod" value={method} />

            <MethodRow
                value="stripe"
                method={method}
                onChange={onMethodChange}
                title="Credit / Debit Card"
                subtitle={`${labelFor('stripe')} processing fee applies`}
                trailing={
                    <span className="hidden gap-1.5 font-display text-[10px] font-bold tracking-widest uppercase sm:inline-flex">
                        <span className="rounded bg-[#1A1F71] px-2 py-1 text-white">
                            Visa
                        </span>
                        <span className="rounded bg-[#EB001B] px-2 py-1 text-white">
                            MC
                        </span>
                        <span className="rounded bg-[#2E77BB] px-2 py-1 text-white">
                            Amex
                        </span>
                    </span>
                }
            />

            <MethodRow
                value="skrill"
                method={method}
                onChange={onMethodChange}
                title="Skrill / Neteller"
                subtitle={`${labelFor('skrill')} processing fee applies`}
            >
                {method === 'skrill' && (
                    <ContactBlock
                        message={`Hi! I'd like to pay for ${productName} ($${formatMoney(total)}, including a ${feePercentLabel} payment fee of $${formatMoney(fee)}) via Skrill or Neteller. Please share the account details.`}
                        note={`Reach out on WhatsApp and we'll send you the Skrill / Neteller account to transfer to. Total due is $${formatMoney(total)}, including a ${feePercentLabel} payment fee.`}
                    />
                )}
            </MethodRow>

            <MethodRow
                value="payoneer"
                method={method}
                onChange={onMethodChange}
                title="Payoneer / Wise"
                subtitle={`${labelFor('payoneer')} processing fee applies`}
            >
                {method === 'payoneer' && (
                    <ContactBlock
                        message={`Hi! I'd like to pay for ${productName} ($${formatMoney(total)}, including a ${feePercentLabel} payment fee of $${formatMoney(fee)}) via Payoneer or Wise. Please share the account details.`}
                        note={`Reach out on WhatsApp and we'll send you the Payoneer / Wise account to transfer to. Total due is $${formatMoney(total)}, including a ${feePercentLabel} payment fee.`}
                    />
                )}
            </MethodRow>

            {hasExtraFee(method) && (
                <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm">
                    <div className="flex justify-between gap-4 text-white/70">
                        <span>Payment fee ({feePercentLabel})</span>
                        <span className="font-display font-semibold text-white">
                            ${formatMoney(fee)}
                        </span>
                    </div>
                    <div className="mt-1 flex justify-between gap-4 text-white">
                        <span className="font-display font-bold">
                            Payable total
                        </span>
                        <span className="font-display font-extrabold text-shape">
                            ${formatMoney(total)}
                        </span>
                    </div>
                </div>
            )}

            {method === 'stripe' && (
                <>
                    <p className="pt-2 text-xs leading-relaxed text-white/60">
                        Your card payment is securely processed by Stripe. We
                        never see or store card details.
                    </p>
                    <div className="mt-3 flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="2"
                            className="mt-0.5 shrink-0"
                            aria-hidden
                        >
                            <path
                                d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="text-[13px] leading-snug text-amber-100">
                            <span className="font-display font-bold">
                                Please review carefully before payment
                            </span>
                            , as all purchases are non-refundable.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="btn-primary mt-4 w-full !py-4 text-base"
                        disabled={processing}
                    >
                        {processing
                            ? 'Redirecting...'
                            : `Pay $${formatMoney(total)} with Stripe`}
                    </button>
                </>
            )}
        </div>
    );
}

function MethodRow({
    value,
    method,
    onChange,
    title,
    subtitle,
    trailing,
    children,
}: {
    value: PaymentMethod;
    method: PaymentMethod;
    onChange: (m: PaymentMethod) => void;
    title: string;
    subtitle?: string;
    trailing?: React.ReactNode;
    children?: React.ReactNode;
}) {
    const active = method === value;

    return (
        <div
            className={`rounded-xl border transition-colors ${
                active
                    ? 'border-shape/50 bg-shape/[0.06]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            }`}
        >
            <label className="flex cursor-pointer items-center gap-3 px-4 py-4">
                <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={active}
                    onChange={() => onChange(value)}
                    className="accent-shape"
                />
                <span className="min-w-0 flex-1">
                    <span className="block font-display font-semibold text-white">
                        {title}
                    </span>
                    {subtitle && (
                        <span className="mt-0.5 block text-xs text-white/60">
                            {subtitle}
                        </span>
                    )}
                </span>
                {trailing}
            </label>
            {children && <div className="px-4 pb-4">{children}</div>}
        </div>
    );
}

function ContactBlock({ message, note }: { message: string; note: string }) {
    return (
        <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-[13px] leading-relaxed text-white/70">{note}</p>
            <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex w-full items-center justify-center gap-2 !py-3.5 text-sm"
            >
                <WhatsAppIcon />
                Contact us on WhatsApp
            </a>
        </div>
    );
}

function WhatsAppIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
        >
            <path d="M20.52 3.48A11.83 11.83 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.47-8.41Zm-8.48 18.36h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.62-.24-.37a9.86 9.86 0 0 1-1.51-5.3c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.04 7.01 2.9a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.9-9.95 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        </svg>
    );
}
