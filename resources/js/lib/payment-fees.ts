export const EXTRA_FEE_RATE = 0.05;

export const FEE_METHODS = ['stripe', 'skrill', 'payoneer'] as const;

export type FeeMethod = (typeof FEE_METHODS)[number];

export type PaymentMethod = FeeMethod | 'crypto';

export type FeeRates = Record<FeeMethod, number>;

export const DEFAULT_FEE_RATES: FeeRates = {
    stripe: EXTRA_FEE_RATE,
    skrill: EXTRA_FEE_RATE,
    payoneer: EXTRA_FEE_RATE,
};

export function hasExtraFee(method: PaymentMethod) {
    return FEE_METHODS.includes(method as FeeMethod);
}

export function getRate(rates: FeeRates, method: PaymentMethod): number {
    return hasExtraFee(method) ? (rates[method as FeeMethod] ?? 0) : 0;
}

function roundMoney(amount: number) {
    return Math.round(amount * 100) / 100;
}

export function getExtraFee(
    amount: number,
    method: PaymentMethod,
    rates: FeeRates = DEFAULT_FEE_RATES,
) {
    return hasExtraFee(method)
        ? roundMoney(amount * getRate(rates, method))
        : 0;
}

export function getTotalWithFee(
    amount: number,
    method: PaymentMethod,
    rates: FeeRates = DEFAULT_FEE_RATES,
) {
    return roundMoney(amount + getExtraFee(amount, method, rates));
}

export function formatMoney(amount: number) {
    return amount.toFixed(2);
}
