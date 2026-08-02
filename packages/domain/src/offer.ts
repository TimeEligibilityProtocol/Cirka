import { Money } from "./money.js";

export type OfferStatus = "pending" | "accepted" | "rejected" | "countered" | "expired";

export interface Offer {
  id: string;
  listingId: string;
  buyerId: string;
  amount: Money;
  status: OfferStatus;
  createdAt: string;
  respondedAt: string | null;
}
