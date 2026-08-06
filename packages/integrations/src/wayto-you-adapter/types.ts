/**
 * Thin adapter over wayto.you's public API. See NOTICE.md in this
 * directory — the two-sided security gate behind `checkTransactionSecurity`
 * is Quanthio's protected TEP/PRP IP and is consumed only as a neutral
 * result. This file must never contain scoring logic, formulas, or
 * calibration parameters.
 */

export type ClaimChannel = "email" | "whatsapp";

export type SecurityVerdict = "allow" | "step_up" | "manual_review";

export interface SecurityCheckParams {
  role: "payer" | "payee";
  orderId: string;
  amountMinor: number;
  currency: string;
  counterpartyIdentityRef: string;
}

export interface SecurityCheckResult {
  verdict: SecurityVerdict;
  reason: string | null;
}

export interface RequestPayoutClaimParams {
  orderId: string;
  sellerVerifiedIdentityRef: string; // wayto.you identity reference, not an IBAN/card
  amountMinor: number;
  currency: string;
  channel: ClaimChannel;
}

export type ClaimStatus =
  | "claim_sent"
  | "delivered"
  | "opened"
  | "destination_confirmed"
  | "payout_in_progress"
  | "paid_out"
  | "expired";

export interface RequestPayoutClaimResult {
  claimId: string;
  status: ClaimStatus;
}

/**
 * Identity-addressed payout routing, claim flow and two-sided security.
 * Cirka never receives a wallet balance, full IBAN, or card data —
 * only opaque identity references and neutral status/verdict values.
 */
export interface WayToYouRoutingProvider {
  /**
   * Fail-open by convention: if this call errors, the caller (apps/api)
   * must treat it as an integration error, not as a business decision —
   * never silently block an honest payment because wayto.you is unreachable.
   */
  checkTransactionSecurity(params: SecurityCheckParams): Promise<SecurityCheckResult>;
  requestPayoutClaim(params: RequestPayoutClaimParams): Promise<RequestPayoutClaimResult>;
  getClaimStatus(claimId: string): Promise<ClaimStatus>;
}
