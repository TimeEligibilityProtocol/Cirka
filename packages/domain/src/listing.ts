import { Money } from "./money.js";

export type ListingStatus =
  | "draft"
  | "active"
  | "reserved"
  | "sold"
  | "expired"
  | "hidden"
  | "removed";

export type LabelStatus = "missing" | "cut_off" | "unreadable" | "available";

/** Every field an AI can suggest keeps the suggestion and the seller's decision separate. */
export interface AiAssistedField<T> {
  aiSuggestion: T | null;
  sellerSelectedValue: T | null;
  sellerNote: string | null;
}

export interface Listing {
  id: string;
  sellerId: string;
  tenantId: string;
  /** The most specific subcategory id from the category tree, e.g. "clothing-dresses" — never a bare text label. See category.ts. */
  categoryId: string;
  status: ListingStatus;
  title: AiAssistedField<string>;
  description: AiAssistedField<string>;
  brand: AiAssistedField<string>;
  color: AiAssistedField<string>;
  size: AiAssistedField<string>;
  material: AiAssistedField<string>;
  condition: AiAssistedField<string>;
  labelStatus: LabelStatus;
  price: Money;
  negotiable: boolean;
  minimumOfferMinor: number | null; // never exposed via public API
  createdAt: string;
  lastConfirmedAvailableAt: string;
  expiresAt: string | null;
}

export const LISTING_CONFIRM_AVAILABILITY_AFTER_DAYS = 30;
export const LISTING_AUTO_EXPIRE_AFTER_DAYS = 60;
