/**
 * Single source of truth for design tokens (spec: "Kierunek wizualny").
 * Screens must not introduce colors, sizes or radii outside this file.
 */

export const colors = {
  background: "#F8F4EE", // ciepła kość słoniowa
  surface: "#FFFDFC", // karty i pola — miękka biel
  text: "#211B18", // głębokie espresso
  primary: "#713F3A", // burgundowo-brązowy — główna akcja, aktywny stan
  primaryPressed: "#57302D", // ciemny burgundowo-brązowy
  neutralSurface: "#E9DED2", // jasny piasek
  highlight: "#E7D3CF", // przygaszony różowo-beżowy — delikatny status
  border: "#DED5CC", // ciepły kamień — linie i obramowania
} as const;

export const typography = {
  fontFamily: "Manrope",
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
