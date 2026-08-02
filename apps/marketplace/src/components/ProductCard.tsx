import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DemoListing, formatMoney } from "../data/seed";

export function ProductCard({ listing, onPress }: { listing: DemoListing; onPress: () => void }) {
  const sold = listing.status === "sold" || listing.status === "reserved";
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={listing.imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.heart}>
          <Text style={styles.heartIcon}>♡</Text>
        </View>
        {sold ? (
          <View style={styles.soldBadge}>
            <Text style={styles.soldText}>{listing.status === "sold" ? "Sold" : "Reserved"}</Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={1} style={styles.title}>
        {listing.title.sellerSelectedValue}
      </Text>
      <Text style={styles.price}>{formatMoney(listing.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
  },
  imageWrap: {
    aspectRatio: 0.8,
    borderRadius: radii.card,
    overflow: "hidden",
    backgroundColor: colors.neutralSurface,
    marginBottom: spacing.xs,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heart: {
    position: "absolute",
    top: spacing.xs,
    right: spacing.xs,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,253,252,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  heartIcon: {
    fontSize: 15,
    color: colors.text,
  },
  soldBadge: {
    position: "absolute",
    bottom: spacing.xs,
    left: spacing.xs,
    backgroundColor: colors.text,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  soldText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: typography.weights.bodyMedium as "500",
  },
  title: {
    fontSize: 13,
    color: colors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: typography.weights.price as "600",
    color: colors.text,
  },
});
