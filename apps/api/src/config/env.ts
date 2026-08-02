export interface Env {
  nodeEnv: "development" | "preview" | "production" | "test";
  port: number;
  productionPaymentsEnabled: boolean;
  checkoutRail: "mock" | "tap" | "lean";
  settlementProvider: "mock" | "tap" | "lean";
  courierProvider: "mock" | string;
  notificationProvider: "mock" | string;
  waytoYouApiBaseUrl: string | null;
  waytoYouApiKey: string | null;
}

/**
 * Fails fast on boot rather than silently defaulting a safety-relevant
 * flag. PRODUCTION_PAYMENTS_ENABLED must be an explicit "true"/"false" —
 * missing it entirely is treated as a config error, not as false.
 */
export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const productionPaymentsEnabledRaw = source.PRODUCTION_PAYMENTS_ENABLED;
  if (productionPaymentsEnabledRaw !== "true" && productionPaymentsEnabledRaw !== "false") {
    throw new Error(
      "PRODUCTION_PAYMENTS_ENABLED must be explicitly set to 'true' or 'false' — see apps/api/.env.example"
    );
  }

  return {
    nodeEnv: (source.NODE_ENV as Env["nodeEnv"]) ?? "development",
    port: Number(source.PORT ?? 4000),
    productionPaymentsEnabled: productionPaymentsEnabledRaw === "true",
    checkoutRail: (source.CHECKOUT_RAIL as Env["checkoutRail"]) ?? "mock",
    settlementProvider: (source.SETTLEMENT_PROVIDER as Env["settlementProvider"]) ?? "mock",
    courierProvider: source.COURIER_PROVIDER ?? "mock",
    notificationProvider: source.NOTIFICATION_PROVIDER ?? "mock",
    waytoYouApiBaseUrl: source.WAYTOYOU_API_BASE_URL || null,
    waytoYouApiKey: source.WAYTOYOU_API_KEY || null,
  };
}
