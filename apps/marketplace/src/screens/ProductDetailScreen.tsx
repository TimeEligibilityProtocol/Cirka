import { getCategory } from "@wearto-you/domain";
import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, InfoRow } from "../components/InfoRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { Header } from "../components/Header";
import { formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

export function ProductDetailScreen() {
  const { current, push } = useStack();
  const { listings } = useStore();
  const listing = listings.find((l) => l.id === current.params?.listingId);

  if (!listing) {
    return (
      <View style={styles.container}>
        <Header title="Not found" />
      </View>
    );
  }

  const sold = listing.status === "sold" || listing.status === "reserved";
  const category = getCategory(listing.categoryId);

  return (
    <View style={styles.container}>
      <Header title={category?.labelEn ?? "Item"} right="♡" />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={listing.imageSource} style={styles.mainImage} resizeMode="cover" />

        <Text style={styles.title}>{listing.title.sellerSelectedValue}</Text>
        <Text style={styles.size}>
          Size {listing.size.sellerSelectedValue} · {listing.color.sellerSelectedValue}
        </Text>

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
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatMoney(listing.price)}</Text>
        <PrimaryButton
          label={sold ? "No longer available" : "Buy now"}
          onPress={() => {
            if (!sold) push("Checkout", { listingId: listing.id });
          }}
          style={sold ? styles.disabled : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  mainImage: {
    width: "100%",
    aspectRatio: 0.85,
    borderRadius: radii.card,
    backgroundColor: colors.neutralSurface,
    marginBottom: spacing.sm,
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
    marginBottom: spacing.md,
  },
  deliveryCard: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
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
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
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
