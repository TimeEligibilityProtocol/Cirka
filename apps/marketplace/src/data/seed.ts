import { AiAssistedField, Listing, Money, Order } from "@wearto-you/domain";

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
  images: string[];
  brand2: string;
  conditionLabel: string;
  measurements: string;
}

const now = "2026-08-02T00:00:00.000Z";

function listing(input: {
  id: string;
  title: string;
  category: Listing["category"];
  price: number;
  images: string[];
  brand: string;
  color: string;
  size: string;
  material: string;
  condition: string;
  conditionLabel: string;
  measurements: string;
  description: string;
}): DemoListing {
  return {
    id: input.id,
    sellerId: "seller_demo",
    tenantId: "wearto_you",
    category: input.category,
    status: "active",
    title: approved(input.title),
    description: approved(input.description),
    brand: approved(input.brand),
    color: approved(input.color),
    size: approved(input.size),
    material: approved(input.material),
    condition: approved(input.condition),
    labelStatus: "available",
    price: aed(input.price),
    negotiable: false,
    minimumOfferMinor: null,
    createdAt: now,
    lastConfirmedAvailableAt: now,
    expiresAt: null,
    images: input.images,
    brand2: input.brand,
    conditionLabel: input.conditionLabel,
    measurements: input.measurements,
  };
}

export const SEED_LISTINGS: DemoListing[] = [
  listing({
    id: "l1",
    title: "Pleated Maxi Dress",
    category: "clothing",
    price: 320,
    images: ["https://picsum.photos/seed/wty-dress1/800/1000", "https://picsum.photos/seed/wty-dress1b/800/1000"],
    brand: "Zimmermann",
    color: "Cream",
    size: "M",
    material: "Linen blend",
    condition: "Excellent",
    conditionLabel: "Gently used with minimal signs of wear.",
    measurements: "62 cm (W) × 118 cm (L)",
    description: "Flowy pleated maxi dress, worn twice, dry-cleaned before listing.",
  }),
  listing({
    id: "l2",
    title: "Leather Top Handle Bag",
    category: "bags",
    price: 1950,
    images: ["https://picsum.photos/seed/wty-bag1/800/1000", "https://picsum.photos/seed/wty-bag1b/800/1000"],
    brand: "Mulberry",
    color: "Tan",
    size: "One size",
    material: "Full-grain leather",
    condition: "Very good",
    conditionLabel: "Gently used with minimal signs of wear.",
    measurements: "24 cm (W) × 16 cm (H) × 7 cm (D)",
    description: "Structured top handle bag with detachable strap. Light corner wear.",
  }),
  listing({
    id: "l3",
    title: "Slingback Heels",
    category: "shoes",
    price: 650,
    images: ["https://picsum.photos/seed/wty-shoes1/800/1000"],
    brand: "Chanel",
    color: "Beige / Black",
    size: "EU 38",
    material: "Leather / Canvas",
    condition: "Good",
    conditionLabel: "Some visible wear on the sole and toe cap.",
    measurements: "Insole length 24.5 cm",
    description: "Classic cap-toe slingbacks, worn a handful of times.",
  }),
  listing({
    id: "l4",
    title: "Tailored Blazer",
    category: "clothing",
    price: 420,
    images: ["https://picsum.photos/seed/wty-blazer1/800/1000"],
    brand: "Massimo Dutti",
    color: "Camel",
    size: "S",
    material: "Wool blend",
    condition: "Excellent",
    conditionLabel: "Like new, no visible wear.",
    measurements: "Shoulder 39 cm × Length 68 cm",
    description: "Single-breasted tailored blazer, worn once for an event.",
  }),
  listing({
    id: "l5",
    title: "Quilted Chain Bag",
    category: "bags",
    price: 2450,
    images: ["https://picsum.photos/seed/wty-bag2/800/1000", "https://picsum.photos/seed/wty-bag2b/800/1000"],
    brand: "Chanel",
    color: "Cream",
    size: "Medium",
    material: "Caviar leather",
    condition: "Very good",
    conditionLabel: "Gently used with minimal signs of wear.",
    measurements: "24 cm (W) × 16 cm (H) × 7 cm (D)",
    description: "Classic quilted flap bag with gold chain, comes with dust bag and card.",
  }),
  listing({
    id: "l6",
    title: "Silk Sunglasses Case Set",
    category: "jewelry_accessories",
    price: 180,
    images: ["https://picsum.photos/seed/wty-sun1/800/1000"],
    brand: "Celine",
    color: "Black",
    size: "One size",
    material: "Acetate",
    condition: "Very good",
    conditionLabel: "Minor scuff on the case, lenses flawless.",
    measurements: "Lens width 5.4 cm",
    description: "Cat-eye sunglasses with original case and cleaning cloth.",
  }),
];

export const SEED_ORDERS: Order[] = [];
