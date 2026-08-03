import { Listing } from "@wearto-you/domain";
import { colors, typography } from "@wearto-you/ui";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatMoney } from "../data/seed";
import { listingImageAlt, listingImageUrl } from "../state/store";
import { HeartIcon } from "./icons/icons";

export function ProductCard({
  listing,
  onPress,
  cardWidth,
  imageRadius,
  heartSize,
}: {
  listing: Listing;
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
          source={{ uri: listingImageUrl(listing) }}
          style={[styles.image, { resizeMode: "cover" }]}
          accessibilityLabel={listingImageAlt(listing)}
        />
        <View
          style={[
            styles.heart,
            { width: heartSize, height: heartSize, borderRadius: heartSize / 2 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Save to favorites"
        >
          <HeartIcon size={heartSize * 0.42} color={colors.text} />
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
      <Text numberOfLines={1} style={styles.meta}>
        {[listing.brand.sellerSelectedValue, listing.size.sellerSelectedValue, listing.condition.sellerSelectedValue]
          .filter(Boolean)
          .join(" · ")}
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
    fontWeight: typography.weights.bodyMedium as "500",
  },
  meta: {
    fontSize: 11,
    color: colors.text,
    opacity: 0.55,
    marginTop: 1,
  },
  price: {
    fontSize: 15,
    fontWeight: typography.weights.heading as "700",
    color: colors.primary,
    marginTop: 3,
  },
});
