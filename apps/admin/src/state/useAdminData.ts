import { Listing, Order } from "@wearto-you/domain";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../config/apiClient";

const POLL_INTERVAL_MS = 4000;

/**
 * Polls rather than a one-shot fetch — this admin view and
 * apps/marketplace are separate processes talking to the same apps/api,
 * so a purchase made elsewhere (including from a phone) only shows up
 * here once this refetches.
 */
export function useAdminData() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [freshListings, freshOrders] = await Promise.all([apiClient.listListings(), apiClient.listOrders()]);
      setListings(freshListings);
      setOrders(freshOrders);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reach the Cirka API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return { listings, orders, loading, error, lastUpdated, refresh: fetchAll };
}
