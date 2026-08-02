export interface SettlementCapabilities {
  delayedSplitAfterDelivery: boolean;
  supportsRefund: boolean;
  supportsRefundWithoutReturn: boolean;
}

export interface SplitPaymentParams {
  paymentId: string;
  orderId: string;
  sellerPayoutMinor: number;
  platformCommissionMinor: number;
}

export interface RefundPaymentParams {
  paymentId: string;
  amountMinor: number;
  reason: string;
  requiresReturn: boolean;
}

export type SellerOnboardingStatus = "not_started" | "pending" | "approved" | "rejected";

/** Regulated hold/delayed split, payout and refund. Never merged with PaymentCollectionProvider. */
export interface SettlementProvider {
  getCapabilities(): Promise<SettlementCapabilities>;
  onboardSeller(sellerId: string): Promise<{ status: SellerOnboardingStatus; providerReference: string | null }>;
  getSellerOnboardingStatus(sellerId: string): Promise<SellerOnboardingStatus>;
  /** Holds funds until the dispute window closes / item is accepted. No-op returns void, real holds are provider-side. */
  holdOrDelaySettlement(paymentId: string): Promise<void>;
  splitPayment(params: SplitPaymentParams): Promise<{ payoutId: string }>;
  releasePayout(payoutId: string): Promise<void>;
  refundPayment(params: RefundPaymentParams): Promise<{ refundId: string }>;
}
