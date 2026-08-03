/**
 * Mirrors image-layout-spec.json (owner-approved product image standard,
 * modeled on Ounass/Net-a-Porter). Single source of truth for product
 * image proportions and responsive breakpoints — do not pick column
 * counts, paddings, or crop behavior ad hoc in a screen. See
 * docs/product/source-assets/image-layout-spec.json and
 * image-layout-instructions.md for the full spec this mirrors.
 */

export const PRODUCT_ASPECT_RATIO = 0.8; // 4:5
export const IMAGE_CONTAINER_BACKGROUND = "#E9D8C2";

export const IMAGE_MASTER = {
  width: 2400,
  height: 3000,
  minimumWidth: 1200,
  minimumHeight: 1500,
} as const;

export interface FeedBreakpoint {
  id: string;
  minWidth: number;
  maxWidth: number | null;
  columns: number;
  pagePadding: number;
  columnGap: number;
  rowGap: number;
  imageRadius: number;
  contentMaxWidth?: number;
}

export const FEED_BREAKPOINTS: FeedBreakpoint[] = [
  { id: "mobile-small", minWidth: 0, maxWidth: 479, columns: 2, pagePadding: 12, columnGap: 12, rowGap: 20, imageRadius: 12 },
  { id: "mobile-large", minWidth: 480, maxWidth: 767, columns: 2, pagePadding: 16, columnGap: 16, rowGap: 24, imageRadius: 12 },
  { id: "tablet", minWidth: 768, maxWidth: 1023, columns: 3, pagePadding: 24, columnGap: 20, rowGap: 28, imageRadius: 12 },
  { id: "desktop", minWidth: 1024, maxWidth: 1439, columns: 4, pagePadding: 32, columnGap: 24, rowGap: 32, imageRadius: 12 },
  { id: "desktop-large", minWidth: 1440, maxWidth: null, columns: 5, pagePadding: 40, columnGap: 20, rowGap: 32, imageRadius: 12, contentMaxWidth: 1440 },
];

export function getFeedBreakpoint(viewportWidth: number): FeedBreakpoint {
  return (
    FEED_BREAKPOINTS.find((b) => viewportWidth >= b.minWidth && (b.maxWidth === null || viewportWidth <= b.maxWidth)) ??
    FEED_BREAKPOINTS[FEED_BREAKPOINTS.length - 1]
  );
}

export const PRODUCT_DETAIL_LAYOUT = {
  mobile: { maxWidth: 767, sidePadding: 16 },
  tablet: { minWidth: 768, maxWidth: 1023, sidePadding: 24 },
  desktop: {
    minWidth: 1024,
    pageMaxWidth: 1360,
    galleryPercent: 60,
    detailsPercent: 40,
    columnGapMin: 48,
    columnGapMax: 64,
    mainImageMaxWidth: 720,
    thumbnailWidth: 88,
    thumbnailHeight: 110,
    thumbnailGap: 12,
  },
} as const;

export const HEART_BUTTON = {
  mobile: 36,
  desktop: 40,
  insetMin: 10,
  insetMax: 12,
} as const;

export const VISUAL_TEST_WIDTHS = [360, 390, 768, 1024, 1440] as const;

export function isDesktopWidth(viewportWidth: number): boolean {
  return viewportWidth >= PRODUCT_DETAIL_LAYOUT.desktop.minWidth;
}
