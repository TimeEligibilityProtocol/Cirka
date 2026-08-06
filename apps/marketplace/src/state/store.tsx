import { commissionMinor, DeliveryMethod, Listing, Order } from "@wearto-you/domain";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../config/apiClient";

interface AppState {
  listings: Listing[];
  orders: Order[];
  loading: boolean;
  loadError: string | null;
}

interface AppActions {
  refreshListings: () => Promise<void>;
  addListing: (listing: Listing) => Promise<void>;
  removeListing: (id: string) => Promise<void>;
  purchase: (listingId: string, deliveryMethod: DeliveryMethod) => Promise<{ order: Order; listing: Listing }>;
  confirmPickup: (orderId: string) => Promise<Order>;
  sendClaim: (orderId: string) => Promise<Order>;
  confirmDestination: (orderId: string) => Promise<Order>;
  completePayout: (orderId: string) => Promise<Order>;
}

const StoreContext = createContext<(AppState & AppActions) | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refreshListings = async () => {
    const fresh = await apiClient.listListings();
    setListings(fresh);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fresh = await apiClient.listListings();
        if (!cancelled) setListings(fresh);
      } catch (err) {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Could not reach the Cirka API.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const upsertOrder = (order: Order) => {
    setOrders((prev) => {
      const exists = prev.some((o) => o.id === order.id);
      return exists ? prev.map((o) => (o.id === order.id ? order : o)) : [order, ...prev];
    });
  };

  const upsertListing = (listing: Listing) => {
    setListings((prev) => {
      const exists = prev.some((l) => l.id === listing.id);
      return exists ? prev.map((l) => (l.id === listing.id ? listing : l)) : [listing, ...prev];
    });
  };

  const value = useMemo<AppState & AppActions>(
    () => ({
      listings,
      orders,
      loading,
      loadError,
      refreshListings,
      addListing: async (listing) => {
        const created = await apiClient.createListing(listing);
        upsertListing(created);
      },
      removeListing: async (id) => {
        await apiClient.deleteListing(id);
        setListings((prev) => prev.filter((l) => l.id !== id));
      },
      purchase: async (listingId, deliveryMethod) => {
        const { order, listing } = await apiClient.purchase(listingId, deliveryMethod);
        upsertOrder(order);
        upsertListing(listing);
        return { order, listing };
      },
      confirmPickup: async (orderId) => {
        const order = await apiClient.confirmPickup(orderId);
        upsertOrder(order);
        return order;
      },
      sendClaim: async (orderId) => {
        const order = await apiClient.sendClaim(orderId);
        upsertOrder(order);
        return order;
      },
      confirmDestination: async (orderId) => {
        const order = await apiClient.confirmDestination(orderId);
        upsertOrder(order);
        return order;
      },
      completePayout: async (orderId) => {
        const order = await apiClient.completePayout(orderId);
        upsertOrder(order);
        return order;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listings, orders, loading, loadError]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function commissionFor(order: Order) {
  const commission = commissionMinor(order.priceAtOrder.amountMinor, order.commissionBpsAtOrder);
  return {
    total: order.priceAtOrder,
    commission: { amountMinor: commission, currency: order.priceAtOrder.currency },
    sellerPayout: {
      amountMinor: order.priceAtOrder.amountMinor - commission,
      currency: order.priceAtOrder.currency,
    },
  };
}

export function listingImageUrl(listing: Listing): string {
  const image = listing.images[0];
  return image ? apiClient.resolveAssetUrl(image.url) : "";
}

export function listingImageAlt(listing: Listing): string {
  return listing.images[0]?.alt ?? "";
}
