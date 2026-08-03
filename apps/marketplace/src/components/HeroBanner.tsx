import { radii, spacing } from "@wearto-you/ui";
import { Image, ImageStyle, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { apiClient } from "../config/apiClient";
import { useStack } from "../nav/stack";

const LANDSCAPE_URL = apiClient.resolveAssetUrl("/assets/hero/hero-landscape.webp");
const PORTRAIT_URL = apiClient.resolveAssetUrl("/assets/hero/hero-portrait.webp");
// v3 desktop image (2400x800, wider/shorter, smaller baked buttons
// relative to the canvas) + v2 mobile image, both pre-composed at their
// own exact ratios — the container just matches each file's dimensions,
// so resizeMode "cover" never has to trim anything.
const LANDSCAPE_ASPECT_RATIO = 2400 / 800;
const PORTRAIT_ASPECT_RATIO = 1080 / 968;

// The approved hero images have their headline and buttons baked in as
// artwork — nothing is rendered on top except two invisible tap targets,
// positioned as percentages of the image's own box (so they track
// correctly no matter what size the image renders at). Coordinates were
// measured directly from the source files' button-fill pixels, not
// eyeballed, and are only valid for these exact two images — if the
// artwork changes, these must be re-measured (see scripts used in dev:
// PIL + connected-components on the button fill color).
const LANDSCAPE_BUTTONS = {
  shopNow: { left: "6.2%", top: "76.2%", width: "9.2%", height: "8.0%" },
  sellYours: { left: "16.4%", top: "76.2%", width: "9.3%", height: "7.9%" },
} as const;
const PORTRAIT_BUTTONS = {
  shopNow: { left: "6.7%", top: "55.3%", width: "25.0%", height: "7.8%" },
  sellYours: { left: "33.2%", top: "55.3%", width: "25.4%", height: "7.7%" },
} as const;

export function HeroBanner({ onShopNow }: { onShopNow?: () => void }) {
  const { width } = useWindowDimensions();
  const { push } = useStack();
  const sideBySide = width >= 768;

  const uri = sideBySide ? LANDSCAPE_URL : PORTRAIT_URL;
  const aspectRatio = sideBySide ? LANDSCAPE_ASPECT_RATIO : PORTRAIT_ASPECT_RATIO;
  const buttons = sideBySide ? LANDSCAPE_BUTTONS : PORTRAIT_BUTTONS;

  return (
    <View style={[styles.wrap, { aspectRatio }]}>
      <Image
        source={{ uri }}
        style={[styles.image, { resizeMode: "cover" }] as ImageStyle[]}
        accessibilityLabel="Pre-loved fashion in the UAE. Great pieces deserve another life. Woman in linen set carrying a coffee and a leather tote on a waterfront promenade."
      />
      <Pressable
        onPress={onShopNow ?? (() => push("Discover"))}
        accessibilityLabel="Shop now"
        style={[styles.hitTarget, buttons.shopNow]}
      />
      <Pressable
        onPress={() => push("AddListing")}
        accessibilityLabel="Sell yours"
        style={[styles.hitTarget, buttons.sellYours]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    // Matches whatever width the parent content column already is (the
    // same one the header row and product grid use) — no independent cap
    // here, so the hero lines up flush with the rest of the page instead
    // of floating narrower than everything around it.
    width: "100%",
    borderRadius: radii.card,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  hitTarget: {
    position: "absolute",
  },
});
