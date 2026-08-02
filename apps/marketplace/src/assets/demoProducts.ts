/**
 * Approved demo product photos — see docs/product/source-assets/demo-products.json
 * and demo-products-instructions.md. These are fictional demo listings
 * ("Unbranded"), not real inventory. Do not replace with stock photos,
 * placeholders, or generated images without a separate instruction.
 */

export interface DemoProductAsset {
  id: string;
  title: string;
  categoryId: string;
  condition: "excellent" | "very_good";
  price: number;
  source: number;
  alt: string;
}

export const DEMO_PRODUCTS: DemoProductAsset[] = [
  {
    id: "demo-dress-001",
    title: "Cream Pleated Midi Dress",
    categoryId: "clothing-dresses",
    condition: "excellent",
    price: 320,
    source: require("../../assets/demo-products/01-cream-pleated-dress.webp"),
    alt: "Cream pleated midi dress on a wooden hanger",
  },
  {
    id: "demo-blazer-001",
    title: "Camel Tailored Blazer",
    categoryId: "clothing-coats-jackets",
    condition: "very_good",
    price: 420,
    source: require("../../assets/demo-products/02-camel-tailored-blazer.webp"),
    alt: "Camel tailored blazer on a wooden hanger",
  },
  {
    id: "demo-shoes-001",
    title: "Ivory Slingback Heels",
    categoryId: "shoes-pumps",
    condition: "excellent",
    price: 650,
    source: require("../../assets/demo-products/03-ivory-slingback-heels.webp"),
    alt: "Pair of ivory slingback heels with brown toe caps",
  },
  {
    id: "demo-shoes-002",
    title: "Burgundy Leather Loafers",
    categoryId: "shoes-loafers",
    condition: "very_good",
    price: 540,
    source: require("../../assets/demo-products/04-burgundy-leather-loafers.webp"),
    alt: "Pair of burgundy-brown leather loafers",
  },
  {
    id: "demo-bag-001",
    title: "Caramel Leather Top Handle Bag",
    categoryId: "bags-top-handle",
    condition: "very_good",
    price: 980,
    source: require("../../assets/demo-products/05-caramel-top-handle-bag.webp"),
    alt: "Caramel leather top-handle bag with shoulder strap",
  },
  {
    id: "demo-bag-002",
    title: "Ivory Quilted Shoulder Bag",
    categoryId: "bags-shoulder",
    condition: "excellent",
    price: 1250,
    source: require("../../assets/demo-products/06-ivory-quilted-shoulder-bag.webp"),
    alt: "Ivory quilted shoulder bag with a warm-gold chain",
  },
  {
    id: "demo-bag-003",
    title: "Burgundy Suede Shoulder Bag",
    categoryId: "bags-shoulder",
    condition: "very_good",
    price: 760,
    source: require("../../assets/demo-products/07-burgundy-suede-shoulder-bag.webp"),
    alt: "Burgundy-brown suede crescent shoulder bag",
  },
  {
    id: "demo-top-001",
    title: "Ivory Silk-Blend Blouse",
    categoryId: "clothing-tops",
    condition: "excellent",
    price: 290,
    source: require("../../assets/demo-products/08-ivory-silk-blouse.webp"),
    alt: "Ivory silk-blend blouse on a wooden hanger",
  },
];
