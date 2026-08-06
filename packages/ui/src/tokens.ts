/**
 * Single source of truth for design tokens (spec: "Kierunek wizualny").
 * Screens must not introduce colors, sizes or radii outside this file.
 */

export const colors = {
  background: "#F7F6F1",
  surface: "#FFFFFF",
  text: "#090909",
  primary: "#899363",
  primaryPressed: "#717A50",
  neutralSurface: "#E8E6DD",
  highlight: "#DCE2C5",
  border: "#D8D6CF",
} as const;

export const typography = {
  fontFamily: "Manrope",
  displayFontFamily: "Cormorant Infant",
  buttonFontFamily: "Manrope SemiBold",
  weights: {
    logo: "600", // SemiBold, lowercase, tight tracking
    heading: "700",
    body: "400",
    bodyMedium: "500",
    button: "600",
    price: "600",
  },
  minBodySizePx: 14,
  preferredBodySizePx: 16,
} as const;

/** Spacing scale — multiples of 4/8px only. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  card: 16, // 14–16px
  cardMin: 14,
  pill: 999, // filtry w formie kapsułek
} as const;

export const sizes = {
  minTouchTarget: 44,
  primaryButtonMinHeight: 52,
} as const;

export const bottomNav = ["discover", "saved", "add", "messages", "profile"] as const;

export type ColorToken = keyof typeof colors;
