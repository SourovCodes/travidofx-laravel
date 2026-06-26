import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    TelegramIcon,
    WhatsAppIcon,
} from '@/components/FloatingContactButtons';
import {
    DEFAULT_FEE_RATES,
    formatMoney,
    getExtraFee,
    getRate,
    getTotalWithFee,
    hasExtraFee,
} from '@/lib/payment-fees';
import type { FeeRates, PaymentMethod } from '@/lib/payment-fees';

export type CryptoWallet = {
    key: string;
    asset: string;
    network: string;
    address: string;
};

function formatPercent(value: number) {
    return Number.isInteger(value) ? `${value}%` : `${value.toFixed(2)}%`;
}

function whatsappLink(url: string, message: string) {
    return `${url}?text=${encodeURIComponent(message)}`;
}

function cryptoSubtitle(wallets: CryptoWallet[]) {
    if (wallets.length === 0) {
        return 'Currently unavailable';
    }

    const labels = wallets.map((w) =>
        w.network ? `${w.asset} (${w.network})` : w.asset,
    );

    return labels.length <= 3
        ? labels.join(', ')
        : `${labels.slice(0, 3).join(', ')} + ${labels.length - 3} more`;
}

export default function PaymentOptions({
    amount,
    productName,
    planSlug,
    method,
    onMethodChange,
    feeRates = DEFAULT_FEE_RATES,
    processing = false,
    cryptoWallets = [],
}: {
    amount: number;
    productName: string;
    planSlug: string;
    method: PaymentMethod;
    onMethodChange: (method: PaymentMethod) => void;
    feeRates?: FeeRates;
    processing?: boolean;
    cryptoWallets?: CryptoWallet[];
}) {
    const { contact } = usePage().props;
    const [coinKey, setCoinKey] = useState<string>(
        cryptoWallets[0]?.key ?? '',
    );
    const activeCoin =
        cryptoWallets.find((c) => c.key === coinKey) ?? cryptoWallets[0];
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
                value="crypto"
                method={method}
                onChange={onMethodChange}
                title="Crypto"
                subtitle={cryptoSubtitle(cryptoWallets)}
                trailing={
                    cryptoWallets.length > 0 ? (
                        <span className="font-display text-[11px] font-bold tracking-widest text-shape uppercase">
                            {cryptoWallets.length}{' '}
                            {cryptoWallets.length === 1
                                ? 'network'
                                : 'networks'}
                        </span>
                    ) : null
                }
            >
                {method === 'crypto' && activeCoin && (
                    <CryptoPaymentBlock
                        amount={amount}
                        productName={productName}
                        wallets={cryptoWallets}
                        activeWallet={activeCoin}
                        onWalletChange={setCoinKey}
                        whatsappUrl={contact.whatsapp.url}
                        telegramUrl={contact.telegram.url}
                    />
                )}
                {method === 'crypto' && !activeCoin && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                        Crypto payments are temporarily unavailable. Please
                        choose another payment method or contact us on WhatsApp
                        or Telegram.
                    </div>
                )}
            </MethodRow>

            <MethodRow
                value="skrill"
                method={method}
                onChange={onMethodChange}
                title="Skrill / Neteller"
                subtitle={`${labelFor('skrill')} processing fee applies`}
            >
                {method === 'skrill' && (
                    <ContactBlock
                        whatsappUrl={contact.whatsapp.url}
                        telegramUrl={contact.telegram.url}
                        message={`Hi! I'd like to pay for ${productName} ($${formatMoney(total)}, including a ${feePercentLabel} payment fee of $${formatMoney(fee)}) via Skrill or Neteller. Please share the account details.`}
                        note={`Reach out on WhatsApp or Telegram and we'll send you the Skrill / Neteller account to transfer to. Total due is $${formatMoney(total)}, including a ${feePercentLabel} payment fee.`}
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
                        whatsappUrl={contact.whatsapp.url}
                        telegramUrl={contact.telegram.url}
                        message={`Hi! I'd like to pay for ${productName} ($${formatMoney(total)}, including a ${feePercentLabel} payment fee of $${formatMoney(fee)}) via Payoneer or Wise. Please share the account details.`}
                        note={`Reach out on WhatsApp or Telegram and we'll send you the Payoneer / Wise account to transfer to. Total due is $${formatMoney(total)}, including a ${feePercentLabel} payment fee.`}
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

function CryptoPaymentBlock({
    amount,
    productName,
    wallets,
    activeWallet,
    onWalletChange,
    whatsappUrl,
    telegramUrl,
}: {
    amount: number;
    productName: string;
    wallets: CryptoWallet[];
    activeWallet: CryptoWallet;
    onWalletChange: (key: string) => void;
    whatsappUrl: string;
    telegramUrl: string;
}) {
    const proofMessage = `Hi! I've paid for ${productName} ($${formatMoney(amount)}) using ${activeWallet.asset} on ${activeWallet.network}. Transaction hash: `;

    return (
        <div className="mt-4 space-y-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="grid grid-cols-2 gap-2">
                {wallets.map((wallet) => (
                    <button
                        key={wallet.key}
                        type="button"
                        onClick={() => onWalletChange(wallet.key)}
                        className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                            activeWallet.key === wallet.key
                                ? 'border-shape bg-shape/10'
                                : 'border-white/10 bg-white/[0.03] hover:border-shape/40'
                        }`}
                    >
                        <div className="font-display text-sm font-bold text-white">
                            {wallet.asset}
                        </div>
                        <div className="text-[11px] text-white/60">
                            {wallet.network}
                        </div>
                    </button>
                ))}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5">
                <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-[11px] font-bold tracking-widest text-white/60 uppercase">
                        Send exactly
                    </span>
                    <span className="font-display text-base font-extrabold text-white">
                        ${formatMoney(amount)} in {activeWallet.asset}
                    </span>
                </div>
                <div className="mt-2 font-display text-[11px] font-bold tracking-widest text-white/60 uppercase">
                    {activeWallet.network} address
                </div>
                <AddressRow address={activeWallet.address} />
                <p className="mt-3 text-[12px] leading-relaxed text-white/65">
                    After sending, share the transaction hash so we can activate
                    your license.
                </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
                <a
                    href={whatsappLink(whatsappUrl, proofMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 !py-3.5 text-sm"
                >
                    <WhatsAppIcon />
                    Send Proof on WhatsApp
                </a>
                <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#229ED9]/60 bg-[#229ED9]/15 px-6 py-3.5 font-display text-sm font-bold text-white transition-colors hover:bg-[#229ED9]/25"
                >
                    <TelegramIcon />
                    Send Proof on Telegram
                </a>
            </div>
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

function AddressRow({ address }: { address: string }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            /* Clipboard is unavailable in some browser contexts. */
        }
    };

    return (
        <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2">
            <code className="flex-1 truncate font-mono text-[12px] text-white">
                {address}
            </code>
            <button
                type="button"
                onClick={copy}
                className="shrink-0 font-display text-[11px] font-bold tracking-widest text-shape uppercase hover:opacity-80"
            >
                {copied ? 'Copied' : 'Copy'}
            </button>
        </div>
    );
}

function ContactBlock({
    whatsappUrl,
    telegramUrl,
    message,
    note,
}: {
    whatsappUrl: string;
    telegramUrl: string;
    message: string;
    note: string;
}) {
    return (
        <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-[13px] leading-relaxed text-white/70">{note}</p>
            <div className="grid gap-2 sm:grid-cols-2">
                <a
                    href={whatsappLink(whatsappUrl, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 !py-3.5 text-sm"
                >
                    <WhatsAppIcon />
                    Contact on WhatsApp
                </a>
                <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#229ED9]/60 bg-[#229ED9]/15 px-6 py-3.5 font-display text-sm font-bold text-white transition-colors hover:bg-[#229ED9]/25"
                >
                    <TelegramIcon />
                    Contact on Telegram
                </a>
            </div>
        </div>
    );
}
