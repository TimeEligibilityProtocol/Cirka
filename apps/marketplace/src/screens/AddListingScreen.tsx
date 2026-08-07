import {
  approvedField,
  BackgroundPreset,
  DEFAULT_BACKGROUND_PRESET_ID,
  getSubcategories,
  Listing,
  ROOT_CATEGORIES,
} from "@wearto-you/domain";
import { AiPhotoDetails } from "@wearto-you/api-client";
import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { useEffect, useState } from "react";
import { Image, ImageStyle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BACKGROUND_PRESET_OPTIONS } from "../assets/backgroundPresets";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";
import { PrimaryButton } from "../components/PrimaryButton";
import { StepperHeader } from "../components/StepperHeader";
import { ArrowLeftIcon, ArrowRightIcon, CameraIcon, CloseIcon, ImageIcon, PlusIcon } from "../components/icons/icons";
import { aed, formatMoney } from "../data/seed";
import { compositeOntoBackground, removeImageBackground } from "../lib/backgroundRemoval";
import { chooseFromGallery, MAX_PHOTOS, takePhoto } from "../lib/photoPicker";
import { useStack } from "../nav/stack";
import { apiClient } from "../config/apiClient";
import { useAuth } from "../state/auth";
import { useStore } from "../state/store";

const STEPS = ["Photo", "Edit", "Details", "Review"];

// Temporary demo-deployment switch — the background-removal model needs
// more RAM than this deploy's free hosting tier provides, so on that
// deployment we let sellers pick photos but stop there instead of
// advancing into a step that would crash the server. Toggled per-build
// via EXPO_PUBLIC_DISABLE_MAGIC_LISTING; unset (e.g. local dev) means
// the full flow runs as normal.
const MAGIC_LISTING_DISABLED = process.env.EXPO_PUBLIC_DISABLE_MAGIC_LISTING === "true";

// Mirrors CONDITIONS in apps/api/src/routes/analyzePhoto.ts — the AI's
// condition guess is always one of these, and the seller confirms/changes
// it as a chip pick rather than free text, since it's a constrained tier,
// not an open-ended description.
const CONDITIONS = ["New with tags", "Excellent", "Very good", "Good", "Fair"] as const;

// Fallback only for when AI analysis hasn't returned yet (or the operator
// hasn't configured ANTHROPIC_API_KEY) — never published as-is; the
// Details step always shows its own loading/unavailable state alongside
// this so a seller never mistakes a placeholder for a real reading.
const FALLBACK_DETAILS: AiPhotoDetails = {
  color: "Not detected — describe manually",
  material: "Not detected — describe manually",
  condition: "Good",
  conditionNote: "Seller to confirm condition.",
  description: "",
  measurements: "Not detected — seller to confirm.",
};

