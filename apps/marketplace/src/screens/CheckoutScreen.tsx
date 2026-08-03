import { getCategory } from "@wearto-you/domain";
import { colors, IMAGE_CONTAINER_BACKGROUND, radii, spacing, typography } from "@wearto-you/ui";
import { useEffect, useState } from "react";
import { Image, ImageStyle, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { aed, formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

// Layout constants scoped to this screen only — not promoted to shared
// tokens, per the instruction to fix this screen's layout without
// touching the rest of the design system.
const DESKTOP_MIN = 1024;
const TABLET_MIN = 768;
const DESKTOP_MAX_WIDTH = 1120;
const DESKTOP_SIDEBAR_WIDTH = 380;
const TABLET_MAX_WIDTH = 760;

const FREE_DELIVERY_THRESHOLD_MINOR = 30000; // AED 300
const COURIER_FEE_MINOR = 1500; // AED 15

const DELIVERY_OPTIONS = [
  {
    id: "courier",
    label: "Courier delivery",
    detail: "2–3 days",
    feeMinor: (itemMinor: number) => (itemMinor >= FREE_DELIVERY_THRESHOLD_MINOR ? 0 : COURIER_FEE_MINOR),
  },
  {
    id: "pickup",
    label: "Personal pickup",
    detail: "Dubai · QR handoff on collection",
    feeMinor: () => 0,
  },
] as const;

/**
 * Only offer payment methods that can realistically work on this device.
 * Google Pay and Lean Pay by Bank are not wired to any real detection or
 * integration yet, so they're left out entirely rather than shown as
 * dead options — see docs/payments/wayto-you-findings.md.
 */
function useAvailablePaymentMethods(): string[] {
  const [applePayAvailable, setApplePayAvailable] = useState(false);

  useEffect(() => {
    const session = (globalThis as { ApplePaySession?: { canMakePayments: () => boolean } }).ApplePaySession;
    if (session) {
      try {
        setApplePayAvailable(session.canMakePayments());
      } catch {
        setApplePayAvailable(false);
      }
    }
  }, []);

  return applePayAvailable ? ["Card", "Apple Pay"] : ["Card"];
}

export function CheckoutScreen() {
  const { current, push } = useStack();
  const { listings, createOrder, markPaid } = useStore();
  const listing = listings.find((l) => l.id === current.params?.listingId);
  const methods = useAvailablePaymentMethods();
  const [method, setMethod] = useState(methods[0]);
  const [deliveryId, setDeliveryId] = useState<(typeof DELIVERY_OPTIONS)[number]["id"]>("courier");
  const [paying, setPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const { width } = useWindowDimensions();

  const isDesktop = width >= DESKTOP_MIN;
  const isTablet = width >= TABLET_MIN && width < DESKTOP_MIN;
  const isCompact = !isDesktop && !isTablet;

  if (!listing) return null;

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryId)!;
  const deliveryFeeMinor = delivery.feeMinor(listing.price.amountMinor);
  const totalMinor = listing.price.amountMinor + deliveryFeeMinor;
  const total = aed(totalMinor / 100);

  const onPay = () => {
    if (paying) return;
    setPaymentError(null);
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      const order = createOrder(listing.id);
      markPaid(order.id, listing.id);
      push("OrderStatus", { orderId: order.id });
    }, 600);
  };

  const onSimulateFailure = () => {
    if (paying) return;
    setPaymentError("Payment couldn't be confirmed by the payment operator. No charge was made — please try again.");
  };

  const productSection = (
    <View style={styles.card}>
      <View style={styles.productRow}>
        <View style={styles.thumbWrap}>
          <Image
            source={listing.imageSource}
            style={[styles.thumb, { resizeMode: "cover" }] as ImageStyle[]}
            accessibilityLabel={listing.imageAlt}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {listing.title.sellerSelectedValue}
          </Text>
          <Text style={styles.itemMeta}>{getCategory(listing.categoryId)?.labelEn}</Text>
          <Text style={styles.itemMeta}>
            {[listing.size.sellerSelectedValue, listing.condition.sellerSelectedValue].filter(Boolean).join(" · ")}
          </Text>
          <Text style={styles.itemPrice}>{formatMoney(listing.price)}</Text>
        </View>
      </View>
    </View>
  );

  const deliverySection = (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>Delivery</Text>
      {DELIVERY_OPTIONS.map((opt) => {
        const fee = opt.feeMinor(listing.price.amountMinor);
        const active = opt.id === deliveryId;
        return (
          <Pressable key={opt.id} onPress={() => setDeliveryId(opt.id)} style={[styles.optionRow, active ? styles.optionRowActive : undefined]}>
            <View style={styles.optionTextCol}>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              <Text style={styles.optionDetail}>{opt.detail}</Text>
            </View>
            <Text style={styles.optionFee}>{fee === 0 ? "Free" : formatMoney(aed(fee / 100))}</Text>
          </Pressable>
        );
      })}
    </View>
  );

  const paymentSection = (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>Payment method</Text>
      <ScrollView horizontal={isCompact} showsHorizontalScrollIndicator={false} style={styles.methods}>
        {methods.map((m) => (
          <Text
            key={m}
            onPress={() => setMethod(m)}
            style={[styles.method, method === m ? styles.methodActive : undefined]}
          >
            {m}
          </Text>
        ))}
      </ScrollView>

      <Pressable onPress={() => setShowPaymentInfo((v) => !v)}>
        <Text style={styles.note}>
          Secure payment processed by our regulated payment partner. <Text style={styles.noteLink}>How payments work</Text>
        </Text>
      </Pressable>
      {showPaymentInfo ? (
        <Text style={styles.noteExpanded}>
          wearto.you never holds your funds — after delivery and acceptance, the seller's payout is addressed to
          their verified identity, not routed through this checkout.
        </Text>
      ) : null}

      {paymentError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{paymentError}</Text>
        </View>
      ) : null}
      <Text onPress={onSimulateFailure} style={styles.previewErrorLink}>
        Preview: simulate payment error
      </Text>
    </View>
  );

  const summaryCard = (
    <View style={[styles.card, styles.summaryCard]}>
      <Text style={styles.sectionLabel}>Order summary</Text>
      <Row label="Item" value={formatMoney(listing.price)} />
      <Row label="Delivery" value={deliveryFeeMinor === 0 ? "Free" : formatMoney(aed(deliveryFeeMinor / 100))} />
      <View style={styles.divider} />
      <Row label="Total" value={formatMoney(total)} strong />
      <PrimaryButton
        label={paying ? "Processing…" : `Pay ${formatMoney(total)}`}
        onPress={onPay}
        style={styles.summaryPayButton}
      />
    </View>
  );

  if (isDesktop) {
    return (
      <View style={styles.container}>
        <Header title="Checkout" />
        <ScrollView contentContainerStyle={styles.desktopScrollContent}>
          <View style={styles.desktopRow}>
            <View style={styles.desktopLeftCol}>
              {productSection}
              {deliverySection}
              {paymentSection}
            </View>
            <View style={styles.desktopRightCol}>{summaryCard}</View>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (isTablet) {
    return (
      <View style={styles.container}>
        <Header title="Checkout" />
        <ScrollView contentContainerStyle={styles.tabletScrollContent}>
          <View style={styles.tabletCol}>
            {productSection}
            {deliverySection}
            {paymentSection}
            {summaryCard}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Checkout" />
      <ScrollView contentContainerStyle={styles.mobileContent}>
        {productSection}
        {deliverySection}
        {paymentSection}
      </ScrollView>
      <View style={styles.mobileFooter}>
        <Row label="Total" value={formatMoney(total)} strong />
        <PrimaryButton label={paying ? "Processing…" : `Pay ${formatMoney(total)}`} onPress={onPay} style={styles.mobilePayButton} />
      </View>
    </View>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, strong ? styles.rowLabelStrong : undefined]}>{label}</Text>
      <Text style={[styles.rowValue, strong ? styles.strong : undefined]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Desktop (>=1024px): two columns, capped width, sidebar summary card.
  desktopScrollContent: { alignItems: "center", paddingVertical: 32 },
  desktopRow: {
    flexDirection: "row",
    width: "100%",
    maxWidth: DESKTOP_MAX_WIDTH,
    paddingHorizontal: 40,
    gap: 40,
    alignItems: "flex-start",
  },
  desktopLeftCol: { flex: 1 },
  desktopRightCol: {
    width: DESKTOP_SIDEBAR_WIDTH,
    // @ts-expect-error - RNW-only CSS position value
    position: "sticky",
    top: 96,
  },

  // Tablet (768-1023px): single column, capped width.
  tabletScrollContent: { alignItems: "center", paddingVertical: 24 },
  tabletCol: { width: "100%", maxWidth: TABLET_MAX_WIDTH, paddingHorizontal: 24 },

  // Mobile (<768px): single column, sticky pay bar.
  mobileContent: { padding: spacing.md, paddingBottom: spacing.xl },
  mobileFooter: {
    padding: spacing.md,
    paddingBottom: spacing.md + 8, // approximates safe-area-inset-bottom
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  mobilePayButton: { marginTop: spacing.xs },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryCard: { marginBottom: 0 },
  summaryPayButton: { marginTop: spacing.sm },

  productRow: { flexDirection: "row", gap: spacing.sm },
  thumbWrap: {
    width: 112,
    aspectRatio: 0.8,
    borderRadius: radii.card,
    overflow: "hidden",
    backgroundColor: IMAGE_CONTAINER_BACKGROUND,
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  productInfo: { flex: 1, justifyContent: "center" },
  itemTitle: { fontSize: 16, fontWeight: typography.weights.heading as "700", color: colors.text },
  itemMeta: { fontSize: 13, color: colors.text, opacity: 0.65, marginTop: 2 },
  itemPrice: { fontSize: 16, fontWeight: typography.weights.price as "600", color: colors.text, marginTop: 6 },

  sectionLabel: { fontSize: 14, fontWeight: typography.weights.bodyMedium as "500", color: colors.text, marginBottom: spacing.sm },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: spacing.sm + 2,
    marginBottom: spacing.xs,
  },
  optionRowActive: { borderColor: colors.primary, backgroundColor: colors.highlight },
  optionTextCol: {},
  optionLabel: { fontSize: 14, fontWeight: typography.weights.bodyMedium as "500", color: colors.text },
  optionDetail: { fontSize: 12, color: colors.text, opacity: 0.6, marginTop: 2 },
  optionFee: { fontSize: 14, color: colors.text },

  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xs },
  rowLabel: { fontSize: 14, color: colors.text, opacity: 0.7 },
  rowLabelStrong: { opacity: 1, fontWeight: typography.weights.bodyMedium as "500" },
  rowValue: { fontSize: 14, color: colors.text },
  strong: { fontWeight: typography.weights.price as "600", fontSize: 16 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },

  methods: { flexDirection: "row", marginBottom: spacing.sm },
  method: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.text,
    marginRight: 8,
  },
  methodActive: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  note: { fontSize: 12, color: colors.text, opacity: 0.7, lineHeight: 18 },
  noteLink: { color: colors.primary, fontWeight: typography.weights.bodyMedium as "500" },
  noteExpanded: { fontSize: 12, color: colors.text, opacity: 0.6, lineHeight: 18, marginTop: spacing.xs },
  errorBanner: {
    marginTop: spacing.sm,
    backgroundColor: colors.highlight,
    borderRadius: radii.card,
    padding: spacing.sm,
  },
  errorText: { fontSize: 12, color: colors.primaryPressed, lineHeight: 17 },
  previewErrorLink: {
    fontSize: 11,
    color: colors.text,
    opacity: 0.4,
    marginTop: spacing.sm,
  },
});
