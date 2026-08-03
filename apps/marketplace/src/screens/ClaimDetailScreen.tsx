import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { commissionFor, useStore } from "../state/store";

const DESTINATIONS = ["Bank account ···· 4821", "Tap wallet"];

export function ClaimDetailScreen() {
  const { current, reset } = useStack();
  const { orders, listings, confirmDestination, completePayout } = useStore();
  const order = orders.find((o) => o.id === current.params?.orderId);
  const listing = order ? listings.find((l) => l.id === order.listingId) : undefined;
  const [destination, setDestination] = useState(DESTINATIONS[0]);

  if (!order || !listing) return null;

  const { sellerPayout } = commissionFor(order);
  const paidOut = order.payoutStatus === "paid_out";

  const onConfirm = async () => {
    await confirmDestination(order.id);
    await completePayout(order.id);
  };

  if (paidOut) {
    return (
      <View style={styles.container}>
        <Header title="Payout" />
        <View style={styles.centeredContent}>
          <Text style={styles.successMark}>✓</Text>
          <Text style={styles.heading}>Paid out</Text>
          <Text style={styles.sub}>
            {formatMoney(sellerPayout)} sent to {destination}.
          </Text>
        </View>
        <View style={styles.footer}>
          <PrimaryButton label="Back to Discover" onPress={() => reset("Discover")} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Claim" />
      <View style={styles.content}>
        <Text style={styles.badge}>SIMULATED — wayto.you claim page</Text>
        <Text style={styles.heading}>{formatMoney(sellerPayout)}</Text>
        <Text style={styles.sub}>For "{listing.title.sellerSelectedValue}". Choose where this payout lands.</Text>

        <Text style={styles.sectionLabel}>Payout destination</Text>
        {DESTINATIONS.map((d) => (
          <Text
            key={d}
            onPress={() => setDestination(d)}
            style={[styles.destination, destination === d ? styles.destinationActive : undefined]}
          >
            {d}
          </Text>
        ))}

        <Text style={styles.note}>
          Only production-confirmed payout destinations are shown here. Tap or Lean executes the transfer — this
          repo never processes it directly.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Confirm and receive payout" onPress={onConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, flex: 1 },
  centeredContent: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.md },
  badge: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.primary,
    backgroundColor: colors.highlight,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: spacing.md,
  },
  heading: { fontSize: 28, fontWeight: typography.weights.heading as "700", color: colors.text },
  sub: { fontSize: 14, color: colors.text, opacity: 0.75, marginBottom: spacing.lg, textAlign: "center" },
  sectionLabel: { fontSize: 14, fontWeight: typography.weights.bodyMedium as "500", color: colors.text, marginBottom: spacing.sm },
  destination: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: spacing.sm + 2,
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  destinationActive: { borderColor: colors.primary, backgroundColor: colors.highlight },
  note: { fontSize: 12, color: colors.text, opacity: 0.6, lineHeight: 18, marginTop: spacing.sm },
  successMark: {
    fontSize: 40,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
