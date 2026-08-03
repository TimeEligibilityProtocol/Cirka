import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

export function QRHandoffScreen() {
  const { current, push } = useStack();
  const { orders, confirmPickup } = useStore();
  const order = orders.find((o) => o.id === current.params?.orderId);

  const token = useMemo(() => `wearto.you:order:${order?.id ?? "unknown"}`, [order?.id]);
  const code = useMemo(() => String(Math.floor(100000 + Math.random() * 900000)), [order?.id]);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(token)}`;

  if (!order) return null;

  const onConfirm = async () => {
    await confirmPickup(order.id);
    push("PayoutClaim", { orderId: order.id });
  };

  return (
    <View style={styles.container}>
      <Header title="Personal pickup" />
      <View style={styles.content}>
        <Text style={styles.heading}>Show this to the seller</Text>
        <Text style={styles.sub}>She scans the QR — or enters the 6-digit code if scanning isn't available.</Text>

        <View style={styles.qrCard}>
          <Image source={{ uri: qrUrl }} style={styles.qr} />
          <Text style={styles.codeLabel}>Backup code</Text>
          <Text style={styles.code}>{code}</Text>
        </View>

        <Text style={styles.note}>
          This token is single-order, single-use, short-TTL, and never contains personal or financial data. It does
          not authenticate the item itself.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Simulate: seller scanned it" onPress={onConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, flex: 1, alignItems: "center" },
  heading: { fontSize: 20, fontWeight: typography.weights.heading as "700", color: colors.text, marginTop: spacing.md },
  sub: { fontSize: 13, color: colors.text, opacity: 0.7, textAlign: "center", marginBottom: spacing.lg },
  qrCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  qr: { width: 200, height: 200, marginBottom: spacing.md },
  codeLabel: { fontSize: 12, color: colors.text, opacity: 0.6 },
  code: { fontSize: 28, fontWeight: typography.weights.heading as "700", color: colors.primary, letterSpacing: 4 },
  note: { fontSize: 12, color: colors.text, opacity: 0.6, textAlign: "center", lineHeight: 18 },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
