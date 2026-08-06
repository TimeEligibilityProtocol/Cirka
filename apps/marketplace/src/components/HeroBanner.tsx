import { radii, spacing } from "@wearto-you/ui";
import { Image, ImageStyle, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { apiClient } from "../config/apiClient";
import { useStack } from "../nav/stack";

const LANDSCAPE_URL = apiClient.resolveAssetUrl("/assets/hero/hero-landscape.webp");
const PORTRAIT_URL = apiClient.resolveAssetUrl("/assets/hero/hero-portrait.webp");
// Approved Cirka hero exports. The app header remains a separate component;
// no navigation is baked into either image.
const LANDSCAPE_ASPECT_RATIO = 2400 / 800;
const PORTRAIT_ASPECT_RATIO = 1122 / 1402;

// The approved hero images have their headline and buttons baked in as
// artwork — nothing is rendered on top except two invisible tap targets,
// positioned as percentages of the image's own box (so they track
// correctly no matter what size the image renders at). Coordinates were
// measured directly from the source files' button-fill pixels, not
// eyeballed, and are only valid for these exact two images — if the
// artwork changes, these must be re-measured (see scripts used in dev:
// PIL + connected-components on the button fill color).
const LANDSCAPE_BUTTONS = {
  shopNow: { left: "6.46%", top: "56.88%", width: "8.75%", height: "8.0%" },
  sellYours: { left: "16.04%", top: "56.88%", width: "8.75%", height: "8.0%" },
} as const;
const PORTRAIT_BUTTONS = {
  shopNow: { left: "6.68%", top: "64.05%", width: "27.99%", height: "6.35%" },
  sellYours: { left: "6.68%", top: "72.68%", width: "27.99%", height: "6.49%" },
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
        accessibilityLabel="Fashion keeps moving. Beautiful pieces deserve another life. Woman in a black blazer leaning against a wall."
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
