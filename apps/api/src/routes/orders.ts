import { DeliveryMethod } from "@wearto-you/domain";
import { Router } from "express";
import { getListingById, patchListing } from "../store/listings.js";
import { createOrder, getOrderById, getOrders, patchOrder } from "../store/orders.js";

const COMMISSION_BPS_DEFAULT = 1000; // 10%

export function ordersRouter(): Router {
  const router = Router();

  router.get("/api/orders", (_req, res) => {
    res.json({ orders: getOrders() });
  });

  router.get("/api/orders/:id", (req, res) => {
    const order = getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "order_not_found" });
    res.json({ order });
  });

  // "Purchase": creates the order and — since no real payment gateway is
  // wired up yet — immediately marks it paid, mirroring the previous
  // client-only mock. Enforces "one item, one sale" at the point every
  // client shares: reject if the listing is no longer active.
  router.post("/api/orders", (req, res) => {
    const { listingId, deliveryMethod } = req.body as { listingId?: string; deliveryMethod?: DeliveryMethod };
    if (!listingId || (deliveryMethod !== "courier" && deliveryMethod !== "pickup")) {
      return res.status(400).json({ error: "invalid_order_request" });
    }
    const listing = getListingById(listingId);
    if (!listing) return res.status(404).json({ error: "listing_not_found" });
    if (listing.status !== "active") {
      return res.status(409).json({ error: "listing_not_available", status: listing.status });
    }

    const order = createOrder({
      listingId,
      buyerId: "buyer_demo",
      sellerId: listing.sellerId,
      tenantId: listing.tenantId,
      priceAtOrderMinor: listing.price.amountMinor,
      currency: listing.price.currency,
      deliveryMethod,
      commissionBps: COMMISSION_BPS_DEFAULT,
    });
    patchOrder(order.id, { paymentStatus: "paid", deliveryStatus: "delivered" });
    const updatedListing = patchListing(listingId, { status: "sold" });

    res.status(201).json({ order: getOrderById(order.id), listing: updatedListing });
  });

  router.patch("/api/orders/:id/confirm-pickup", (req, res) => {
    const order = patchOrder(req.params.id, {
      deliveryStatus: "personal_pickup_confirmed",
      disputeStatus: "resolved",
      payoutStatus: "payout_pending",
    });
    if (!order) return res.status(404).json({ error: "order_not_found" });
    res.json({ order });
  });

  router.patch("/api/orders/:id/send-claim", (req, res) => {
    const order = patchOrder(req.params.id, { payoutStatus: "claim_sent" });
    if (!order) return res.status(404).json({ error: "order_not_found" });
    res.json({ order });
  });

  router.patch("/api/orders/:id/confirm-destination", (req, res) => {
    const order = patchOrder(req.params.id, { payoutStatus: "destination_confirmed" });
    if (!order) return res.status(404).json({ error: "order_not_found" });
    res.json({ order });
  });

  router.patch("/api/orders/:id/complete-payout", (req, res) => {
    const order = patchOrder(req.params.id, { payoutStatus: "paid_out" });
    if (!order) return res.status(404).json({ error: "order_not_found" });
    res.json({ order });
  });

  return router;
}
