import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { commissionFor, useStore } from "../state/store";

// Channel choice is client-side UI state for now — not yet persisted by
// the API (the backend just has a single "claim_sent" transition). Will
// move server-side once wayto.you's own claim-channel API is wired up.
type ClaimChannel = "email" | "whatsapp";

export function PayoutClaimScreen() {
  const { current, push } = useStack();
  const { orders, listings, sendClaim } = useStore();
  const order = orders.find((o) => o.id === current.params?.orderId);
  const listing = order ? listings.find((l) => l.id === order.listingId) : undefined;
  const [channel, setChannel] = useState<ClaimChannel>("email");

  if (!order || !listing) return null;

  const { sellerPayout } = commissionFor(order);

  const onSend = async () => {
    await sendClaim(order.id);
    push("ClaimDetail", { orderId: order.id });
  };

  return (
    <View style={styles.container}>
      <Header title="Seller view" />
      <View style={styles.content}>
        <Text style={styles.badge}>SIMULATED — wayto.you routing</Text>
        <Text style={styles.heading}>Sale approved</Text>
        <Text style={styles.sub}>
          "{listing.title.sellerSelectedValue}" was picked up and accepted. A payout instruction of{" "}
          {formatMoney(sellerPayout)} is now addressed to your verified identity — not to a saved account number.
        </Text>

        <Text style={styles.sectionLabel}>Send my claim link via</Text>
        <View style={styles.channelRow}>
          {(["email", "whatsapp"] as ClaimChannel[]).map((c) => (
            <Text
              key={c}
              onPress={() => setChannel(c)}
              style={[styles.channel, channel === c ? styles.channelActive : undefined]}
            >
              {c === "email" ? "Verified email" : "WhatsApp"}
            </Text>
          ))}
        </View>

        <Text style={styles.note}>
          Cirka never shows you a wallet balance. You receive a secure claim for this specific payout and pick
          where it lands.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Send claim link" onPress={onSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, flex: 1 },
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
  heading: { fontSize: 22, fontWeight: typography.weights.heading as "700", color: colors.text },
  sub: { fontSize: 14, color: colors.text, opacity: 0.75, lineHeight: 20, marginTop: spacing.xs, marginBottom: spacing.lg },
  sectionLabel: { fontSize: 14, fontWeight: typography.weights.bodyMedium as "500", color: colors.text, marginBottom: spacing.sm },
  channelRow: { flexDirection: "row", gap: 8, marginBottom: spacing.lg },
  channel: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.text,
  },
  channelActive: { borderColor: colors.primary, backgroundColor: colors.highlight },
  note: { fontSize: 12, color: colors.text, opacity: 0.6, lineHeight: 18 },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
