/**
 * All monetary amounts are integers in the currency's smallest unit
 * (e.g. fils for AED), never floats. See spec section 13/24.
 */
export type MinorAmount = number;

export interface Money {
  amountMinor: MinorAmount;
  currency: "AED" | "USD";
}

export const COMMISSION_BPS_DEFAULT = 1000; // 10%

export function commissionMinor(amountMinor: MinorAmount, bps: number): MinorAmount {
  return Math.round((amountMinor * bps) / 10000);
}

export function sellerPayoutMinor(amountMinor: MinorAmount, bps: number): MinorAmount {
  return amountMinor - commissionMinor(amountMinor, bps);
}
