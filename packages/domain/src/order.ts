import { Money } from "./money.js";

/**
 * Payment, delivery, dispute and payout progress are tracked as separate
 * fields on the order — never collapsed into a single status column.
 * See spec section 24.
 */
export type OrderPaymentStatus =
  | "created"
  | "pending"
  | "paid"
  | "failed"
  | "settlement_held"
  | "ready_for_split"
  | "refund_pending"
  | "refunded";

export type OrderDeliveryStatus =
  | "awaiting_courier"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed_delivery"
  | "personal_pickup_pending"
  | "personal_pickup_confirmed";

export type OrderDisputeStatus = "none" | "window_open" | "dispute_opened" | "resolved";

export type OrderPayoutStatus =
  | "not_started"
  | "payout_pending"
  | "claim_sent"
  | "destination_confirmed"
  | "payout_in_progress"
  | "paid_out";

export const DISPUTE_WINDOW_DAYS_DEFAULT = 3;

export interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  tenantId: string;
  priceAtOrder: Money; // snapshot — never changes after listing edits
  commissionBpsAtOrder: number; // snapshot
  paymentStatus: OrderPaymentStatus;
  deliveryStatus: OrderDeliveryStatus;
  disputeStatus: OrderDisputeStatus;
  payoutStatus: OrderPayoutStatus;
  createdAt: string;
  disputeWindowExpiresAt: string | null;
}
