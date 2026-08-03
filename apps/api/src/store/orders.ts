import { computeDeliveryFeeMinor, DeliveryMethod, Money, Order } from "@wearto-you/domain";

let orders: Order[] = [];
let counter = 0;

function nextOrderId(): string {
  counter += 1;
  return `order_${Date.now()}_${counter}`;
}

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function createOrder(input: {
  listingId: string;
  buyerId: string;
  sellerId: string;
  tenantId: string;
  priceAtOrderMinor: number;
  currency: Money["currency"];
  deliveryMethod: DeliveryMethod;
  commissionBps: number;
}): Order {
  const order: Order = {
    id: nextOrderId(),
    listingId: input.listingId,
    buyerId: input.buyerId,
    sellerId: input.sellerId,
    tenantId: input.tenantId,
    priceAtOrder: { amountMinor: input.priceAtOrderMinor, currency: input.currency },
    commissionBpsAtOrder: input.commissionBps,
    deliveryMethod: input.deliveryMethod,
    deliveryFeeMinor: computeDeliveryFeeMinor(input.deliveryMethod, input.priceAtOrderMinor),
    paymentStatus: "created",
    deliveryStatus: "awaiting_courier",
    disputeStatus: "none",
    payoutStatus: "not_started",
    createdAt: new Date(0).toISOString(),
    disputeWindowExpiresAt: null,
  };
  orders = [order, ...orders];
  return order;
}

export function patchOrder(id: string, patch: Partial<Order>): Order | undefined {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return undefined;
  orders[index] = { ...orders[index], ...patch };
  return orders[index];
}
