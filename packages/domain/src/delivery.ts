import { DeliveryMethod } from "./order.js";

export const FREE_COURIER_DELIVERY_THRESHOLD_MINOR = 30000; // AED 300
export const COURIER_DELIVERY_FEE_MINOR = 1500; // AED 15

export interface DeliveryOption {
  id: DeliveryMethod;
  label: string;
  detail: string;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "courier", label: "Courier delivery", detail: "2–3 days" },
  { id: "pickup", label: "Personal pickup", detail: "Dubai · QR handoff on collection" },
];

/** The server is authoritative for this — clients may show it as an estimate before submitting. */
export function computeDeliveryFeeMinor(method: DeliveryMethod, itemPriceMinor: number): number {
  if (method === "pickup") return 0;
  return itemPriceMinor >= FREE_COURIER_DELIVERY_THRESHOLD_MINOR ? 0 : COURIER_DELIVERY_FEE_MINOR;
}
