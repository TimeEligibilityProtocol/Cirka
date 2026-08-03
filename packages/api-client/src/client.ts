import { DeliveryMethod, Listing, Order } from "@wearto-you/domain";

export interface ApiClientConfig {
  baseUrl: string;
  getAuthToken?: () => Promise<string | null>;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export class ApiClient {
  constructor(private config: ApiClientConfig) {}

  get baseUrl(): string {
    return this.config.baseUrl;
  }

  /** Prefixes a server-relative asset path (e.g. a listing image URL) with this client's API base URL. */
  resolveAssetUrl(relativeUrl: string): string {
    return `${this.config.baseUrl}${relativeUrl}`;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await this.config.getAuthToken?.();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string> | undefined),
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${this.config.baseUrl}${path}`, { ...init, headers });
    if (!res.ok) {
      throw new ApiError(res.status, await res.text());
    }
    return res.json() as Promise<T>;
  }

  health(): Promise<{ status: string }> {
    return this.request("/health");
  }

  async listListings(): Promise<Listing[]> {
    const { listings } = await this.request<{ listings: Listing[] }>("/api/listings");
    return listings;
  }

  async getListing(id: string): Promise<Listing> {
    const { listing } = await this.request<{ listing: Listing }>(`/api/listings/${id}`);
    return listing;
  }

  async createListing(listing: Listing): Promise<Listing> {
    const { listing: created } = await this.request<{ listing: Listing }>("/api/listings", {
      method: "POST",
      body: JSON.stringify(listing),
    });
    return created;
  }

  async listOrders(): Promise<Order[]> {
    const { orders } = await this.request<{ orders: Order[] }>("/api/orders");
    return orders;
  }

  async getOrder(id: string): Promise<Order> {
    const { order } = await this.request<{ order: Order }>(`/api/orders/${id}`);
    return order;
  }

  async purchase(listingId: string, deliveryMethod: DeliveryMethod): Promise<{ order: Order; listing: Listing }> {
    return this.request("/api/orders", {
      method: "POST",
      body: JSON.stringify({ listingId, deliveryMethod }),
    });
  }

  async confirmPickup(orderId: string): Promise<Order> {
    const { order } = await this.request<{ order: Order }>(`/api/orders/${orderId}/confirm-pickup`, {
      method: "PATCH",
    });
    return order;
  }

  async sendClaim(orderId: string): Promise<Order> {
    const { order } = await this.request<{ order: Order }>(`/api/orders/${orderId}/send-claim`, {
      method: "PATCH",
    });
    return order;
  }

  async confirmDestination(orderId: string): Promise<Order> {
    const { order } = await this.request<{ order: Order }>(`/api/orders/${orderId}/confirm-destination`, {
      method: "PATCH",
    });
    return order;
  }

  async completePayout(orderId: string): Promise<Order> {
    const { order } = await this.request<{ order: Order }>(`/api/orders/${orderId}/complete-payout`, {
      method: "PATCH",
    });
    return order;
  }
}
