import { DISPUTE_WINDOW_DAYS_DEFAULT, Order } from "@wearto-you/domain";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { aed, DemoListing, SEED_LISTINGS, SEED_ORDERS } from "../data/seed";

export type ClaimChannel = "email" | "whatsapp";

interface AppState {
  listings: DemoListing[];
  orders: Order[];
}

interface AppActions {
  addListing: (listing: DemoListing) => void;
  createOrder: (listingId: string) => Order;
  markPaid: (orderId: string, listingId: string) => void;
  confirmPickup: (orderId: string) => void;
  sendClaim: (orderId: string, channel: ClaimChannel) => void;
  confirmDestination: (orderId: string) => void;
  completePayout: (orderId: string) => void;
}

const StoreContext = createContext<(AppState & AppActions) | null>(null);

function nextId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<DemoListing[]>(SEED_LISTINGS);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);

  const value = useMemo<AppState & AppActions>(
    () => ({
      listings,
      orders,
      addListing: (listing) => setListings((prev) => [listing, ...prev]),
      createOrder: (listingId) => {
        const listing = listings.find((l) => l.id === listingId)!;
        const order: Order = {
          id: nextId("order"),
          listingId,
          buyerId: "buyer_demo",
          sellerId: listing.sellerId,
          tenantId: listing.tenantId,
          priceAtOrder: listing.price,
          commissionBpsAtOrder: 1000,
          paymentStatus: "created",
          deliveryStatus: "awaiting_courier",
          disputeStatus: "none",
          payoutStatus: "not_started",
          createdAt: new Date(0).toISOString(),
          disputeWindowExpiresAt: null,
        };
        setOrders((prev) => [order, ...prev]);
        setListings((prev) => prev.map((l) => (l.id === listingId ? { ...l, status: "reserved" } : l)));
        return order;
      },
      markPaid: (orderId, listingId) => {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: "paid", deliveryStatus: "delivered" } : o))
        );
        setListings((prev) => prev.map((l) => (l.id === listingId ? { ...l, status: "sold" } : l)));
      },
      confirmPickup: (orderId) => {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  deliveryStatus: "personal_pickup_confirmed",
                  disputeStatus: "resolved",
                  payoutStatus: "payout_pending",
                }
              : o
          )
        );
      },
      sendClaim: (orderId, _channel) => {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, payoutStatus: "claim_sent" } : o)));
      },
      confirmDestination: (orderId) => {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, payoutStatus: "destination_confirmed" } : o))
        );
      },
      completePayout: (orderId) => {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, payoutStatus: "paid_out" } : o)));
      },
    }),
    [listings, orders]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function commissionFor(order: Order) {
  const commissionMinor = Math.round((order.priceAtOrder.amountMinor * order.commissionBpsAtOrder) / 10000);
  return {
    total: order.priceAtOrder,
    commission: aed(commissionMinor / 100),
    sellerPayout: aed((order.priceAtOrder.amountMinor - commissionMinor) / 100),
  };
}

export const DISPUTE_WINDOW_DAYS = DISPUTE_WINDOW_DAYS_DEFAULT;
