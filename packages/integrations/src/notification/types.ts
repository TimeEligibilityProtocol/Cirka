import { ClaimChannel } from "../wayto-you-adapter/types.js";

export type NotificationChannel = "in_app" | "web_push" | "email";

export interface SendNotificationParams {
  userId: string;
  channel: NotificationChannel;
  template: string;
  data: Record<string, string | number>;
}

/** In-app/web push/email for marketplace events (offers, messages, order status). */
export interface NotificationProvider {
  send(params: SendNotificationParams): Promise<{ delivered: boolean }>;
}

export interface SendClaimParams {
  sellerId: string;
  channel: ClaimChannel;
  claimUrl: string;
}

/**
 * Separate from NotificationProvider: the wayto.you payout claim link is a
 * transactional/legal message with its own consent, verified-address and
 * delivery tracking (spec section on "Claim e-mail albo WhatsApp").
 */
export interface WayToYouClaimNotifier {
  sendClaim(params: SendClaimParams): Promise<{ deliveryAttemptId: string }>;
}
