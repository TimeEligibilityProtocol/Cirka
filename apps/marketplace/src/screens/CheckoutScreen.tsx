import { getCategory } from "@wearto-you/domain";
import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

const METHODS = ["Card", "Apple Pay", "Google Pay", "Lean Pay by Bank"];

export function CheckoutScreen() {
  const { current, push } = useStack();
  const { listings, createOrder, markPaid } = useStore();
  const listing = listings.find((l) => l.id === current.params?.listingId);
  const [method, setMethod] = useState(METHODS[0]);
  const [paying, setPaying] = useState(false);

  if (!listing) return null;

  const breakdown = {
    total: listing.price,
    commission: { amountMinor: Math.round(listing.price.amountMinor * 0.1), currency: listing.price.currency },
    sellerPayout: { amountMinor: Math.round(listing.price.amountMinor * 0.9), currency: listing.price.currency },
  };

  const onPay = () => {
    setPaying(true);
    const order = createOrder(listing.id);
    markPaid(order.id, listing.id);
    push("OrderStatus", { orderId: order.id });
  };

  return (
    <View style={styles.container}>
      <Header title="Checkout" />
      <View style={styles.content}>
        <Text style={styles.itemTitle}>{listing.title.sellerSelectedValue}</Text>
        <Text style={styles.itemSub}>{getCategory(listing.categoryId)?.labelEn}</Text>

        <View style={styles.card}>
          <Row label="Buyer pays for item" value={formatMoney(breakdown.total)} />
          <Row label="Platform commission (10%)" value={formatMoney(breakdown.commission)} muted />
          <Row label="Seller receives" value={formatMoney(breakdown.sellerPayout)} strong />
        </View>

        <Text style={styles.sectionLabel}>Payment method</Text>
        <View style={styles.methods}>
          {METHODS.map((m) => (
            <Text
              key={m}
              onPress={() => setMethod(m)}
              style={[styles.method, method === m ? styles.methodActive : undefined]}
            >
              {m}
            </Text>
          ))}
        </View>

        <Text style={styles.note}>
          Regulated payment operator confirms this payment. wearto.you never holds your funds — after delivery and
          acceptance, payout is addressed to the seller's verified identity.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label={paying ? "Processing…" : `Pay ${formatMoney(breakdown.total)}`} onPress={onPay} />
      </View>
    </View>
  );
}

function Row({ label, value, muted, strong }: { label: string; value: string; muted?: boolean; strong?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, muted ? styles.muted : undefined]}>{label}</Text>
      <Text style={[styles.rowValue, strong ? styles.strong : undefined]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, flex: 1 },
  itemTitle: { fontSize: 20, fontWeight: typography.weights.heading as "700", color: colors.text },
  itemSub: { fontSize: 14, color: colors.text, opacity: 0.7, marginBottom: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xs },
  rowLabel: { fontSize: 14, color: colors.text },
  rowValue: { fontSize: 14, color: colors.text, fontWeight: typography.weights.bodyMedium as "500" },
  muted: { opacity: 0.6 },
  strong: { fontWeight: typography.weights.price as "600", fontSize: 16 },
  sectionLabel: { fontSize: 14, fontWeight: typography.weights.bodyMedium as "500", color: colors.text, marginBottom: spacing.sm },
  methods: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: spacing.lg },
  method: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.text,
  },
  methodActive: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  note: { fontSize: 12, color: colors.text, opacity: 0.6, lineHeight: 18 },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
