import { colors, typography } from "@wearto-you/ui";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

function tintFor(seed: string): string {
  const sum = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return sum % 2 === 0 ? colors.neutralSurface : colors.highlight;
}

/**
 * Standing in for real product photography until listings have actual
 * uploaded images. Deliberately not a random stock photo — those read as
 * broken/off-brand in a fashion feed.
 */
export function PlaceholderTile({
  seed,
  label,
  variant = "photo",
  style,
}: {
  seed: string;
  label: string;
  variant?: "photo" | "cutout";
  style?: ViewStyle;
}) {
  const monogram = label.trim().slice(0, 1).toUpperCase() || "?";

  if (variant === "cutout") {
    return (
      <View style={[styles.tile, styles.cutout, style]}>
        <Text style={styles.monogramCutout}>{monogram}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.tile, { backgroundColor: tintFor(seed) }, style]}>
      <Text style={styles.monogram}>{monogram}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cutout: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  monogram: {
    fontSize: 40,
    fontWeight: typography.weights.heading as "700",
    color: colors.primary,
    opacity: 0.35,
  },
  monogramCutout: {
    fontSize: 40,
    fontWeight: typography.weights.heading as "700",
    color: colors.text,
    opacity: 0.25,
  },
});
