import {
  CourierProvider,
  MockCourierProvider,
  MockNotificationProvider,
  MockPaymentCollectionProvider,
  MockSettlementProvider,
  MockWayToYouRoutingProvider,
  NotificationProvider,
  PaymentCollectionProvider,
  SettlementProvider,
  WayToYouRoutingProvider,
} from "@wearto-you/integrations";
import { Env } from "../config/env.js";

export interface Providers {
  paymentCollection: PaymentCollectionProvider;
  settlement: SettlementProvider;
  wayToYou: WayToYouRoutingProvider;
  courier: CourierProvider;
  notification: NotificationProvider;
}

/**
 * Missing capability at runtime blocks the relevant flow with an
 * admin-visible config error — it must never silently fall back to a
 * manual transfer. In Step 0, only "mock" is wired; "tap"/"lean" throw
 * until their adapters land (see packages/integrations/src/tap,
 * packages/integrations/src/lean).
 */
export function buildProviders(env: Env): Providers {
  if (env.checkoutRail !== "mock") {
    throw new Error(`checkoutRail "${env.checkoutRail}" has no adapter yet — see packages/integrations/src/tap`);
  }
  if (env.settlementProvider !== "mock") {
    throw new Error(`settlementProvider "${env.settlementProvider}" has no adapter yet`);
  }

  return {
    paymentCollection: new MockPaymentCollectionProvider(),
    settlement: new MockSettlementProvider(),
    wayToYou: new MockWayToYouRoutingProvider(),
    courier: new MockCourierProvider(),
    notification: new MockNotificationProvider(),
  };
}
