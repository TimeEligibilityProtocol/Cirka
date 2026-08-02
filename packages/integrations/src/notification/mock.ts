import {
  NotificationProvider,
  SendClaimParams,
  SendNotificationParams,
  WayToYouClaimNotifier,
} from "./types.js";

export class MockNotificationProvider implements NotificationProvider {
  async send(_params: SendNotificationParams) {
    return { delivered: true };
  }
}

export class MockWayToYouClaimNotifier implements WayToYouClaimNotifier {
  async sendClaim(params: SendClaimParams) {
    return { deliveryAttemptId: `mock_delivery_${params.channel}` };
  }
}
