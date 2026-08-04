import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { useAuth } from "../state/auth";
import { useStore } from "../state/store";

function statusLabel(payoutStatus: string, deliveryStatus: string) {
  if (payoutStatus === "paid_out") return "Paid out";
  if (payoutStatus === "destination_confirmed") return "Payout in progress";
  if (payoutStatus === "claim_sent") return "Claim sent";
  if (payoutStatus === "payout_pending") return "Payout pending";
  if (deliveryStatus === "delivered") return "Awaiting acceptance";
  return "In progress";
}

export function ProfileScreen() {
  const { orders, listings, removeListing } = useStore();
  const { push } = useStack();
  const { user, logout } = useAuth();

  const myListings = user ? listings.filter((l) => l.sellerId === user.id) : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Profile</Text>

      {user ? (
        <View style={styles.accountRow}>
          <View>
            <Text style={styles.orderTitle}>{user.displayName}</Text>
            <Text style={styles.mutedText}>{user.email}</Text>
          </View>
          <Pressable onPress={logout}>
            <Text style={styles.logoutLink}>Log out</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.orderCard}>
          <Text style={styles.mutedText}>Log in to sell items and manage your listings.</Text>
          <Pressable onPress={() => push("Login")} style={styles.loginLinkBtn}>
            <Text style={styles.logoutLink}>Log in →</Text>
          </Pressable>
        </View>
      )}

      {user ? (
        <>
          <Text style={styles.sectionLabel}>My listings</Text>
          {myListings.length === 0 ? (
            <Text style={styles.empty}>You haven't listed anything yet.</Text>
          ) : (
            myListings.map((listing) => (
              <View key={listing.id} style={styles.orderCard}>
                <View style={styles.orderRow}>
                  <Text style={styles.orderTitle}>{listing.title.sellerSelectedValue}</Text>
                  <Text style={styles.orderPrice}>{formatMoney(listing.price)}</Text>
                </View>
                <Pressable onPress={() => removeListing(listing.id)}>
                  <Text style={styles.removeLink}>Remove listing</Text>
                </Pressable>
              </View>
            ))
          )}
        </>
      ) : null}

      <Text style={styles.sectionLabel}>My orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.empty}>No orders yet — buy something from Discover to see it here.</Text>
      ) : (
        orders.map((order) => {
          const listing = listings.find((l) => l.id === order.listingId);
          if (!listing) return null;
          return (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderRow}>
                <Text style={styles.orderTitle}>{listing.title.sellerSelectedValue}</Text>
                <Text style={styles.orderPrice}>{formatMoney(order.priceAtOrder)}</Text>
              </View>
              <Text
                style={styles.orderStatus}
                onPress={() =>
                  order.payoutStatus === "not_started"
                    ? push("OrderStatus", { orderId: order.id })
                    : push("ClaimDetail", { orderId: order.id })
                }
              >
                {statusLabel(order.payoutStatus, order.deliveryStatus)} →
              </Text>
            </View>
          );
        })
      )}

      <Text style={styles.sectionLabel}>Account</Text>
      <View style={styles.orderCard}>
        <Text style={styles.orderTitle}>Payout channel</Text>
        <Text style={styles.mutedText}>Email or WhatsApp — set per claim, wayto.you-verified identity.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: { fontSize: 30, fontWeight: typography.weights.heading as "700", color: colors.text, marginBottom: spacing.md },
  sectionLabel: {
    fontSize: 13,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
    opacity: 0.6,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  },
  empty: { fontSize: 13, color: colors.text, opacity: 0.6 },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  orderRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  orderTitle: { fontSize: 15, fontWeight: typography.weights.bodyMedium as "500", color: colors.text },
  orderPrice: { fontSize: 15, color: colors.text },
  orderStatus: { fontSize: 13, color: colors.primary, fontWeight: typography.weights.bodyMedium as "500" },
  mutedText: { fontSize: 13, color: colors.text, opacity: 0.6, marginTop: 2 },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  logoutLink: { fontSize: 13, color: colors.primary, fontWeight: typography.weights.bodyMedium as "500" },
  loginLinkBtn: { marginTop: spacing.sm },
  removeLink: { fontSize: 13, color: colors.primaryPressed, fontWeight: typography.weights.bodyMedium as "500", marginTop: 6 },
});
