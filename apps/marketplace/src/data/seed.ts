import { AiAssistedField, Listing, Money, Order } from "@wearto-you/domain";
import { DEMO_PRODUCTS, DemoProductAsset } from "../assets/demoProducts";

export function approved<T>(value: T): AiAssistedField<T> {
  return { aiSuggestion: value, sellerSelectedValue: value, sellerNote: null };
}

export function aed(amountInAed: number): Money {
  return { amountMinor: Math.round(amountInAed * 100), currency: "AED" };
}

export function formatMoney(money: Money): string {
  return `AED ${(money.amountMinor / 100).toLocaleString("en-AE", { minimumFractionDigits: 0 })}`;
}

export interface DemoListing extends Listing {
  imageSource: number;
  conditionLabel: string;
  measurements: string;
}

const now = "2026-08-02T00:00:00.000Z";

const CONDITION_LABEL: Record<DemoProductAsset["condition"], { title: string; note: string }> = {
  excellent: { title: "Excellent", note: "Like new, no visible wear." },
  very_good: { title: "Very good", note: "Gently used with minimal signs of wear." },
};

/** Short, generic detail — these are fictional "Unbranded" demo listings, not real inventory. */
const DETAILS: Record<string, { color: string; size: string; material: string; measurements: string; description: string }> = {
  "demo-dress-001": {
    color: "Cream",
    size: "M",
    material: "Viscose blend",
    measurements: "62 cm (W) × 118 cm (L)",
    description: "Flowy pleated midi dress with a relaxed silhouette.",
  },
  "demo-blazer-001": {
    color: "Camel",
    size: "S",
    material: "Wool blend",
    measurements: "Shoulder 39 cm × Length 68 cm",
    description: "Single-breasted tailored blazer, structured shoulders.",
  },
  "demo-shoes-001": {
    color: "Ivory / Brown",
    size: "EU 38",
    material: "Leather",
    measurements: "Insole length 24.5 cm",
    description: "Slingback heels with a contrast toe cap.",
  },
  "demo-shoes-002": {
    color: "Burgundy",
    size: "EU 39",
    material: "Leather",
    measurements: "Insole length 25 cm",
    description: "Classic penny loafers with a stacked heel.",
  },
  "demo-bag-001": {
    color: "Caramel",
    size: "One size",
    material: "Leather",
    measurements: "28 cm (W) × 20 cm (H) × 12 cm (D)",
    description: "Structured top-handle bag with a detachable shoulder strap.",
  },
  "demo-bag-002": {
    color: "Ivory",
    size: "Medium",
    material: "Quilted leather",
    measurements: "24 cm (W) × 16 cm (H) × 7 cm (D)",
    description: "Quilted flap bag with a warm-gold chain strap.",
  },
  "demo-bag-003": {
    color: "Burgundy",
    size: "One size",
    material: "Suede",
    measurements: "30 cm (W) × 22 cm (H) × 10 cm (D)",
    description: "Crescent-shaped shoulder bag in soft suede.",
  },
  "demo-top-001": {
    color: "Ivory",
    size: "M",
    material: "Silk blend",
    measurements: "Shoulder 37 cm × Length 62 cm",
    description: "Silk-blend blouse with a relaxed, silky drape.",
  },
};

function listingFromDemoProduct(product: DemoProductAsset): DemoListing {
  const detail = DETAILS[product.id];
  const condition = CONDITION_LABEL[product.condition];
  return {
    id: product.id,
    sellerId: "seller_demo",
    tenantId: "wearto_you",
    categoryId: product.categoryId,
    status: "active",
    title: approved(product.title),
    description: approved(detail.description),
    brand: approved("Unbranded"),
    color: approved(detail.color),
    size: approved(detail.size),
    material: approved(detail.material),
    condition: approved(condition.title),
    labelStatus: "available",
    price: aed(product.price),
    negotiable: false,
    minimumOfferMinor: null,
    createdAt: now,
    lastConfirmedAvailableAt: now,
    expiresAt: null,
    imageSource: product.source,
    conditionLabel: condition.note,
    measurements: detail.measurements,
  };
}

export const SEED_LISTINGS: DemoListing[] = DEMO_PRODUCTS.map(listingFromDemoProduct);

export const SEED_ORDERS: Order[] = [];
