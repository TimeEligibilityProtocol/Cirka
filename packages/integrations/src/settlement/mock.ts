import {
  RefundPaymentParams,
  SellerOnboardingStatus,
  SettlementCapabilities,
  SettlementProvider,
  SplitPaymentParams,
} from "./types.js";

export class MockSettlementProvider implements SettlementProvider {
  async getCapabilities(): Promise<SettlementCapabilities> {
    return { delayedSplitAfterDelivery: true, supportsRefund: true, supportsRefundWithoutReturn: true };
  }

  async onboardSeller(): Promise<{ status: SellerOnboardingStatus; providerReference: string | null }> {
    return { status: "approved", providerReference: "mock_seller_ref" };
  }

  async getSellerOnboardingStatus(): Promise<SellerOnboardingStatus> {
    return "approved";
  }

  async holdOrDelaySettlement(): Promise<void> {}

  async splitPayment(params: SplitPaymentParams): Promise<{ payoutId: string }> {
    return { payoutId: `mock_payout_${params.orderId}` };
  }

  async releasePayout(): Promise<void> {}

  async refundPayment(params: RefundPaymentParams): Promise<{ refundId: string }> {
    return { refundId: `mock_refund_${params.paymentId}` };
  }
}
