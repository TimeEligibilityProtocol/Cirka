import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { Image, ImageStyle, StyleSheet, Text, View } from "react-native";
import { apiClient } from "../config/apiClient";
import { useStack } from "../nav/stack";

const HERO_IMAGE_URL = apiClient.resolveAssetUrl("/assets/hero/hero.webp");
// The approved hero is a single flat image — illustration and headline
// baked together as delivered. It is shown whole, at its own aspect
// ratio, with resizeMode "contain" so nothing is ever cropped — no crop
// math, no per-breakpoint framing decisions, nothing to get wrong.
const IMAGE_ASPECT_RATIO = 1708 / 921;

export function HeroBanner() {
  const { push } = useStack();

  return (
    <View style={styles.wrap}>
      <View style={[styles.imageWrap, { aspectRatio: IMAGE_ASPECT_RATIO }]}>
        <Image
          source={{ uri: HERO_IMAGE_URL }}
          style={[styles.image, { resizeMode: "contain" }] as ImageStyle[]}
          accessibilityLabel="Pre-loved fashion in the UAE. Great pieces deserve another life. Woman in linen set carrying a coffee and a leather tote, palm trees and a coastal terrace behind her."
        />
      </View>
      <View style={styles.ctaRow}>
        <Text onPress={() => push("Discover")} style={styles.ctaPrimary}>
          Shop now
        </Text>
        <Text onPress={() => push("AddListing")} style={styles.ctaSecondary}>
          Sell yours
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
  },
  imageWrap: {
    width: "100%",
    borderRadius: radii.card,
    overflow: "hidden",
    backgroundColor: colors.neutralSurface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ctaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: spacing.md,
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
