import { DeliveryMethod, Listing, Order, User } from "@wearto-you/domain";

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
    if (res.status === 204) return undefined as T;
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

  async deleteListing(id: string): Promise<void> {
    await this.request(`/api/listings/${id}`, { method: "DELETE" });
  }

  async register(email: string, password: string, displayName: string): Promise<{ token: string; user: User }> {
    return this.request("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password, displayName }) });
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    return this.request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  }

  async logout(): Promise<void> {
    await this.request("/api/auth/logout", { method: "POST" });
  }

  async me(): Promise<User> {
    const { user } = await this.request<{ user: User }>("/api/auth/me");
    return user;
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

  /**
   * Uploads locally-picked photos (camera or gallery — blob:/data: URIs on
   * web, file:// URIs on native) and returns their server-hosted URLs. Does
   * not go through request() because FormData needs the browser/RN runtime
   * to set its own multipart Content-Type boundary, not application/json.
   */
  async uploadPhotos(localUris: string[]): Promise<string[]> {
    const formData = new FormData();
    for (let i = 0; i < localUris.length; i++) {
      const blob = await (await fetch(localUris[i])).blob();
      const ext = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
      formData.append("photos", blob, `photo-${i}.${ext}`);
    }
    const token = await this.config.getAuthToken?.();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${this.config.baseUrl}/api/uploads`, { method: "POST", body: formData, headers });
    if (!res.ok) throw new ApiError(res.status, await res.text());
    const { urls } = (await res.json()) as { urls: string[] };
    return urls;
  }

  /**
   * Runs background removal on a single locally-picked photo (server-side —
   * see apps/api/src/routes/backgroundRemoval.ts) and returns the
   * server-hosted URL of the cutout (transparent PNG).
   */
  async removeBackground(localUri: string): Promise<string> {
    const blob = await (await fetch(localUri)).blob();
    const formData = new FormData();
    formData.append("photo", blob, "photo.png");

    const token = await this.config.getAuthToken?.();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${this.config.baseUrl}/api/remove-background`, { method: "POST", body: formData, headers });
    if (!res.ok) throw new ApiError(res.status, await res.text());
    const { url } = (await res.json()) as { url: string };
    return url;
  }
}
