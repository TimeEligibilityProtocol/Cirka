import { approvedField, Listing } from "@wearto-you/domain";

/**
 * Canonical demo catalog — single source of truth shared by every client
 * through the API, replacing the per-app duplicated copies that used to
 * live in apps/marketplace. See docs/product/source-assets/demo-products.json
 * for the original approved package this mirrors.
 */
const now = "2026-08-02T00:00:00.000Z";

interface SeedInput {
  id: string;
  title: string;
  categoryId: string;
  price: number;
  conditionTitle: string;
  conditionNote: string;
  color: string;
  size: string;
  material: string;
  measurements: string;
  description: string;
  imageFile: string;
  alt: string;
}

const SEED_INPUTS: SeedInput[] = [
  {
    id: "demo-dress-001",
    title: "Cream Pleated Midi Dress",
    categoryId: "clothing-dresses",
    price: 320,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Cream",
    size: "M",
    material: "Viscose blend",
    measurements: "62 cm (W) × 118 cm (L)",
    description: "Flowy pleated midi dress with a relaxed silhouette.",
    imageFile: "01-cream-pleated-dress.webp",
    alt: "Cream pleated midi dress on a wooden hanger",
  },
  {
    id: "demo-blazer-001",
    title: "Camel Tailored Blazer",
    categoryId: "clothing-coats-jackets",
    price: 420,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Camel",
    size: "S",
    material: "Wool blend",
    measurements: "Shoulder 39 cm × Length 68 cm",
    description: "Single-breasted tailored blazer, structured shoulders.",
    imageFile: "02-camel-tailored-blazer.webp",
    alt: "Camel tailored blazer on a wooden hanger",
  },
  {
    id: "demo-shoes-001",
    title: "Ivory Slingback Heels",
    categoryId: "shoes-pumps",
    price: 650,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Ivory / Brown",
    size: "EU 38",
    material: "Leather",
    measurements: "Insole length 24.5 cm",
    description: "Slingback heels with a contrast toe cap.",
    imageFile: "03-ivory-slingback-heels.webp",
    alt: "Pair of ivory slingback heels with brown toe caps",
  },
  {
    id: "demo-shoes-002",
    title: "Burgundy Leather Loafers",
    categoryId: "shoes-loafers",
    price: 540,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Burgundy",
    size: "EU 39",
    material: "Leather",
    measurements: "Insole length 25 cm",
    description: "Classic penny loafers with a stacked heel.",
    imageFile: "04-burgundy-leather-loafers.webp",
    alt: "Pair of burgundy-brown leather loafers",
  },
  {
    id: "demo-bag-001",
    title: "Caramel Leather Top Handle Bag",
    categoryId: "bags-top-handle",
    price: 980,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Caramel",
    size: "One size",
    material: "Leather",
    measurements: "28 cm (W) × 20 cm (H) × 12 cm (D)",
    description: "Structured top-handle bag with a detachable shoulder strap.",
    imageFile: "05-caramel-top-handle-bag.webp",
    alt: "Caramel leather top-handle bag with shoulder strap",
  },
  {
    id: "demo-bag-002",
    title: "Ivory Quilted Shoulder Bag",
    categoryId: "bags-shoulder",
    price: 1250,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Ivory",
    size: "Medium",
    material: "Quilted leather",
    measurements: "24 cm (W) × 16 cm (H) × 7 cm (D)",
    description: "Quilted flap bag with a warm-gold chain strap.",
    imageFile: "06-ivory-quilted-shoulder-bag.webp",
    alt: "Ivory quilted shoulder bag with a warm-gold chain",
  },
  {
    id: "demo-bag-003",
    title: "Burgundy Suede Shoulder Bag",
    categoryId: "bags-shoulder",
    price: 760,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Burgundy",
    size: "One size",
    material: "Suede",
    measurements: "30 cm (W) × 22 cm (H) × 10 cm (D)",
    description: "Crescent-shaped shoulder bag in soft suede.",
    imageFile: "07-burgundy-suede-shoulder-bag.webp",
    alt: "Burgundy-brown suede crescent shoulder bag",
  },
  {
    id: "demo-top-001",
    title: "Ivory Silk-Blend Blouse",
    categoryId: "clothing-tops",
    price: 290,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Ivory",
    size: "M",
    material: "Silk blend",
    measurements: "Shoulder 37 cm × Length 62 cm",
    description: "Silk-blend blouse with a relaxed, silky drape.",
    imageFile: "08-ivory-silk-blouse.webp",
    alt: "Ivory silk-blend blouse on a wooden hanger",
  },
];

export function buildSeedListings(): Listing[] {
  return SEED_INPUTS.map((input) => ({
    id: input.id,
    sellerId: "seller_demo",
    tenantId: "wearto_you",
    categoryId: input.categoryId,
    status: "active",
    title: approvedField(input.title),
    description: approvedField(input.description),
    brand: approvedField("Unbranded"),
    color: approvedField(input.color),
    size: approvedField(input.size),
    material: approvedField(input.material),
    condition: approvedField(input.conditionTitle, input.conditionNote),
    labelStatus: "available",
    images: [{ url: `/assets/demo-products/${input.imageFile}`, alt: input.alt }],
    measurements: input.measurements,
    price: { amountMinor: Math.round(input.price * 100), currency: "AED" },
    negotiable: false,
    minimumOfferMinor: null,
    createdAt: now,
    lastConfirmedAvailableAt: now,
    expiresAt: null,
  }));
}
