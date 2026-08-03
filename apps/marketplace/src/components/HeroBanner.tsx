import { colors, isDesktopWidth, radii, spacing, typography } from "@wearto-you/ui";
import { Image, ImageStyle, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { apiClient } from "../config/apiClient";
import { useStack } from "../nav/stack";

const HERO_IMAGE_URL = apiClient.resolveAssetUrl("/assets/hero/hero.webp");

// Fixed pixel heights, not aspect-ratio-driven — the hero is a compact
// homepage banner, not a full-viewport campaign image. Product cards must
// already be visible in the first viewport on a standard desktop screen.
const DESKTOP_HEIGHT = 340;
const TABLET_IMAGE_HEIGHT = 230;
const MOBILE_IMAGE_HEIGHT = 190;

// Desktop crops the source image much shorter than its natural ratio, so
// the crop is vertical — bias hard toward the top so her face is never
// cut off, instead of centering and losing the top of her head.
const DESKTOP_IMAGE_POSITION = "center 8%";
// Mobile/tablet crop the image taller than its natural ratio (crop is
// horizontal, not vertical), so a simple right-biased position is safe —
// it keeps her in frame and trims empty sky on the left instead.
const COMPACT_IMAGE_POSITION = "78% center";

export function HeroBanner() {
  const { width } = useWindowDimensions();
  const { push } = useStack();
  const desktop = isDesktopWidth(width);
  const tablet = !desktop && width >= 768;

  if (desktop) {
    return (
      <View style={[styles.wrap, { borderRadius: radii.card }]}>
        <View style={[styles.imageWrap, { height: DESKTOP_HEIGHT }]}>
          <Image
            source={{ uri: HERO_IMAGE_URL }}
            style={[styles.image, { resizeMode: "cover", objectPosition: DESKTOP_IMAGE_POSITION }] as ImageStyle[]}
            accessibilityLabel="Woman in linen set walking near Burj Khalifa, carrying a leather tote"
          />
        </View>
        <View style={[styles.copy, styles.copyDesktop]}>
          <Text style={styles.eyebrowOnLight}>PRE-LOVED FASHION IN UAE</Text>
          <Text style={styles.headlineDesktop}>Great pieces deserve another life.</Text>
          <View style={styles.ctaRow}>
            <Text onPress={() => push("Discover")} style={styles.ctaPrimary}>
              Shop now
            </Text>
            <Text onPress={() => push("AddListing")} style={styles.ctaSecondary}>
              Sell yours
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const imageHeight = tablet ? TABLET_IMAGE_HEIGHT : MOBILE_IMAGE_HEIGHT;

  return (
    <View style={[styles.wrap, { borderRadius: radii.cardMin }]}>
      <View style={[styles.imageWrap, { height: imageHeight }]}>
        <Image
          source={{ uri: HERO_IMAGE_URL }}
          style={[styles.image, { resizeMode: "cover", objectPosition: COMPACT_IMAGE_POSITION }] as ImageStyle[]}
          accessibilityLabel="Woman in linen set walking near Burj Khalifa, carrying a leather tote"
        />
      </View>
      <View style={styles.copyPanel}>
        <Text style={styles.eyebrowOnPanel}>PRE-LOVED FASHION IN UAE</Text>
        <Text style={styles.headlineCompact}>Great pieces deserve another life.</Text>
        <View style={styles.ctaRow}>
          <Text onPress={() => push("Discover")} style={styles.ctaPrimaryOnPanel}>
            Shop now
          </Text>
          <Text onPress={() => push("AddListing")} style={styles.ctaSecondaryOnPanel}>
            Sell yours
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: "hidden",
    backgroundColor: colors.neutralSurface,
    marginBottom: spacing.lg,
  },
  imageWrap: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  copy: {
    position: "absolute",
    justifyContent: "center",
  },
  copyDesktop: {
    top: 0,
    bottom: 0,
    left: 40,
    maxWidth: 380,
  },
  copyPanel: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  eyebrowOnLight: {
    fontSize: 12,
    fontWeight: typography.weights.button as "600",
    color: colors.text,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  eyebrowOnPanel: {
    fontSize: 11,
    fontWeight: typography.weights.button as "600",
    color: colors.surface,
    letterSpacing: 1.2,
    marginBottom: 8,
    opacity: 0.9,
  },
  headlineDesktop: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: typography.weights.heading as "700",
    color: colors.text,
    maxWidth: 340,
    marginBottom: 20,
  },
  headlineCompact: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: typography.weights.heading as "700",
    color: colors.surface,
    marginBottom: 14,
  },
  ctaRow: {
    flexDirection: "row",
    gap: 10,
  },
  ctaPrimary: {
    backgroundColor: colors.primary,
    color: colors.surface,
    fontWeight: typography.weights.button as "600",
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  ctaSecondary: {
    backgroundColor: colors.surface,
    color: colors.text,
    fontWeight: typography.weights.button as "600",
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  ctaPrimaryOnPanel: {
    backgroundColor: colors.surface,
    color: colors.primary,
    fontWeight: typography.weights.button as "600",
    fontSize: 13,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  ctaSecondaryOnPanel: {
    backgroundColor: "transparent",
    color: colors.surface,
    fontWeight: typography.weights.button as "600",
    fontSize: 13,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.surface,
    overflow: "hidden",
  },
});
