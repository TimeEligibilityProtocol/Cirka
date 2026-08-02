/**
 * Neutral payment/payout model. Provider-specific IDs and statuses (Tap,
 * Lean) are stored as opaque references and never leak outside the
 * relevant adapter in packages/integrations.
 */
export type PaymentRail = "tap" | "lean";

export type NeutralPaymentStatus =
  | "created"
  | "pending"
  | "paid"
  | "failed"
  | "settlement_held"
  | "ready_for_split"
  | "payout_pending"
  | "paid_out"
  | "refund_pending"
  | "refunded"
  | "disputed";

export interface Payment {
  id: string;
  orderId: string;
  rail: PaymentRail;
  providerReference: string; // opaque — Tap/Lean's own ID, never interpreted by domain logic
  status: NeutralPaymentStatus;
  idempotencyKey: string;
  createdAt: string;
}

export type ChargebackStatus =
  | "card_dispute_opened"
  | "evidence_required"
  | "evidence_submitted"
  | "under_review"
  | "won"
  | "lost"
  | "dispute_released"
  | "chargeback_debited";

export interface Chargeback {
  id: string;
  paymentId: string;
  orderId: string;
  status: ChargebackStatus;
  createdAt: string;
  updatedAt: string;
}
