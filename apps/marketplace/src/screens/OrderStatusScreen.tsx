import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

const STEPS = ["Reserved", "Payment confirmed", "Delivered", "Awaiting acceptance"];

export function OrderStatusScreen() {
  const { current, push } = useStack();
  const { orders, listings } = useStore();
  const order = orders.find((o) => o.id === current.params?.orderId);
  const listing = order ? listings.find((l) => l.id === order.listingId) : undefined;

  if (!order || !listing) return null;

  const activeStep = order.deliveryStatus === "delivered" ? 3 : 2;

  return (
    <View style={styles.container}>
      <Header title="Order" />
      <View style={styles.content}>
        <Text style={styles.itemTitle}>{listing.title.sellerSelectedValue}</Text>
        <Text style={styles.price}>{formatMoney(order.priceAtOrder)}</Text>

        <View style={styles.timeline}>
          {STEPS.map((step, i) => (
            <View key={step} style={styles.stepRow}>
              <View style={[styles.dot, i <= activeStep ? styles.dotActive : undefined]} />
              <Text style={[styles.stepLabel, i <= activeStep ? styles.stepLabelActive : undefined]}>{step}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          For this demo, courier transit is simulated as already complete. In production, courier pickup/transit
          status is reported by the integrated CourierProvider.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="I received it and accept" onPress={() => push("QRHandoff", { orderId: order.id })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, flex: 1 },
  itemTitle: { fontSize: 20, fontWeight: typography.weights.heading as "700", color: colors.text },
  price: { fontSize: 16, color: colors.text, opacity: 0.7, marginBottom: spacing.lg },
  timeline: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.border, marginRight: spacing.sm },
  dotActive: { backgroundColor: colors.primary },
  stepLabel: { fontSize: 14, color: colors.text, opacity: 0.5 },
  stepLabelActive: { opacity: 1, fontWeight: typography.weights.bodyMedium as "500" },
  note: { fontSize: 12, color: colors.text, opacity: 0.6, lineHeight: 18 },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
