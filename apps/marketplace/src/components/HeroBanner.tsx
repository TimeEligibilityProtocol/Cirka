import { colors, isDesktopWidth, radii, spacing, typography } from "@wearto-you/ui";
import { Image, ImageStyle, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { apiClient } from "../config/apiClient";
import { useStack } from "../nav/stack";

const HERO_IMAGE_URL = apiClient.resolveAssetUrl("/assets/hero/hero.webp");
const DESKTOP_ASPECT_RATIO = 16 / 7;
const MOBILE_ASPECT_RATIO = 4 / 5;

export function HeroBanner() {
  const { width } = useWindowDimensions();
  const { push } = useStack();
  const desktop = isDesktopWidth(width);

  return (
    <View style={[styles.wrap, { borderRadius: desktop ? radii.card : radii.cardMin }]}>
      <View style={[styles.imageWrap, { aspectRatio: desktop ? DESKTOP_ASPECT_RATIO : MOBILE_ASPECT_RATIO }]}>
        <Image
          source={{ uri: HERO_IMAGE_URL }}
          style={
            [
              styles.image,
              { resizeMode: "cover", objectPosition: desktop ? "center" : "78% center" },
            ] as ImageStyle[]
          }
          accessibilityLabel="Woman in linen set walking near Burj Khalifa, carrying a leather tote"
        />
      </View>
      {!desktop ? <View style={styles.mobileScrim} /> : null}
      <View style={[styles.copy, desktop ? styles.copyDesktop : styles.copyMobile]}>
        <Text style={[styles.eyebrow, desktop ? styles.eyebrowDesktop : undefined]}>PRE-LOVED FASHION IN UAE</Text>
        <Text style={[styles.headline, desktop ? styles.headlineDesktop : undefined]}>Great pieces deserve another life.</Text>
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
  mobileScrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%",
    backgroundColor: "rgba(33,27,24,0.45)",
  },
  copy: {
    position: "absolute",
    justifyContent: "center",
  },
  copyDesktop: {
    top: 0,
    bottom: 0,
    left: 40,
    maxWidth: 420,
  },
  copyMobile: {
    left: 20,
    right: 20,
    bottom: 20,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: typography.weights.button as "600",
    color: colors.surface,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  eyebrowDesktop: {
    color: colors.text,
  },
  headline: {
    fontSize: 22,
    fontWeight: typography.weights.heading as "700",
    color: colors.surface,
    marginBottom: 16,
    lineHeight: 28,
  },
  headlineDesktop: {
    fontSize: 34,
    lineHeight: 42,
    color: colors.text,
    maxWidth: 380,
  },
  ctaRow: {
    flexDirection: "row",
    gap: 12,
  },
  ctaPrimary: {
    backgroundColor: colors.primary,
    color: colors.surface,
    fontWeight: typography.weights.button as "600",
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  ctaSecondary: {
    backgroundColor: colors.surface,
    color: colors.text,
    fontWeight: typography.weights.button as "600",
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
});
