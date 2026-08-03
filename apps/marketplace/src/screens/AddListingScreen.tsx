import {
  approvedField,
  BackgroundPreset,
  DEFAULT_BACKGROUND_PRESET_ID,
  getSubcategories,
  Listing,
  ROOT_CATEGORIES,
} from "@wearto-you/domain";
import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BACKGROUND_PRESET_OPTIONS } from "../assets/backgroundPresets";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { StepperHeader } from "../components/StepperHeader";
import { aed, formatMoney } from "../data/seed";
import { useStack } from "../nav/stack";
import { listingImageUrl, useStore } from "../state/store";

const STEPS = ["Photo", "Edit", "Details", "Review"];

const DETECTED = {
  color: "Cream",
  material: "Viscose blend",
  condition: "Excellent",
};

export function AddListingScreen() {
  const { reset } = useStack();
  const { listings, addListing } = useStore();
  const [step, setStep] = useState(0);
  const [price, setPrice] = useState("450");
  const [backgroundPresetId, setBackgroundPresetId] = useState(DEFAULT_BACKGROUND_PRESET_ID);
  const [rootCategoryId, setRootCategoryId] = useState("clothing");
  const [subcategoryId, setSubcategoryId] = useState("clothing-dresses");
  const [publishing, setPublishing] = useState(false);

  // The item the seller "just photographed" for this walkthrough — reuses
  // a real approved demo photo already served by the API, rather than a
  // second copy bundled into this app. See docs/product/source-assets.
  const capturedListing = listings.find((l) => l.id === "demo-dress-001");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onPublish = async () => {
    if (publishing || !capturedListing) return;
    setPublishing(true);
    const priceNumber = Number(price) || 0;
    const newListing: Listing = {
      id: `l_new_${Date.now()}`,
      sellerId: "seller_demo",
      tenantId: "wearto_you",
      categoryId: subcategoryId,
      status: "active",
      title: approvedField(capturedListing.title.sellerSelectedValue ?? "New listing"),
      description: approvedField("Newly listed via Magic Listing — AI-assisted draft, reviewed and approved by seller."),
      brand: approvedField("Unbranded"),
      color: approvedField(DETECTED.color),
      size: approvedField("M"),
      material: approvedField(DETECTED.material),
      condition: approvedField(DETECTED.condition, "Like new."),
      labelStatus: "available",
      images: capturedListing.images,
      measurements: "64 cm (W) × 112 cm (L)",
      price: aed(priceNumber),
      negotiable: false,
      minimumOfferMinor: null,
      createdAt: new Date(0).toISOString(),
      lastConfirmedAvailableAt: new Date(0).toISOString(),
      expiresAt: null,
    };
    try {
      await addListing(newListing);
      reset("Discover");
    } finally {
      setPublishing(false);
    }
  };

  if (!capturedListing) {
    return (
      <View style={styles.container}>
        <Header title="Magic Listing" />
        <View style={styles.content}>
          <Text style={styles.stepSub}>Loading…</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Magic Listing" />
      <StepperHeader steps={STEPS} activeIndex={step} />
      <ScrollView contentContainerStyle={styles.content}>
        {step === 0 ? <PhotoStep imageUri={listingImageUrl(capturedListing)} /> : null}
        {step === 1 ? (
          <EditStep
            imageUri={listingImageUrl(capturedListing)}
            backgroundPresetId={backgroundPresetId}
            setBackgroundPresetId={setBackgroundPresetId}
          />
        ) : null}
        {step === 2 ? (
          <DetailsStep
            rootCategoryId={rootCategoryId}
            setRootCategoryId={setRootCategoryId}
            subcategoryId={subcategoryId}
            setSubcategoryId={setSubcategoryId}
          />
        ) : null}
        {step === 3 ? <ReviewStep price={price} setPrice={setPrice} /> : null}
      </ScrollView>
      <View style={styles.footer}>
        {step > 0 ? <PrimaryButton label="Back" variant="secondary" onPress={back} style={styles.backBtn} /> : null}
        <PrimaryButton
          label={step === STEPS.length - 1 ? (publishing ? "Publishing…" : "Publish") : "Continue"}
          onPress={step === STEPS.length - 1 ? onPublish : next}
          style={styles.continueBtn}
        />
      </View>
    </View>
  );
}

function PhotoStep({ imageUri }: { imageUri: string }) {
  return (
    <View>
      <Text style={styles.stepHeading}>Photograph the item</Text>
      <Text style={styles.stepSub}>Front, back, fabric close-up, label — follow the category guide.</Text>
      <View style={styles.photoGrid}>
        <Image source={{ uri: imageUri }} style={[styles.photoTile, { resizeMode: "cover" }]} />
        <View style={[styles.photoTile, styles.photoTilePlaceholder]}>
          <Text style={styles.photoPlus}>+</Text>
        </View>
      </View>
      <Text style={styles.modeNote}>
        Live background — the preview shows the approved background before you shoot. If the preview is slow,
        flickers, or the phone can't keep up, wearto.you switches to "take a plain photo, we'll clean it up
        automatically" on its own. Either way, the published photo looks the same.
      </Text>
    </View>
  );
}

function EditStep({
  imageUri,
  backgroundPresetId,
  setBackgroundPresetId,
}: {
  imageUri: string;
  backgroundPresetId: string;
  setBackgroundPresetId: (id: string) => void;
}) {
  return (
    <View>
      <Text style={styles.stepHeading}>Choose the background</Text>
      <Text style={styles.stepSub}>
        wearto.you cuts the item out and places it on one approved background. The item itself is never altered.
      </Text>
      <View style={styles.editPreviewWrap}>
        <Image source={{ uri: imageUri }} style={[styles.fill, { resizeMode: "cover" }]} />
      </View>
      <View style={styles.presetRow}>
        {BACKGROUND_PRESET_OPTIONS.map((preset: BackgroundPreset & { source: number }) => {
          const active = preset.id === backgroundPresetId;
          return (
            <Pressable key={preset.id} onPress={() => setBackgroundPresetId(preset.id)} style={styles.presetTile}>
              <View style={[styles.presetSwatchWrap, active ? styles.presetSwatchActive : undefined]}>
                <Image source={preset.source} style={[styles.fill, { resizeMode: "cover" }]} />
              </View>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.stepSub}>
        Label, defect and serial-number photos always stay on a plain background, or keep the original if cutting
        them out would make the proof less trustworthy.
      </Text>
    </View>
  );
}

function DetailsStep({
  rootCategoryId,
  setRootCategoryId,
  subcategoryId,
  setSubcategoryId,
}: {
  rootCategoryId: string;
  setRootCategoryId: (id: string) => void;
  subcategoryId: string;
  setSubcategoryId: (id: string) => void;
}) {
  const subcategories = getSubcategories(rootCategoryId);
  const currentSub = subcategories.find((s) => s.id === subcategoryId);

  return (
    <View>
      <View style={styles.detailsHeader}>
        <Text style={styles.stepHeading}>Detected details</Text>
        <Text style={styles.editAll}>Edit all</Text>
      </View>

      <Text style={styles.fieldLabel}>Category</Text>
      <View style={styles.chipRow}>
        {ROOT_CATEGORIES.map((root) => (
          <Pressable
            key={root.id}
            onPress={() => {
              setRootCategoryId(root.id);
              const firstChild = getSubcategories(root.id)[0];
              if (firstChild) setSubcategoryId(firstChild.id);
            }}
            style={[styles.chip, root.id === rootCategoryId ? styles.chipActive : undefined]}
          >
            <Text style={[styles.chipText, root.id === rootCategoryId ? styles.chipTextActive : undefined]}>
              {root.labelEn}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRowScroll}>
        {subcategories.map((sub) => (
          <Pressable
            key={sub.id}
            onPress={() => setSubcategoryId(sub.id)}
            style={[styles.chip, sub.id === subcategoryId ? styles.chipActive : undefined]}
          >
            <Text style={[styles.chipText, sub.id === subcategoryId ? styles.chipTextActive : undefined]}>
              {sub.labelEn}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.categorySummary}>
        Selected: {ROOT_CATEGORIES.find((r) => r.id === rootCategoryId)?.labelEn} › {currentSub?.labelEn}
      </Text>

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
  modeNote: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    lineHeight: 18,
    backgroundColor: colors.highlight,
    borderRadius: radii.card,
    padding: spacing.sm,
  },
  photoGrid: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md },
  photoTile: { width: 120, height: 150, borderRadius: radii.card, backgroundColor: colors.neutralSurface },
  photoTilePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  photoPlus: { fontSize: 28, color: colors.text, opacity: 0.4 },
  editPreviewWrap: {
    width: "100%",
    aspectRatio: 0.8,
    borderRadius: radii.card,
    overflow: "hidden",
    backgroundColor: colors.neutralSurface,
    marginBottom: spacing.md,
  },
  fill: { width: "100%", height: "100%" },
  presetRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md },
  presetTile: { flex: 1 },
  presetSwatchWrap: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: radii.card / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  presetSwatchActive: {
    borderColor: colors.primary,
  },
  detailsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  editAll: { fontSize: 13, color: colors.primary, fontWeight: typography.weights.bodyMedium as "500" },
  fieldLabel: { fontSize: 13, color: colors.text, opacity: 0.6, marginBottom: spacing.xs },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: spacing.sm },
  chipRowScroll: { marginBottom: spacing.xs },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, color: colors.text, fontWeight: typography.weights.bodyMedium as "500" },
  chipTextActive: { color: colors.surface },
  categorySummary: { fontSize: 12, color: colors.text, opacity: 0.6, marginBottom: spacing.md },
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
