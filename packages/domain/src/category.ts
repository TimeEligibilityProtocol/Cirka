/**
 * Mirrors categories.json (approved category taxonomy, based on Ounass UAE
 * + Abayas & Modest Wear). This is the single source of truth for category
 * data — do not hardcode category labels/ids anywhere else. Copied here
 * (rather than imported as raw JSON) so it compiles identically across every
 * consumer's module system (Node/NodeNext for apps/api, Metro for
 * apps/marketplace, Vite for apps/admin) without JSON-import-assertion
 * differences between them.
 *
 * To update: edit categories.json (source of record, kept outside this
 * repo) and mirror the change here.
 */

export interface CategoryChild {
  id: string;
  slug: string;
  labelEn: string;
  labelAr: string | null;
  sortOrder: number;
  isActive: boolean;
  aliases?: string[];
}

export interface CategoryRoot {
  id: string;
  slug: string;
  labelEn: string;
  labelAr: string | null;
  parentId: null;
  sortOrder: number;
  isActive: boolean;
  children: CategoryChild[];
  attributes?: Record<string, string[]>;
}

export interface FlatCategory {
  id: string;
  slug: string;
  labelEn: string;
  labelAr: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
}

export const ROOT_ORDER = ["clothing", "shoes", "bags", "accessories"] as const;

