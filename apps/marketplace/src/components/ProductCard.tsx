import { colors, typography } from "@wearto-you/ui";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DemoListing, formatMoney } from "../data/seed";

export function ProductCard({
  listing,
  onPress,
  cardWidth,
  imageRadius,
  heartSize,
}: {
  listing: DemoListing;
  onPress: () => void;
  cardWidth: number;
  imageRadius: number;
  heartSize: number;
}) {
  const sold = listing.status === "sold" || listing.status === "reserved";
  return (
    <Pressable onPress={onPress} style={[styles.card, { width: cardWidth }]}>
      <View style={[styles.imageWrap, { borderRadius: imageRadius }]}>
        <Image
          source={listing.imageSource}
          style={[styles.image, { resizeMode: "cover" }]}
          accessibilityLabel={listing.imageAlt}
        />
        <View
          style={[
            styles.heart,
            { width: heartSize, height: heartSize, borderRadius: heartSize / 2 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Save to favorites"
        >
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
  card: {},
  imageWrap: {
    aspectRatio: 0.8,
    overflow: "hidden",
    backgroundColor: "#E9D8C2", // image-layout-spec.json containerBackground
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heart: {
    position: "absolute",
    top: 11,
    right: 11,
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
    bottom: 8,
    left: 8,
    backgroundColor: colors.text,
    borderRadius: 999,
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
