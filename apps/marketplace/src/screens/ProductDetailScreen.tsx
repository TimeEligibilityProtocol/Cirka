import { getCategory } from "@wearto-you/domain";
import { colors, IMAGE_CONTAINER_BACKGROUND, isDesktopWidth, PRODUCT_DETAIL_LAYOUT, typography } from "@wearto-you/ui";
import { Image, ImageStyle, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Card, InfoRow } from "../components/InfoRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { Header } from "../components/Header";
import { formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

const DESKTOP = PRODUCT_DETAIL_LAYOUT.desktop;

export function ProductDetailScreen() {
  const { current, push } = useStack();
  const { listings } = useStore();
  const listing = listings.find((l) => l.id === current.params?.listingId);
  const { width } = useWindowDimensions();
  const desktop = isDesktopWidth(width);

  if (!listing) {
    return (
      <View style={styles.container}>
        <Header title="Not found" />
      </View>
    );
  }

  const sold = listing.status === "sold" || listing.status === "reserved";
  const category = getCategory(listing.categoryId);

  const buyBlock = (
    <View style={desktop ? styles.buyBlockDesktop : undefined}>
      <Text style={styles.price}>{formatMoney(listing.price)}</Text>
      <PrimaryButton
        label={sold ? "No longer available" : "Buy now"}
        onPress={() => {
          if (!sold) push("Checkout", { listingId: listing.id });
        }}
        style={sold ? styles.disabled : desktop ? styles.buyButtonDesktop : undefined}
      />
    </View>
  );

  const infoBlock = (
    <View style={desktop ? styles.infoColDesktop : undefined}>
      <Text style={styles.title}>{listing.title.sellerSelectedValue}</Text>
      <Text style={styles.size}>
        Size {listing.size.sellerSelectedValue} · {listing.color.sellerSelectedValue}
      </Text>

      {desktop ? buyBlock : null}

      <Card>
        <InfoRow label="Condition" value={`${listing.condition.sellerSelectedValue} — ${listing.conditionLabel}`} />
        <InfoRow label="Measurements" value={listing.measurements} />
        <InfoRow label="Material" value={listing.material.sellerSelectedValue ?? "—"} />
        <InfoRow label="Description" value={listing.description.sellerSelectedValue ?? "—"} />
      </Card>

      <View style={styles.deliveryCard}>
        <Text style={styles.deliveryTitle}>Delivery</Text>
        <Text style={styles.deliveryText}>2–3 days · Free delivery over AED 300</Text>
        <Text style={styles.deliveryTitle}>Local pickup</Text>
        <Text style={styles.deliveryText}>Dubai · Available, QR handoff on delivery</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={category?.labelEn ?? "Item"} right="♡" />
      <ScrollView contentContainerStyle={desktop ? styles.scrollContentDesktop : undefined}>
        <View style={desktop ? styles.desktopRow : undefined}>
          <View style={desktop ? styles.galleryColDesktop : styles.content}>
            <View style={desktop ? styles.mainImageWrapDesktop : styles.mainImageWrap}>
              <Image
                source={listing.imageSource}
                style={[styles.mainImage, { resizeMode: "contain" }] as ImageStyle[]}
                accessibilityLabel={listing.imageAlt}
              />
            </View>
            {!desktop ? infoBlock : null}
          </View>
          {desktop ? infoBlock : null}
        </View>
      </ScrollView>
      {!desktop ? (
        <View style={styles.footer}>{buyBlock}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  scrollContentDesktop: {
    alignItems: "center",
    paddingVertical: 32,
  },
  desktopRow: {
    flexDirection: "row",
    width: "100%",
    maxWidth: DESKTOP.pageMaxWidth,
    paddingHorizontal: 32,
    gap: DESKTOP.columnGapMin,
  },
  galleryColDesktop: {
    flex: DESKTOP.galleryPercent,
  },
  infoColDesktop: {
    flex: DESKTOP.detailsPercent,
    // "sticky" on web; harmless no-op on native.
    // @ts-expect-error - RNW-only CSS position value
    position: "sticky",
    top: 24,
    alignSelf: "flex-start",
  },
  mainImageWrap: {
    width: "100%",
    aspectRatio: 0.8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: IMAGE_CONTAINER_BACKGROUND,
    marginBottom: 8,
  },
  mainImageWrapDesktop: {
    width: "100%",
    maxWidth: DESKTOP.mainImageMaxWidth,
    aspectRatio: 0.8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: IMAGE_CONTAINER_BACKGROUND,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: typography.weights.heading as "700",
    color: colors.text,
  },
  size: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    marginBottom: 16,
  },
  buyBlockDesktop: {
    marginBottom: 24,
  },
  buyButtonDesktop: {
    marginTop: 8,
  },
  deliveryCard: {
    marginTop: 16,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  deliveryTitle: {
    fontSize: 15,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
  },
  deliveryText: {
    fontSize: 13,
    color: colors.text,
    opacity: 0.7,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  price: {
    fontSize: 22,
    fontWeight: typography.weights.price as "600",
    color: colors.text,
  },
  disabled: {
    opacity: 0.5,
  },
});