export const CATEGORY_TREE: CategoryRoot[] = [
  {
    id: "clothing",
    slug: "clothing",
    labelEn: "Clothing",
    labelAr: null,
    parentId: null,
    sortOrder: 10,
    isActive: true,
    children: [
      { id: "clothing-dresses", slug: "dresses", labelEn: "Dresses", labelAr: null, sortOrder: 10, isActive: true },
      { id: "clothing-tops", slug: "tops", labelEn: "Tops", labelAr: null, sortOrder: 20, isActive: true },
      { id: "clothing-pants", slug: "pants", labelEn: "Pants", labelAr: null, sortOrder: 30, isActive: true, aliases: ["Trousers"] },
      { id: "clothing-swimwear", slug: "swimwear", labelEn: "Swimwear", labelAr: null, sortOrder: 40, isActive: true },
      { id: "clothing-beachwear", slug: "beachwear", labelEn: "Beachwear", labelAr: null, sortOrder: 50, isActive: true },
      { id: "clothing-activewear", slug: "activewear", labelEn: "Activewear", labelAr: null, sortOrder: 60, isActive: true },
      { id: "clothing-coats-jackets", slug: "coats-jackets", labelEn: "Coats & Jackets", labelAr: null, sortOrder: 70, isActive: true, aliases: ["Blazers"] },
      { id: "clothing-skirts", slug: "skirts", labelEn: "Skirts", labelAr: null, sortOrder: 80, isActive: true },
      { id: "clothing-loungewear", slug: "loungewear", labelEn: "Loungewear", labelAr: null, sortOrder: 90, isActive: true },
      { id: "clothing-knitwear", slug: "knitwear", labelEn: "Knitwear", labelAr: null, sortOrder: 100, isActive: true },
      { id: "clothing-co-ord-sets", slug: "co-ord-sets", labelEn: "Co-ord Sets", labelAr: null, sortOrder: 110, isActive: true, aliases: ["Matching Sets"] },
      { id: "clothing-abayas-modest-wear", slug: "abayas-modest-wear", labelEn: "Abayas & Modest Wear", labelAr: null, sortOrder: 120, isActive: true, aliases: ["Abayas", "Kaftans"] },
      { id: "clothing-shorts", slug: "shorts", labelEn: "Shorts", labelAr: null, sortOrder: 130, isActive: true },
      { id: "clothing-lingerie", slug: "lingerie", labelEn: "Lingerie", labelAr: null, sortOrder: 140, isActive: true },
      { id: "clothing-jeans", slug: "jeans", labelEn: "Jeans", labelAr: null, sortOrder: 150, isActive: true },
      { id: "clothing-sleepwear", slug: "sleepwear", labelEn: "Sleepwear", labelAr: null, sortOrder: 160, isActive: true },
      { id: "clothing-jumpsuits", slug: "jumpsuits", labelEn: "Jumpsuits", labelAr: null, sortOrder: 170, isActive: true },
    ],
  },
  {
    id: "shoes",
    slug: "shoes",
    labelEn: "Shoes",
    labelAr: null,
    parentId: null,
    sortOrder: 20,
    isActive: true,
    children: [
      { id: "shoes-sneakers", slug: "sneakers", labelEn: "Sneakers", labelAr: null, sortOrder: 10, isActive: true },
      { id: "shoes-sandals", slug: "sandals", labelEn: "Sandals", labelAr: null, sortOrder: 20, isActive: true },
      { id: "shoes-mules", slug: "mules", labelEn: "Mules", labelAr: null, sortOrder: 30, isActive: true },
      { id: "shoes-pumps", slug: "pumps", labelEn: "Pumps", labelAr: null, sortOrder: 40, isActive: true },
      { id: "shoes-ballerinas", slug: "ballerinas", labelEn: "Ballerinas", labelAr: null, sortOrder: 50, isActive: true, aliases: ["Ballet Flats"] },
      { id: "shoes-loafers", slug: "loafers", labelEn: "Loafers", labelAr: null, sortOrder: 60, isActive: true },
      { id: "shoes-slides", slug: "slides", labelEn: "Slides", labelAr: null, sortOrder: 70, isActive: true },
      { id: "shoes-boots", slug: "boots", labelEn: "Boots", labelAr: null, sortOrder: 80, isActive: true },
      { id: "shoes-espadrilles", slug: "espadrilles", labelEn: "Espadrilles", labelAr: null, sortOrder: 90, isActive: true },
      { id: "shoes-slippers", slug: "slippers", labelEn: "Slippers", labelAr: null, sortOrder: 100, isActive: true },
      { id: "shoes-flip-flops", slug: "flip-flops", labelEn: "Flip Flops", labelAr: null, sortOrder: 110, isActive: true },
    ],
    attributes: {
      heelHeight: ["flat", "low", "mid", "high"],
      heelStyle: ["block", "kitten", "stiletto", "platform", "flatform", "wedge"],
    },
  },
  {
    id: "bags",
    slug: "bags",
    labelEn: "Bags",
    labelAr: null,
    parentId: null,
    sortOrder: 30,
    isActive: true,
    children: [
      { id: "bags-shoulder", slug: "shoulder-bags", labelEn: "Shoulder Bags", labelAr: null, sortOrder: 10, isActive: true },
      { id: "bags-tote", slug: "tote-bags", labelEn: "Tote Bags", labelAr: null, sortOrder: 20, isActive: true },
      { id: "bags-top-handle", slug: "top-handle-bags", labelEn: "Top-Handle Bags", labelAr: null, sortOrder: 30, isActive: true },
      { id: "bags-mini", slug: "mini-bags", labelEn: "Mini Bags", labelAr: null, sortOrder: 40, isActive: true },
      { id: "bags-clutches", slug: "clutches", labelEn: "Clutches", labelAr: null, sortOrder: 50, isActive: true },
      { id: "bags-crossbody", slug: "crossbody-bags", labelEn: "Crossbody Bags", labelAr: null, sortOrder: 60, isActive: true, aliases: ["Cross-Body Bags"] },
      { id: "bags-bucket", slug: "bucket-bags", labelEn: "Bucket Bags", labelAr: null, sortOrder: 70, isActive: true },
      { id: "bags-satchel", slug: "satchel-bags", labelEn: "Satchel Bags", labelAr: null, sortOrder: 80, isActive: true },
      { id: "bags-backpacks", slug: "backpacks", labelEn: "Backpacks", labelAr: null, sortOrder: 90, isActive: true },
      { id: "bags-belt", slug: "belt-bags", labelEn: "Belt Bags", labelAr: null, sortOrder: 100, isActive: true },
      { id: "bags-travel", slug: "luggage-travel-bags", labelEn: "Luggage & Travel Bags", labelAr: null, sortOrder: 110, isActive: true },
    ],
  },
  {
    id: "accessories",
    slug: "accessories",
    labelEn: "Accessories",
    labelAr: null,
    parentId: null,
    sortOrder: 40,
    isActive: true,
    children: [
      { id: "accessories-fashion-jewellery", slug: "fashion-jewellery", labelEn: "Fashion Jewellery", labelAr: null, sortOrder: 10, isActive: true },
      { id: "accessories-sunglasses", slug: "sunglasses", labelEn: "Sunglasses", labelAr: null, sortOrder: 20, isActive: true },
      { id: "accessories-eyeglasses", slug: "eyeglasses", labelEn: "Eyeglasses", labelAr: null, sortOrder: 30, isActive: true },
      { id: "accessories-wallets-cardholders", slug: "wallets-cardholders", labelEn: "Wallets & Cardholders", labelAr: null, sortOrder: 40, isActive: true },
      { id: "accessories-wallets-on-chain", slug: "wallets-on-chain", labelEn: "Wallets on Chain", labelAr: null, sortOrder: 50, isActive: true },
      { id: "accessories-belts", slug: "belts", labelEn: "Belts", labelAr: null, sortOrder: 60, isActive: true },
      { id: "accessories-scarves-shawls", slug: "scarves-shawls", labelEn: "Scarves & Shawls", labelAr: null, sortOrder: 70, isActive: true },
      { id: "accessories-pouches", slug: "pouches", labelEn: "Pouches", labelAr: null, sortOrder: 80, isActive: true },
      { id: "accessories-bag-accessories", slug: "bag-accessories", labelEn: "Bag Accessories", labelAr: null, sortOrder: 90, isActive: true },
      { id: "accessories-hats", slug: "hats", labelEn: "Hats", labelAr: null, sortOrder: 100, isActive: true },
      { id: "accessories-hair", slug: "hair-accessories", labelEn: "Hair Accessories", labelAr: null, sortOrder: 110, isActive: true },
      { id: "accessories-watches", slug: "watches", labelEn: "Watches", labelAr: null, sortOrder: 120, isActive: true },
      { id: "accessories-keychains", slug: "keychains", labelEn: "Keychains", labelAr: null, sortOrder: 130, isActive: true },
      { id: "accessories-gloves", slug: "gloves", labelEn: "Gloves", labelAr: null, sortOrder: 140, isActive: true },
      { id: "accessories-socks-tights", slug: "socks-tights", labelEn: "Socks & Tights", labelAr: null, sortOrder: 150, isActive: true },
      { id: "accessories-travel", slug: "travel-accessories", labelEn: "Travel Accessories", labelAr: null, sortOrder: 160, isActive: true },
      { id: "accessories-tech", slug: "tech-accessories", labelEn: "Tech Accessories", labelAr: null, sortOrder: 170, isActive: true },
    ],
  },
];