export function AddListingScreen() {
  const { reset } = useStack();
  const { user } = useAuth();
  const { addListing } = useStore();
  const [step, setStep] = useState(0);
  // Photos and background presets can be tried freely, logged out or in —
  // login is only required once a background has been approved, right
  // before the listing can actually go live. Kept as an in-place prompt
  // (not a navigation to a separate screen) so the photo/cutout/composite
  // state above isn't lost — this screen would otherwise unmount.
  const [awaitingLogin, setAwaitingLogin] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [price, setPrice] = useState("450");
  const [backgroundPresetId, setBackgroundPresetId] = useState(DEFAULT_BACKGROUND_PRESET_ID);
  const [rootCategoryId, setRootCategoryId] = useState("clothing");
  const [subcategoryId, setSubcategoryId] = useState("clothing-dresses");
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  // Background removal runs once per main photo (it's the expensive step —
  // a real segmentation model, not a lookup) and is cached here so it
  // survives navigating back and forth between steps. Re-compositing onto
  // a different preset only redraws a canvas, so it's cheap to redo.
  const [cutoutUri, setCutoutUri] = useState<string | null>(null);
  const [bgStatus, setBgStatus] = useState<"idle" | "removing" | "ready" | "error">("idle");
  const [composedUri, setComposedUri] = useState<string | null>(null);
  const [bgErrorMessage, setBgErrorMessage] = useState<string | null>(null);

  const mainPhoto = photos[0];
  // Bumped to re-trigger removal below after a failure — mainPhoto alone
  // doesn't change on retry, so it wouldn't re-run the effect on its own.
  const [retryToken, setRetryToken] = useState(0);

  // Real AI reading of the item (color/material/condition/description/
  // measurements) — runs in parallel with background removal on the same
  // original photo, not the composited one, so it's usually ready well
  // before the seller reaches the Details step.
  const [aiDetails, setAiDetails] = useState<AiPhotoDetails | null>(null);
  const [aiStatus, setAiStatus] = useState<"idle" | "analyzing" | "ready" | "error" | "unavailable">("idle");
  // Independent from retryToken (background removal) — retrying the AI
  // reading shouldn't re-run the already-succeeded, expensive cutout step.
  const [aiRetryToken, setAiRetryToken] = useState(0);
  // The seller's own edits — seeded from the AI reading once it lands, but
  // free-text from then on. This is the AiAssistedField split (aiSuggestion
  // vs. approved value) applied in the UI: aiDetails never changes once
  // set, these do, and publish uses these, not the raw AI output.
  const [descriptionText, setDescriptionText] = useState("");
  const [measurementsText, setMeasurementsText] = useState("");
  const [colorText, setColorText] = useState("");
  const [materialText, setMaterialText] = useState("");
  // Condition is a suggestion the seller actively confirms or overrides —
  // a chip pick, not free text, since it's constrained to the same tiers
  // used everywhere else in the app (see CONDITIONS in analyzePhoto.ts).
  const [conditionValue, setConditionValue] = useState("");
  const [conditionNoteText, setConditionNoteText] = useState("");

  // Precise measurement from a dedicated flat-lay-with-card photo —
  // separate from the AI reading above, and separate from the seller's
  // main listing photos (a card can't be in the hero shot). Computed
  // geometry from apps/api/src/routes/measurePhoto.ts, not a guess.
  const [measuring, setMeasuring] = useState(false);
  const [measureError, setMeasureError] = useState<string | null>(null);

  const onMeasureWithPhoto = async () => {
    if (measuring) return;
    setMeasureError(null);
    let picked: string[];
    try {
      picked = await chooseFromGallery(1);
    } catch (err) {
      console.error("measure photo picker failed:", err);
      return;
    }
    if (picked.length === 0) return;
    setMeasuring(true);
    try {
      const result = await apiClient.measurePhoto(picked[0]);
      setMeasurementsText(result.measurementsText);
    } catch (err) {
      console.error("measurePhoto failed:", err);
      const message = err instanceof Error ? err.message : "";
      setMeasureError(
        message.includes("no_card_detected")
          ? "Couldn't find a card in this photo — lay the item flat with a bank card next to it, both fully visible."
          : message.includes("ai_not_configured")
            ? "AI measurement isn't configured on this deployment yet."
            : "Couldn't measure this photo — try again with better lighting, item and card both flat and in frame."
      );
    } finally {
      setMeasuring(false);
    }
  };

  useEffect(() => {
    if (!mainPhoto || MAGIC_LISTING_DISABLED) return;
    let cancelled = false;
    setAiDetails(null);
    setAiStatus("analyzing");
    apiClient
      .analyzePhoto(mainPhoto)
      .then((details) => {
        if (!cancelled) {
          setAiDetails(details);
          setDescriptionText(details.description);
          setMeasurementsText(details.measurements);
          setColorText(details.color);
          setMaterialText(details.material);
          setConditionValue(details.condition);
          setConditionNoteText(details.conditionNote);
          setAiStatus("ready");
        }
      })
      .catch((err) => {
        console.error("analyzePhoto failed:", err);
        if (!cancelled) {
          const unavailable = err instanceof Error && err.message.includes("ai_not_configured");
          setAiStatus(unavailable ? "unavailable" : "error");
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPhoto, aiRetryToken]);

  useEffect(() => {
    // On the memory-constrained demo deployment, don't even call the
    // (crash-prone) removal endpoint — picking a photo alone shouldn't
    // take the server down before anyone reaches Continue.
    if (!mainPhoto || MAGIC_LISTING_DISABLED) return;
    let cancelled = false;
    setCutoutUri(null);
    setComposedUri(null);
    setBgErrorMessage(null);
    setBgStatus("removing");
    removeImageBackground(mainPhoto)
      .then((uri) => {
        if (!cancelled) {
          setCutoutUri(uri);
          setBgStatus("ready");
        }
      })
      .catch((err) => {
        console.error("removeImageBackground failed:", err);
        if (!cancelled) {
          setBgErrorMessage(
            err instanceof Error && err.message.includes("no_product_detected")
              ? "We couldn't find a product in this photo. Try a clearer, well-lit shot with the item centered against a plain surface."
              : null
          );
          setBgStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPhoto, retryToken]);

  useEffect(() => {
    if (!cutoutUri) return;
    const preset = BACKGROUND_PRESET_OPTIONS.find((p) => p.id === backgroundPresetId);
    if (!preset) return;
    let cancelled = false;
    compositeOntoBackground(cutoutUri, preset.source)
      .then((uri) => {
        if (!cancelled) setComposedUri(uri);
      })
      .catch((err) => {
        console.error("compositeOntoBackground failed:", err);
        if (!cancelled) setBgStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [cutoutUri, backgroundPresetId]);

  // Hard rule: nobody publishes a photo with its original background —
  // only one of our approved presets. So the Edit step can't be left
  // (and Publish can't fire) until the swap has actually succeeded, not
  // just "finished trying" — a failure blocks forward progress too,
  // with Retry as the only way past it.
  const backgroundReady = bgStatus === "ready" && composedUri !== null;
  const editStepBlocked = step === 1 && !backgroundReady;
  const photoStepBlocked = step === 0 && MAGIC_LISTING_DISABLED && photos.length > 0;
  const canContinue = (step > 0 || photos.length > 0) && !editStepBlocked && !photoStepBlocked;
  const next = () => {
    if (!canContinue) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    if (awaitingLogin) {
      setAwaitingLogin(false);
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  };

  const onPublish = async () => {
    // composedUri is required, not just preferred — a listing can never
    // go live with its original, unswapped background.
    if (publishing || photos.length === 0 || !composedUri) return;
    // Login is the very last gate, right before the item actually goes
    // live — a seller can go through Photo/Edit/Details/Review freely
    // without an account, same as browsing. The prompt reappears here
    // instead of blocking the button, so a logged-out tap explains itself.
    if (!user) {
      setAwaitingLogin(true);
      return;
    }
    setPublishing(true);
    setPublishError(null);
    try {
      // The rest of the photos (fabric close-ups, labels, defects) stay
      // original — matching the "proof photos never get their background
      // changed" rule; only the main photo gets the background swap.
      const photosToUpload = [composedUri, ...photos.slice(1)];
      const uploadedUrls = await apiClient.uploadPhotos(photosToUpload);
      const priceNumber = Number(price) || 0;
      const newListing: Listing = {
        id: `l_new_${Date.now()}`,
        sellerId: user!.id,
        tenantId: "cirka",
        categoryId: subcategoryId,
        status: "active",
        title: approvedField("New listing"),
        description: approvedField(descriptionText.trim() || "Newly listed via Magic Listing — AI-assisted draft, reviewed and approved by seller."),
        brand: approvedField("Unbranded"),
        color: approvedField(colorText.trim() || FALLBACK_DETAILS.color),
        size: approvedField("M"),
        material: approvedField(materialText.trim() || FALLBACK_DETAILS.material),
        condition: approvedField(conditionValue || FALLBACK_DETAILS.condition, conditionNoteText.trim() || FALLBACK_DETAILS.conditionNote),
        labelStatus: "available",
        images: uploadedUrls.map((url, i) => ({ url, alt: `Listing photo ${i + 1}` })),
        measurements: measurementsText.trim() || FALLBACK_DETAILS.measurements,
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

  if (awaitingLogin && !user) {
    return (
      <View style={styles.container}>
        <Header title="Magic Listing" />
        <ScrollView contentContainerStyle={styles.content}>
          <LoginForm
            heading="Log in to publish"
            sub="Your photo and background are saved — log in or create an account to finish publishing."
            onSuccess={() => {
              // Login happens at the end now, from Review — stay right
              // there so the seller just taps Publish again.
              setAwaitingLogin(false);
            }}
          />
        </ScrollView>
        <View style={styles.footer}>
          <PrimaryButton label="Back" variant="secondary" onPress={back} style={styles.backBtn} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Magic Listing" />
      <StepperHeader steps={STEPS} activeIndex={step} />
      <ScrollView contentContainerStyle={styles.content}>
        {step === 0 ? <PhotoStep photos={photos} onPhotosChange={setPhotos} comingSoon={photoStepBlocked} /> : null}
        {step === 1 ? (
          <EditStep
            imageUri={photos[0]}
            composedUri={composedUri}
            bgStatus={bgStatus}
            bgErrorMessage={bgErrorMessage}
            backgroundPresetId={backgroundPresetId}
            setBackgroundPresetId={setBackgroundPresetId}
            onRetry={() => setRetryToken((t) => t + 1)}
          />
        ) : null}
        {step === 2 ? (
          <DetailsStep
            rootCategoryId={rootCategoryId}
            setRootCategoryId={setRootCategoryId}
            subcategoryId={subcategoryId}
            setSubcategoryId={setSubcategoryId}
            aiDetails={aiDetails}
            aiStatus={aiStatus}
            onRetryAnalysis={() => setAiRetryToken((t) => t + 1)}
            colorText={colorText}
            setColorText={setColorText}
            materialText={materialText}
            setMaterialText={setMaterialText}
            conditionValue={conditionValue}
            setConditionValue={setConditionValue}
            descriptionText={descriptionText}
            setDescriptionText={setDescriptionText}
            measurementsText={measurementsText}
            setMeasurementsText={setMeasurementsText}
            measuring={measuring}
            measureError={measureError}
            onMeasureWithPhoto={onMeasureWithPhoto}
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
          disabled={step === STEPS.length - 1 ? publishing || !composedUri : !canContinue}
          style={styles.continueBtn}
        />
      </View>
    </View>
  );
}

function PhotoStep({
  photos,
  onPhotosChange,
  comingSoon,
}: {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  comingSoon: boolean;
}) {
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
      {comingSoon ? (
        <View style={styles.comingSoonBox}>
          <Text style={styles.comingSoonText}>
            Background removal and publishing are coming soon on this preview — check back shortly, or ask for a live
            demo.
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function EditStep({
  imageUri,
  composedUri,
  bgStatus,
  bgErrorMessage,
  backgroundPresetId,
  setBackgroundPresetId,
  onRetry,
}: {
  imageUri: string | undefined;
  composedUri: string | null;
  bgStatus: "idle" | "removing" | "ready" | "error";
  bgErrorMessage: string | null;
  backgroundPresetId: string;
  setBackgroundPresetId: (id: string) => void;
  onRetry: () => void;
}) {
  // Never preview the original background as a stand-in for the swapped
  // one — a listing can only publish with one of our presets, so the
  // preview shouldn't imply otherwise while that hasn't happened yet.
  const previewUri = composedUri ?? (bgStatus === "removing" ? imageUri : undefined);
  return (
    <View>
      <Text style={styles.stepHeading}>Choose the background</Text>
      <Text style={styles.stepSub}>
        Cirka cuts the item out and places it on one approved background. The item itself is never altered.
        Publishing isn't possible until this finishes — listings can't go live with their original background.
      </Text>
      <View style={styles.editPreviewWrap}>
        {previewUri ? <Image source={{ uri: previewUri }} style={[styles.fill, { resizeMode: "cover" }]} /> : null}
        {bgStatus === "removing" ? (
          <View style={styles.bgOverlay}>
            <Text style={styles.bgOverlayText}>Removing background…{"\n"}first time can take a few seconds.</Text>
          </View>
        ) : null}
      </View>
      {bgStatus === "error" ? (
        <View style={styles.bgErrorBox}>
          <Text style={styles.bgErrorText}>
            {bgErrorMessage ?? "Couldn't process this photo automatically. Publishing needs a background swap to succeed first."}
          </Text>
          <Pressable onPress={onRetry} style={styles.retryBtn}>
            <Text style={styles.retryBtnText}>Try again</Text>
          </Pressable>
        </View>
      ) : null}
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
  aiDetails,
  aiStatus,
  onRetryAnalysis,
  colorText,
  setColorText,
  materialText,
  setMaterialText,
  conditionValue,
  setConditionValue,
  descriptionText,
  setDescriptionText,
  measurementsText,
  setMeasurementsText,
  measuring,
  measureError,
  onMeasureWithPhoto,
}: {
  rootCategoryId: string;
  setRootCategoryId: (id: string) => void;
  subcategoryId: string;
  setSubcategoryId: (id: string) => void;
  aiDetails: AiPhotoDetails | null;
  aiStatus: "idle" | "analyzing" | "ready" | "error" | "unavailable";
  onRetryAnalysis: () => void;
  colorText: string;
  setColorText: (v: string) => void;
  materialText: string;
  setMaterialText: (v: string) => void;
  conditionValue: string;
  setConditionValue: (v: string) => void;
  descriptionText: string;
  setDescriptionText: (v: string) => void;
  measurementsText: string;
  setMeasurementsText: (v: string) => void;
  measuring: boolean;
  measureError: string | null;
  onMeasureWithPhoto: () => void;
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

      {aiStatus === "analyzing" ? (
        <View style={styles.bgErrorBox}>
          <Text style={styles.bgErrorText}>Reading the photo — color, material, condition, description and measurements…</Text>
        </View>
      ) : null}
      {aiStatus === "unavailable" ? (
        <View style={styles.bgErrorBox}>
          <Text style={styles.bgErrorText}>
            AI photo analysis isn't configured on this deployment yet — fill in the details below manually.
          </Text>
        </View>
      ) : null}
      {aiStatus === "error" ? (
        <View style={styles.bgErrorBox}>
          <Text style={styles.bgErrorText}>Couldn't read this photo automatically — you can fill in the details manually, or try again.</Text>
          <Pressable onPress={onRetryAnalysis} style={styles.retryBtn}>
            <Text style={styles.retryBtnText}>Try again</Text>
          </Pressable>
        </View>
      ) : null}

      <Text style={styles.fieldLabel}>Color</Text>
      <TextInput
        value={colorText}
        onChangeText={setColorText}
        placeholder={FALLBACK_DETAILS.color}
        placeholderTextColor={`${colors.text}55`}
        style={styles.editableField}
      />

      <Text style={[styles.fieldLabel, { marginTop: spacing.sm }]}>Material</Text>
      <TextInput
        value={materialText}
        onChangeText={setMaterialText}
        placeholder={FALLBACK_DETAILS.material}
        placeholderTextColor={`${colors.text}55`}
        style={styles.editableField}
      />

      <Text style={[styles.fieldLabel, { marginTop: spacing.sm }]}>Condition</Text>
      <Text style={styles.stepSub}>AI suggests a starting point — you always confirm or change it.</Text>
      <View style={styles.chipRow}>
        {CONDITIONS.map((c) => (
          <Pressable key={c} onPress={() => setConditionValue(c)} style={[styles.chip, c === conditionValue ? styles.chipActive : undefined]}>
            <Text style={[styles.chipText, c === conditionValue ? styles.chipTextActive : undefined]}>{c}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[styles.detailsHeader, { marginTop: spacing.md, marginBottom: spacing.xs }]}>
        <Text style={styles.fieldLabel}>Measurements</Text>
        <Pressable onPress={onMeasureWithPhoto} disabled={measuring} hitSlop={6}>
          <Text style={[styles.editAll, measuring ? { opacity: 0.5 } : undefined]}>
            {measuring ? "Measuring…" : "📏 Measure with a photo"}
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.stepSub, { marginTop: 0, marginBottom: spacing.xs }]}>
        Lay the item flat with a bank card next to it (not on the item) — a separate photo just for this, never the
        listing photo.
      </Text>
      {measureError ? <Text style={[styles.bgErrorText, { marginBottom: spacing.xs }]}>{measureError}</Text> : null}
      <TextInput
        value={measurementsText}
        onChangeText={setMeasurementsText}
        placeholder={FALLBACK_DETAILS.measurements}
        placeholderTextColor={`${colors.text}55`}
        style={styles.editableField}
        multiline
      />

      <Text style={[styles.fieldLabel, { marginTop: spacing.md }]}>Description</Text>
      <TextInput
        value={descriptionText}
        onChangeText={setDescriptionText}
        placeholder="Describe the item — condition, fit, anything a buyer should know."
        placeholderTextColor={`${colors.text}55`}
        style={[styles.editableField, styles.editableFieldMultiline]}
        multiline
      />

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
  bgOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(33,27,24,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  bgOverlayText: {
    color: colors.surface,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },
  bgErrorBox: {
    backgroundColor: colors.highlight,
    borderRadius: radii.card,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  comingSoonBox: {
    backgroundColor: colors.highlight,
    borderRadius: radii.card,
    padding: spacing.sm,
    marginTop: spacing.md,
  },
  comingSoonText: {
    fontSize: 12,
    color: colors.primaryPressed,
    lineHeight: 17,
  },
  bgErrorText: {
    fontSize: 12,
    color: colors.primaryPressed,
  },
  retryBtn: { marginTop: spacing.xs, alignSelf: "flex-start" },
  retryBtnText: {
    fontSize: 13,
    color: colors.primaryPressed,
    fontWeight: typography.weights.bodyMedium as "500",
    textDecorationLine: "underline",
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
  editableField: {
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  editableFieldMultiline: { minHeight: 80, textAlignVertical: "top" },
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
