import { NeutralPaymentStatus, PaymentRail } from "@wearto-you/domain";

/** Buyer-side payment collection only. Never merged with SettlementProvider. */
export interface PaymentCollectionCapabilities {
  rail: PaymentRail;
  methods: Array<"card" | "apple_pay" | "google_pay" | "bank">;
}

export interface CreatePaymentParams {
  orderId: string;
  amountMinor: number;
  currency: string;
  idempotencyKey: string;
}

export interface CreatePaymentResult {
  paymentId: string;
  providerReference: string; // opaque provider ID, never interpreted outside this adapter
  checkoutUrl: string | null;
}

export interface WebhookEvent {
  paymentId: string;
  providerReference: string;
  status: NeutralPaymentStatus;
}

export interface PaymentCollectionProvider {
  getCapabilities(): Promise<PaymentCollectionCapabilities>;
  createPayment(params: CreatePaymentParams): Promise<CreatePaymentResult>;
  getPaymentStatus(paymentId: string): Promise<NeutralPaymentStatus>;
  /** Verifies signature and returns a neutral event, or null if the payload doesn't verify. */
  verifyWebhook(rawBody: string, headers: Record<string, string>): Promise<WebhookEvent | null>;
}
