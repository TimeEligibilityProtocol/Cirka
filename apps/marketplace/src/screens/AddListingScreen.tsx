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
import { Image, ImageStyle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BACKGROUND_PRESET_OPTIONS } from "../assets/backgroundPresets";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { StepperHeader } from "../components/StepperHeader";
import { ArrowLeftIcon, ArrowRightIcon, CameraIcon, CloseIcon, ImageIcon, PlusIcon } from "../components/icons/icons";
import { aed, formatMoney } from "../data/seed";
import { chooseFromGallery, MAX_PHOTOS, takePhoto } from "../lib/photoPicker";
import { useStack } from "../nav/stack";
import { apiClient } from "../config/apiClient";
import { useStore } from "../state/store";

const STEPS = ["Photo", "Edit", "Details", "Review"];

const DETECTED = {
  color: "Cream",
  material: "Viscose blend",
  condition: "Excellent",
};

export function AddListingScreen() {
  const { reset } = useStack();
  const { addListing } = useStore();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [price, setPrice] = useState("450");
  const [backgroundPresetId, setBackgroundPresetId] = useState(DEFAULT_BACKGROUND_PRESET_ID);
  const [rootCategoryId, setRootCategoryId] = useState("clothing");
  const [subcategoryId, setSubcategoryId] = useState("clothing-dresses");
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const canContinue = step > 0 || photos.length > 0;
  const next = () => {
    if (!canContinue) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onPublish = async () => {
    if (publishing || photos.length === 0) return;
    setPublishing(true);
    setPublishError(null);
    try {
      const uploadedUrls = await apiClient.uploadPhotos(photos);
      const priceNumber = Number(price) || 0;
      const newListing: Listing = {
        id: `l_new_${Date.now()}`,
        sellerId: "seller_demo",
        tenantId: "wearto_you",
        categoryId: subcategoryId,
        status: "active",
        title: approvedField("New listing"),
        description: approvedField("Newly listed via Magic Listing — AI-assisted draft, reviewed and approved by seller."),
        brand: approvedField("Unbranded"),
        color: approvedField(DETECTED.color),
        size: approvedField("M"),
        material: approvedField(DETECTED.material),
        condition: approvedField(DETECTED.condition, "Like new."),
        labelStatus: "available",
        images: uploadedUrls.map((url, i) => ({ url, alt: `Listing photo ${i + 1}` })),
        measurements: "64 cm (W) × 112 cm (L)",
        price: aed(priceNumber),
        negotiable: false,
        minimumOfferMinor: null,
        createdAt: new Date(0).toISOString(),
        lastConfirmedAvailableAt: new Date(0).toISOString(),
        expiresAt: null,
      };
      await addListing(newListing);
      reset("Discover");
    } catch {
      setPublishError("Couldn't publish your listing — check your connection and try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Magic Listing" />
      <StepperHeader steps={STEPS} activeIndex={step} />
      <ScrollView contentContainerStyle={styles.content}>
        {step === 0 ? <PhotoStep photos={photos} onPhotosChange={setPhotos} /> : null}
        {step === 1 ? (
          <EditStep
            imageUri={photos[0]}
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
        {publishError ? <Text style={styles.publishError}>{publishError}</Text> : null}
      </ScrollView>
      <View style={styles.footer}>
        {step > 0 ? <PrimaryButton label="Back" variant="secondary" onPress={back} style={styles.backBtn} /> : null}
        <PrimaryButton
          label={step === STEPS.length - 1 ? (publishing ? "Publishing…" : "Publish") : "Continue"}
          onPress={step === STEPS.length - 1 ? onPublish : next}
          disabled={step === STEPS.length - 1 ? publishing : !canContinue}
          style={styles.continueBtn}
        />
      </View>
    </View>
  );
}

function PhotoStep({ photos, onPhotosChange }: { photos: string[]; onPhotosChange: (photos: string[]) => void }) {
  const [busy, setBusy] = useState(false);

  const addPhotos = async (picker: () => Promise<string[]>) => {
    if (busy || photos.length >= MAX_PHOTOS) return;
    setBusy(true);
    try {
      const picked = await picker();
      if (picked.length > 0) onPhotosChange([...photos, ...picked].slice(0, MAX_PHOTOS));
    } finally {
      setBusy(false);
    }
  };

  const removeAt = (index: number) => onPhotosChange(photos.filter((_, i) => i !== index));

  const swap = (a: number, b: number) => {
    const next = [...photos];
    [next[a], next[b]] = [next[b], next[a]];
    onPhotosChange(next);
  };

  if (photos.length === 0) {
    return (
      <View>
        <Text style={styles.stepHeading}>Photograph the item</Text>
        <Text style={styles.stepSub}>Front, back, fabric close-up, label — follow the category guide.</Text>
        <View style={styles.pickerRow}>
          <Pressable style={styles.pickerButton} onPress={() => addPhotos(takePhoto)} disabled={busy}>
            <CameraIcon size={26} color={colors.primary} />
            <Text style={styles.pickerButtonLabel}>Take a photo</Text>
          </Pressable>
          <Pressable style={styles.pickerButton} onPress={() => addPhotos(() => chooseFromGallery(MAX_PHOTOS))} disabled={busy}>
            <ImageIcon size={26} color={colors.primary} />
            <Text style={styles.pickerButtonLabel}>Choose from gallery</Text>
          </Pressable>
        </View>
        {busy ? <Text style={styles.stepSub}>Opening…</Text> : null}
      </View>
    );
  }

  return (
    <View>
      <View style={styles.photoStepHeader}>
        <Text style={styles.stepHeading}>Your photos</Text>
        <Text style={styles.photoCount}>
          {photos.length}/{MAX_PHOTOS}
        </Text>
      </View>
      <Text style={styles.stepSub}>The first photo is your main photo — it's what buyers see first in the feed.</Text>
      <View style={styles.photoGrid}>
        {photos.map((uri, index) => (
          <View key={uri} style={styles.photoTileWrap}>
            <Image source={{ uri }} style={[styles.photoTile, { resizeMode: "cover" }] as ImageStyle[]} />
            {index === 0 ? (
              <View style={styles.mainBadge}>
                <Text style={styles.mainBadgeText}>Main</Text>
              </View>
            ) : null}
            <Pressable style={styles.removeBtn} onPress={() => removeAt(index)} accessibilityLabel="Remove photo" hitSlop={6}>
              <CloseIcon size={12} color={colors.surface} />
            </Pressable>
            <View style={styles.reorderRow}>
              <Pressable
                disabled={index === 0}
                onPress={() => swap(index, index - 1)}
                style={styles.reorderBtn}
                accessibilityLabel="Move photo earlier"
              >
                <ArrowLeftIcon size={13} color={index === 0 ? colors.border : colors.text} />
              </Pressable>
              <Pressable
                disabled={index === photos.length - 1}
                onPress={() => swap(index, index + 1)}
                style={styles.reorderBtn}
                accessibilityLabel="Move photo later"
              >
                <ArrowRightIcon size={13} color={index === photos.length - 1 ? colors.border : colors.text} />
              </Pressable>
            </View>
          </View>
        ))}
        {photos.length < MAX_PHOTOS ? (
          <Pressable
            style={[styles.photoTile, styles.addTile]}
            onPress={() => addPhotos(() => chooseFromGallery(MAX_PHOTOS - photos.length))}
            disabled={busy}
          >
            <PlusIcon size={20} color={colors.text} />
            <Text style={styles.addTileLabel}>Add photo</Text>
          </Pressable>
        ) : null}
      </View>
      <Pressable onPress={() => addPhotos(takePhoto)} disabled={busy || photos.length >= MAX_PHOTOS}>
        <Text style={styles.addMoreLink}>+ Take another photo</Text>
      </Pressable>
    </View>
  );
}

function EditStep({
  imageUri,
  backgroundPresetId,
  setBackgroundPresetId,
}: {
  imageUri: string | undefined;
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
        <Image source={{ uri: imageUri ?? "" }} style={[styles.fill, { resizeMode: "cover" }]} />
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
  publishError: {
    fontSize: 13,
    color: colors.primaryPressed,
    backgroundColor: colors.highlight,
    borderRadius: radii.card,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  pickerRow: { flexDirection: "row", gap: spacing.sm },
  pickerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    minHeight: 140,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    backgroundColor: colors.surface,
  },
  pickerButtonLabel: {
    fontSize: 14,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
  },
  photoStepHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.xs },
  photoCount: { fontSize: 13, color: colors.text, opacity: 0.55 },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md },
  photoTile: { width: 104, height: 130, borderRadius: radii.card, backgroundColor: colors.neutralSurface },
  photoTileWrap: { width: 104 },
  mainBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  mainBadgeText: { fontSize: 10, fontWeight: typography.weights.bodyMedium as "500", color: colors.surface },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(33,27,24,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  reorderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  reorderBtn: {
    width: 28,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  addTile: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    backgroundColor: colors.surface,
  },
  addTileLabel: { fontSize: 12, color: colors.text, opacity: 0.7 },
  addMoreLink: {
    fontSize: 13,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.primary,
    marginBottom: spacing.md,
  },
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
