import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { PlaceholderTile } from "../components/PlaceholderTile";
import { PrimaryButton } from "../components/PrimaryButton";
import { StepperHeader } from "../components/StepperHeader";
import { aed, approved, DemoListing, formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

const STEPS = ["Photo", "Edit", "Details", "Review"];

const DETECTED = {
  category: "Dress",
  color: "Cream",
  material: "Linen Blend",
  condition: "Excellent",
};

const DEMO_SEED = "new-listing";

export function AddListingScreen() {
  const { reset } = useStack();
  const { addListing } = useStore();
  const [step, setStep] = useState(0);
  const [price, setPrice] = useState("450");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onPublish = () => {
    const priceNumber = Number(price) || 0;
    const newListing: DemoListing = {
      id: `l_new_${Date.now()}`,
      sellerId: "seller_demo",
      tenantId: "wearto_you",
      category: "clothing",
      status: "active",
      title: approved("Pleated Midi Dress"),
      description: approved("Newly listed via Magic Listing — AI-assisted draft, reviewed and approved by seller."),
      brand: approved("Reformation"),
      color: approved(DETECTED.color),
      size: approved("M"),
      material: approved(DETECTED.material),
      condition: approved(DETECTED.condition),
      labelStatus: "available",
      price: aed(priceNumber),
      negotiable: false,
      minimumOfferMinor: null,
      createdAt: new Date(0).toISOString(),
      lastConfirmedAvailableAt: new Date(0).toISOString(),
      expiresAt: null,
      images: [DEMO_SEED],
      brand2: "Reformation",
      conditionLabel: "Excellent — like new.",
      measurements: "64 cm (W) × 112 cm (L)",
    };
    addListing(newListing);
    reset("Discover");
  };

  return (
    <View style={styles.container}>
      <Header title="Magic Listing" />
      <StepperHeader steps={STEPS} activeIndex={step} />
      <ScrollView contentContainerStyle={styles.content}>
        {step === 0 ? <PhotoStep /> : null}
        {step === 1 ? <EditStep /> : null}
        {step === 2 ? <DetailsStep /> : null}
        {step === 3 ? <ReviewStep price={price} setPrice={setPrice} /> : null}
      </ScrollView>
      <View style={styles.footer}>
        {step > 0 ? <PrimaryButton label="Back" variant="secondary" onPress={back} style={styles.backBtn} /> : null}
        <PrimaryButton
          label={step === STEPS.length - 1 ? "Publish" : "Continue"}
          onPress={step === STEPS.length - 1 ? onPublish : next}
          style={styles.continueBtn}
        />
      </View>
    </View>
  );
}

function PhotoStep() {
  return (
    <View>
      <Text style={styles.stepHeading}>Photograph the item</Text>
      <Text style={styles.stepSub}>Front, back, fabric close-up, label — follow the category guide.</Text>
      <View style={styles.photoGrid}>
        <PlaceholderTile seed={DEMO_SEED} label="Dress" style={styles.photoTile} />
        <View style={[styles.photoTile, styles.photoTilePlaceholder]}>
          <Text style={styles.photoPlus}>+</Text>
        </View>
      </View>
    </View>
  );
}

function EditStep() {
  return (
    <View>
      <Text style={styles.stepHeading}>Background cleanup</Text>
      <Text style={styles.stepSub}>Approved warm studio background, applied automatically. Item is never altered.</Text>
      <View style={styles.compareRow}>
        <View style={styles.compareCol}>
          <PlaceholderTile seed={DEMO_SEED} label="Dress" style={styles.compareImage} />
          <Text style={styles.compareLabel}>Original</Text>
        </View>
        <View style={styles.compareCol}>
          <PlaceholderTile seed={DEMO_SEED} label="Dress" variant="cutout" style={styles.compareImage} />
          <Text style={styles.compareLabel}>Background removed</Text>
        </View>
      </View>
    </View>
  );
}

function DetailsStep() {
  return (
    <View>
      <View style={styles.detailsHeader}>
        <Text style={styles.stepHeading}>Detected details</Text>
        <Text style={styles.editAll}>Edit all</Text>
      </View>
      {Object.entries(DETECTED).map(([key, value]) => (
        <View key={key} style={styles.detailRow}>
          <Text style={styles.detailLabel}>{key[0].toUpperCase() + key.slice(1)}</Text>
          <View style={styles.detailValueRow}>
            <Text style={styles.detailValue}>{value}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>
      ))}
      <Text style={styles.stepSub}>
        Each field carries the AI suggestion and your approved value separately — the public listing only ever
        shows what you approved.
      </Text>
    </View>
  );
}

function ReviewStep({ price, setPrice }: { price: string; setPrice: (v: string) => void }) {
  const priceNumber = Number(price) || 0;
  const commission = Math.round(priceNumber * 0.1);
  const youReceive = priceNumber - commission;
  return (
    <View>
      <Text style={styles.stepHeading}>Set your price</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceCurrency}>AED</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="number-pad"
          style={styles.priceInput}
        />
      </View>
      <View style={styles.calcCard}>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Buyer pays</Text>
          <Text style={styles.calcValue}>{formatMoney(aed(priceNumber))}</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>You receive after commission</Text>
          <Text style={styles.calcValueStrong}>{formatMoney(aed(youReceive))}</Text>
        </View>
      </View>
      <Text style={styles.stepSub}>
        By publishing you confirm the item description is accurate and you have the right to sell it.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  stepHeading: { fontSize: 20, fontWeight: typography.weights.heading as "700", color: colors.text, marginBottom: spacing.xs },
  stepSub: { fontSize: 13, color: colors.text, opacity: 0.65, lineHeight: 19, marginBottom: spacing.md },
  photoGrid: { flexDirection: "row", gap: spacing.sm },
  photoTile: { width: 120, height: 150, borderRadius: radii.card, backgroundColor: colors.neutralSurface },
  photoTilePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  photoPlus: { fontSize: 28, color: colors.text, opacity: 0.4 },
  compareRow: { flexDirection: "row", gap: spacing.sm },
  compareCol: { flex: 1, alignItems: "center" },
  compareImage: { width: "100%", aspectRatio: 0.8, borderRadius: radii.card, backgroundColor: colors.neutralSurface },
  compareImageBg: { borderWidth: 1, borderColor: colors.primary },
  compareLabel: { fontSize: 12, color: colors.text, opacity: 0.7, marginTop: spacing.xs },
  detailsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  editAll: { fontSize: 13, color: colors.primary, fontWeight: typography.weights.bodyMedium as "500" },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: { fontSize: 14, color: colors.text },
  detailValueRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  detailValue: { fontSize: 14, color: colors.text, opacity: 0.75 },
  chevron: { fontSize: 18, color: colors.text, opacity: 0.4 },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  priceCurrency: { fontSize: 16, color: colors.text, opacity: 0.6, marginRight: spacing.xs },
  priceInput: { flex: 1, fontSize: 20, color: colors.text, paddingVertical: spacing.sm + 2, fontWeight: typography.weights.price as "600" },
  calcCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  calcRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xs },
  calcLabel: { fontSize: 14, color: colors.text, opacity: 0.7 },
  calcValue: { fontSize: 14, color: colors.text },
  calcValueStrong: { fontSize: 16, color: colors.text, fontWeight: typography.weights.price as "600" },
  footer: {
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  backBtn: { flex: 1 },
  continueBtn: { flex: 2 },
});
