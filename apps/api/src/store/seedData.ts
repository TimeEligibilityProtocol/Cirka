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
    id: "demo-shoes-red-001",
    title: "Red Slingback Heels",
    categoryId: "shoes-pumps",
    price: 450,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Red",
    size: "EU 38",
    material: "Leather",
    measurements: "Insole length 24.5 cm",
    description: "Sculptural red slingback heels with a pointed toe.",
    imageFile: "01-red-shoes.png",
    alt: "Red slingback heels on a light mint studio background",
  },
  {
    id: "demo-bag-cobalt-001",
    title: "Cobalt Top-Handle Bag",
    categoryId: "bags-top-handle",
    price: 380,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Cobalt blue",
    size: "Medium",
    material: "Leather",
    measurements: "29 cm (W) × 22 cm (H) × 12 cm (D)",
    description: "Structured cobalt top-handle bag with polished hardware.",
    imageFile: "02-camel-tailored-blazer.webp",
    alt: "Cobalt blue top-handle bag on a soft cream background",
  },
  {
    id: "demo-dress-coral-001",
    title: "Coral Evening Dress",
    categoryId: "clothing-dresses",
    price: 290,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Coral",
    size: "S",
    material: "Silk blend",
    measurements: "Bust 84 cm × Length 138 cm",
    description: "Fluid coral evening dress with a softly draped silhouette.",
    imageFile: "03-ivory-slingback-heels.webp",
    alt: "Coral evening dress displayed in a soft architectural niche",
  },
  {
    id: "demo-jacket-denim-001",
    title: "Dark Denim Jacket",
    categoryId: "clothing-coats-jackets",
    price: 220,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Dark denim",
    size: "M",
    material: "Cotton denim",
    measurements: "Shoulder 43 cm × Length 61 cm",
    description: "Structured dark denim jacket with classic contrast stitching.",
    imageFile: "04-burgundy-leather-loafers.webp",
    alt: "Dark denim jacket against soft paper curves",
  },
  {
    id: "demo-scarf-patterned-001",
    title: "Patterned Silk Scarf",
    categoryId: "accessories-scarves-shawls",
    price: 160,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Multicolour",
    size: "One size",
    material: "Silk",
    measurements: "88 cm × 88 cm",
    description: "Printed silk scarf with a graphic border and rich colour.",
    imageFile: "05-caramel-top-handle-bag.webp",
    alt: "Patterned silk scarf arranged on an organic studio plinth",
  },
  {
    id: "demo-boots-silver-001",
    title: "Silver Ankle Boots",
    categoryId: "shoes-boots",
    price: 520,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Silver",
    size: "EU 39",
    material: "Metallic leather",
    measurements: "Insole length 25 cm",
    description: "Metallic silver ankle boots with a clean contemporary profile.",
    imageFile: "06-ivory-quilted-shoulder-bag.webp",
    alt: "Silver ankle boots with soft botanical shadows",
  },
  {
    id: "demo-jacket-black-001",
    title: "Black Tailored Blazer",
    categoryId: "clothing-coats-jackets",
    price: 340,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Black",
    size: "M",
    material: "Wool blend",
    measurements: "Shoulder 40 cm × Length 66 cm",
    description: "Single-breasted black tailored blazer with a structured shoulder.",
    imageFile: "07-black-jacket.png",
    alt: "Black tailored blazer floating in a soft sage archway",
  },
  {
    id: "demo-bag-white-001",
    title: "Ivory Curved Shoulder Bag",
    categoryId: "bags-shoulder",
    price: 310,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Ivory",
    size: "One size",
    material: "Leather",
    measurements: "26 cm (W) × 20 cm (H) × 9 cm (D)",
    description: "Sculptural ivory shoulder bag with a soft curved silhouette.",
    imageFile: "08-white-bag.png",
    alt: "Ivory curved shoulder bag on a draped paper backdrop",
  },
  {
    id: "demo-dress-white-001",
    title: "Ivory Pleated Midi Dress",
    categoryId: "clothing-dresses",
    price: 260,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Ivory",
    size: "S",
    material: "Silk blend",
    measurements: "Bust 82 cm × Length 122 cm",
    description: "Pleated ivory midi dress with a tie waist detail.",
    imageFile: "09-white-dress.png",
    alt: "Ivory pleated midi dress on a soft sage studio background",
  },
  {
    id: "demo-shoes-black-001",
    title: "Black Slingback Heels",
    categoryId: "shoes-pumps",
    price: 480,
    conditionTitle: "Excellent",
    conditionNote: "Like new, no visible wear.",
    color: "Black",
    size: "EU 38",
    material: "Leather",
    measurements: "Insole length 24.5 cm",
    description: "Sculptural black slingback heels with a pointed toe and sphere heel.",
    imageFile: "10-black-shoes.png",
    alt: "Black slingback heels displayed on a stone plinth",
  },
  {
    id: "demo-bag-green-001",
    title: "Sage Green Top-Handle Bag",
    categoryId: "bags-top-handle",
    price: 400,
    conditionTitle: "Very good",
    conditionNote: "Gently used with minimal signs of wear.",
    color: "Sage green",
    size: "Medium",
    material: "Leather",
    measurements: "27 cm (W) × 21 cm (H) × 11 cm (D)",
    description: "Structured sage green top-handle bag with polished gold hardware.",
    imageFile: "11-green-bag.png",
    alt: "Sage green top-handle bag in front of a matching circular backdrop",
  },
];

export function buildSeedListings(): Listing[] {
  return SEED_INPUTS.map((input) => ({
    id: input.id,
    sellerId: "seller_demo",
    tenantId: "cirka",
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
