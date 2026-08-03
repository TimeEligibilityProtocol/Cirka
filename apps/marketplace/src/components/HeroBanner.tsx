import { colors, isDesktopWidth, radii, spacing, typography } from "@wearto-you/ui";
import { Image, ImageStyle, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { apiClient } from "../config/apiClient";
import { useStack } from "../nav/stack";

const HERO_IMAGE_URL = apiClient.resolveAssetUrl("/assets/hero/hero.webp");
// Source crop is a portrait shot (head to hip, generous headroom above her
// head) — it was deliberately cropped that way so it never needs aggressive
// vertical cropping at compact banner heights, unlike a full-bleed
// landscape image, which either crops her head or her feet at these sizes.
const IMAGE_ASPECT_RATIO = 580 / 760;

// Fixed pixel heights — the hero is a compact homepage banner, not a
// full-viewport campaign image. Product cards must already be visible in
// the first viewport on a standard desktop screen.
const DESKTOP_HEIGHT = 340;
const TABLET_HEIGHT = 280;
const MOBILE_IMAGE_HEIGHT = 260;

export function HeroBanner() {
  const { width } = useWindowDimensions();
  const { push } = useStack();
  const desktop = isDesktopWidth(width);
  const sideBySide = width >= 768;

  const headline = (
    <Text style={sideBySide ? styles.headlineLarge : styles.headlineCompact}>
      <Text>Great pieces deserve </Text>
      <Text style={styles.headlineAccent}>another life.</Text>
    </Text>
  );

  const ctas = (
    <View style={styles.ctaRow}>
      <Text onPress={() => push("Discover")} style={styles.ctaPrimary}>
        Shop now
      </Text>
      <Text onPress={() => push("AddListing")} style={styles.ctaSecondary}>
        Sell yours
      </Text>
    </View>
  );

  const portrait = (height: number) => (
    <View style={[styles.imageWrap, { height, width: height * IMAGE_ASPECT_RATIO }]}>
      <Image
        source={{ uri: HERO_IMAGE_URL }}
        style={[styles.image, { resizeMode: "cover", objectPosition: "center 8%" }] as ImageStyle[]}
        accessibilityLabel="Woman in linen set carrying a coffee and a leather tote, palm trees and a coastal terrace behind her"
      />
    </View>
  );

  if (sideBySide) {
    const height = desktop ? DESKTOP_HEIGHT : TABLET_HEIGHT;
    return (
      <View style={[styles.wrap, styles.rowWrap, { height, borderRadius: radii.card }]}>
        <View style={styles.textCol}>
          <Text style={styles.eyebrow}>PRE-LOVED FASHION IN THE UAE</Text>
          {headline}
          {ctas}
        </View>
        {portrait(height)}
      </View>
    );
  }

  return (
    <View style={[styles.wrap, { borderRadius: radii.cardMin }]}>
      <View style={styles.mobileImageRow}>{portrait(MOBILE_IMAGE_HEIGHT)}</View>
      <View style={styles.mobileTextCol}>
        <Text style={styles.eyebrow}>PRE-LOVED FASHION IN THE UAE</Text>
        {headline}
        {ctas}
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
  rowWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 40,
  },
  textCol: {
    flexShrink: 1,
    maxWidth: 380,
  },
  mobileImageRow: {
    alignItems: "center",
    paddingTop: 16,
    backgroundColor: colors.neutralSurface,
  },
  mobileTextCol: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: "center",
  },
  imageWrap: {
    overflow: "hidden",
    alignSelf: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: typography.weights.button as "600",
    color: colors.primary,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  headlineLarge: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: typography.weights.heading as "700",
    color: colors.text,
    marginBottom: 20,
  },
  headlineCompact: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: typography.weights.heading as "700",
    color: colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  headlineAccent: {
    color: colors.primary,
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
});
