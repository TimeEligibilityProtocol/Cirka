import { NeutralPaymentStatus } from "@wearto-you/domain";
import {
  CreatePaymentParams,
  CreatePaymentResult,
  PaymentCollectionCapabilities,
  PaymentCollectionProvider,
  WebhookEvent,
} from "./types.js";

/** In-memory mock — used in tests and local dev when no real payment rail is configured. */
export class MockPaymentCollectionProvider implements PaymentCollectionProvider {
  private statuses = new Map<string, NeutralPaymentStatus>();

  async getCapabilities(): Promise<PaymentCollectionCapabilities> {
    return { rail: "tap", methods: ["card"] };
  }

  async createPayment(params: CreatePaymentParams): Promise<CreatePaymentResult> {
    const paymentId = `mock_pay_${params.orderId}`;
    this.statuses.set(paymentId, "pending");
    return { paymentId, providerReference: `mock_ref_${paymentId}`, checkoutUrl: null };
  }

  async getPaymentStatus(paymentId: string): Promise<NeutralPaymentStatus> {
    return this.statuses.get(paymentId) ?? "created";
  }

  async verifyWebhook(): Promise<WebhookEvent | null> {
    return null;
  }
}
