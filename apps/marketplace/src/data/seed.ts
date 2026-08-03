import { Money } from "@wearto-you/domain";

export function aed(amountInAed: number): Money {
  return { amountMinor: Math.round(amountInAed * 100), currency: "AED" };
}

export function formatMoney(money: Money): string {
  return `AED ${(money.amountMinor / 100).toLocaleString("en-AE", { minimumFractionDigits: 0 })}`;
}
