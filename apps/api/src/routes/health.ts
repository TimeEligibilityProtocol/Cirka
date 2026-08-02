import { Router } from "express";
import { Providers } from "../providers/factory.js";

export function healthRouter(providers: Providers): Router {
  const router = Router();

  router.get("/health", async (_req, res) => {
    res.json({ status: "ok" });
  });

  router.get("/health/providers", async (_req, res) => {
    const [payment, settlement] = await Promise.all([
      providers.paymentCollection.getCapabilities(),
      providers.settlement.getCapabilities(),
    ]);
    res.json({ paymentCollection: payment, settlement });
  });

  return router;
}
