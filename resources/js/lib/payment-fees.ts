export const EXTRA_FEE_RATE = 0.05;

export const FEE_METHODS = ['stripe', 'skrill', 'payoneer'] as const;

export type FeeMethod = (typeof FEE_METHODS)[number];

export type PaymentMethod = FeeMethod | 'crypto';

export function hasExtraFee(method: PaymentMethod) {
    return FEE_METHODS.includes(method as FeeMethod);
}

function roundMoney(amount: number) {
    return Math.round(amount * 100) / 100;
}

export function getExtraFee(
    amount: number,
    method: PaymentMethod,
    feeRate = EXTRA_FEE_RATE,
) {
    return hasExtraFee(method) ? roundMoney(amount * feeRate) : 0;
}

export function getTotalWithFee(
    amount: number,
    method: PaymentMethod,
    feeRate = EXTRA_FEE_RATE,
) {
    return roundMoney(amount + getExtraFee(amount, method, feeRate));
}

export function formatMoney(amount: number) {
    return amount.toFixed(2);
}
