import { radii, spacing } from "@wearto-you/ui";
import { Image, ImageStyle, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { apiClient } from "../config/apiClient";
import { useStack } from "../nav/stack";

const LANDSCAPE_URL = apiClient.resolveAssetUrl("/assets/hero/hero-landscape.webp");
const PORTRAIT_URL = apiClient.resolveAssetUrl("/assets/hero/hero-portrait.webp");
// Deliberately WIDER than the source image's own ratio (1708:921 = 1.85).
// The container is full page width (see `wrap`), and the source image is
// tall enough that "full width, uncropped" makes it dominate the whole
// viewport on a wide monitor. This ratio (2.4) tells resizeMode "cover"
// to crop — but only the empty sky/ground margins above and below the
// text and buttons, never the content itself. Verified safe: the baked
// content spans y 17%-79.4% of the source image; at 2.4 the visible
// window is the center 77% (y ~11.5%-88.5%), which fully contains it
// with margin to spare on both sides.
const LANDSCAPE_ASPECT_RATIO = 2.4;
// Cropped below the tote bag to remove the lower legs/feet — the full
// head-to-sandals portrait made the mobile hero too tall.
const PORTRAIT_ASPECT_RATIO = 1122 / 1009;

// The approved hero images have their headline and buttons baked in as
// artwork — nothing is rendered on top except two invisible tap targets,
// positioned as percentages of the image's own box (so they track
// correctly no matter what size the image renders at). Coordinates were
// measured directly from the source files' button-fill pixels, not
// eyeballed, and are only valid for these exact two images at these
// exact display aspect ratios — if either changes, these must be
// re-measured (see scripts used in dev: PIL + connected-components on
// the button fill color).
const LANDSCAPE_BUTTONS = {
  shopNow: { left: "6.3%", top: "78.2%", width: "15.4%", height: "9.9%" },
  sellYours: { left: "23.2%", top: "78.2%", width: "15.6%", height: "9.9%" },
} as const;
const PORTRAIT_BUTTONS = {
  shopNow: { left: "6.8%", top: "60.2%", width: "19.4%", height: "6.3%" },
  sellYours: { left: "28.2%", top: "60.2%", width: "19.6%", height: "6.3%" },
} as const;

export function HeroBanner() {
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
        onPress={() => push("Discover")}
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