const FLAT_MAP: Map<string, FlatCategory> = new Map();
for (const root of CATEGORY_TREE) {
  FLAT_MAP.set(root.id, {
    id: root.id,
    slug: root.slug,
    labelEn: root.labelEn,
    labelAr: root.labelAr,
    parentId: null,
    sortOrder: root.sortOrder,
    isActive: root.isActive,
  });
  for (const child of root.children) {
    FLAT_MAP.set(child.id, {
      id: child.id,
      slug: child.slug,
      labelEn: child.labelEn,
      labelAr: child.labelAr,
      parentId: root.id,
      sortOrder: child.sortOrder,
      isActive: child.isActive,
    });
  }
}

/** Root categories only, in approved display order. Used for top-level filters/tabs. */
export const ROOT_CATEGORIES: FlatCategory[] = ROOT_ORDER.map((id) => FLAT_MAP.get(id)!);

/** Any category (root or subcategory) by id — the id a Listing actually stores. */
export function getCategory(categoryId: string): FlatCategory | undefined {
  return FLAT_MAP.get(categoryId);
}

/** Walks up to the root category id (e.g. "clothing-dresses" -> "clothing"). */
export function getRootCategoryId(categoryId: string): string | undefined {
  const cat = FLAT_MAP.get(categoryId);
  if (!cat) return undefined;
  return cat.parentId ?? cat.id;
}

/** Subcategories for a given root, in sortOrder — for the second picker step when listing an item. */
export function getSubcategories(rootId: string): CategoryChild[] {
  const root = CATEGORY_TREE.find((r) => r.id === rootId);
  return root ? [...root.children].sort((a, b) => a.sortOrder - b.sortOrder) : [];
}

/** Technical fallback only — never offered to sellers as a normal subcategory (see categories spec). */
export const CATEGORY_REVIEW_REQUIRED = "category_review_required";
