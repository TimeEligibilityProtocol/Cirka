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
import { useEffect, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
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

// This wizard is a single reading column, not a dashboard — on a wide
// browser window it should stay a comfortable, centered width instead of
// stretching edge to edge (matches the tablet column width used in
// CheckoutScreen). Same threshold also decides whether "Take a photo"
// (a device camera) is worth offering: below it we assume a phone, at or
// above it a tablet/desktop, where a seller almost never has photos to
// take right there and would use "Choose from gallery" either way.
const WIDE_SCREEN_MIN = 768;
const WIZARD_MAX_WIDTH = 640;

// The main photo's background is the seller's own choice (any preset with
// allowedForMainPhoto) — it's the styled hero shot. Every other angle photo
// always gets this one plain preset instead, no choice offered: a buyer
// scrolling through five photos where each has a different decorative
// scene reads as inconsistent/thrown-together, not five photos of the same
// carefully-shot item.
const EVIDENCE_BACKGROUND_PRESET = BACKGROUND_PRESET_OPTIONS.find((p) => p.allowedForEvidencePhoto) ?? BACKGROUND_PRESET_OPTIONS[0];

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

// Per-photo background-removal/compositing state — one of these per "angle"
// photo (see photoRoles in AddListingScreen). "Detail" photos never get one.
type BgEntry = {
  cutoutUri: string | null;
  bgStatus: "idle" | "removing" | "ready" | "error";
  bgErrorMessage: string | null;
  composedUri: string | null;
  offset: { x: number; y: number };
};
const EMPTY_BG_ENTRY: BgEntry = { cutoutUri: null, bgStatus: "idle", bgErrorMessage: null, composedUri: null, offset: { x: 0, y: 0 } };

export function AddListingScreen() {
  const { reset } = useStack();
  const { user } = useAuth();
  const { addListing } = useStore();
  const { width: windowWidth } = useWindowDimensions();
  const isWideScreen = windowWidth >= WIDE_SCREEN_MIN;
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

  // Every photo gets the magic-listing treatment (background cut out and
  // swapped for an approved preset) EXCEPT ones the seller explicitly marks
  // "Detail shot" — label/tag/close-up photos that are proof of condition,
  // not another angle of the item, and should stay exactly as shot. The
  // main photo (index 0) is always an angle shot; it can't be marked detail.
  // Keyed by photo URI rather than array index so reordering/removing
  // photos in PhotoStep can never desync a role from the wrong photo.
  const [photoRoles, setPhotoRoles] = useState<Record<string, "angle" | "detail">>({});
  const roleFor = (uri: string, index: number) => (index === 0 ? "angle" : photoRoles[uri] ?? "angle");
  const angleUris = photos.filter((uri, i) => roleFor(uri, i) === "angle");

  // Background removal + compositing per angle photo — keyed by URI for the
  // same reordering-safety reason as photoRoles above. Cached here (not in
  // EditStep) so it survives navigating back and forth between steps.
  const [bgByUri, setBgByUri] = useState<Record<string, BgEntry>>({});
  const allAngleReady = angleUris.length > 0 && angleUris.every((uri) => bgByUri[uri]?.bgStatus === "ready" && bgByUri[uri]?.composedUri);

  const mainPhoto = photos[0];

  // Runs background removal then composites onto the current preset for a
  // single photo. Used both by the auto-kickoff effect below (new angle
  // photos) and directly by the per-photo Retry button — retrying doesn't
  // need a token/dependency dance since this is called imperatively.
  const processPhoto = (uri: string) => {
    const preset = uri === mainPhoto ? BACKGROUND_PRESET_OPTIONS.find((p) => p.id === backgroundPresetId) : EVIDENCE_BACKGROUND_PRESET;
    if (!preset) return;
    setBgByUri((prev) => ({ ...prev, [uri]: { ...EMPTY_BG_ENTRY, bgStatus: "removing" } }));
    removeImageBackground(uri)
      .then((cutoutUri) =>
        compositeOntoBackground(cutoutUri, preset.source, { x: 0, y: 0 }).then((composedUri) => ({ cutoutUri, composedUri }))
      )
      .then(({ cutoutUri, composedUri }) => {
        setBgByUri((prev) => ({ ...prev, [uri]: { cutoutUri, bgStatus: "ready", bgErrorMessage: null, composedUri, offset: { x: 0, y: 0 } } }));
      })
      .catch((err) => {
        console.error("processPhoto failed:", err);
        const message =
          err instanceof Error && err.message.includes("no_product_detected")
            ? "We couldn't find a product in this photo. Try a clearer, well-lit shot with the item centered against a plain surface."
            : null;
        setBgByUri((prev) => ({ ...prev, [uri]: { ...EMPTY_BG_ENTRY, bgStatus: "error", bgErrorMessage: message } }));
      });
  };

  // Re-bakes one photo's composite at a new drag position — called once on
  // drag release, not on every move event, since each bake is a real
  // 1200x1500 canvas draw. During the drag itself, EditPhotoCard shows a
  // cheap live-positioned overlay instead of re-baking continuously.
  const rebakeComposite = (uri: string, offset: { x: number; y: number }) => {
    const entry = bgByUri[uri];
    if (!entry?.cutoutUri) return;
    const preset = uri === mainPhoto ? BACKGROUND_PRESET_OPTIONS.find((p) => p.id === backgroundPresetId) : EVIDENCE_BACKGROUND_PRESET;
    if (!preset) return;
    compositeOntoBackground(entry.cutoutUri, preset.source, offset)
      .then((composedUri) => setBgByUri((prev) => ({ ...prev, [uri]: { ...prev[uri], composedUri, offset } })))
      .catch((err) => console.error("compositeOntoBackground (reposition) failed:", err));
  };

  const setOffsetFor = (uri: string, offset: { x: number; y: number }) =>
    setBgByUri((prev) => (prev[uri] ? { ...prev, [uri]: { ...prev[uri], offset } } : prev));

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
  // Size isn't AI-detected (nothing about a photo tells you the label
  // inside the garment) — the seller types it directly. Asked for on the
  // Photo step rather than Details, since it's as essential as the photo
  // itself and shouldn't wait behind background removal/AI analysis.
  const [sizeText, setSizeText] = useState("");
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
    if (MAGIC_LISTING_DISABLED) return;
    angleUris.forEach((uri) => {
      if (!bgByUri[uri]) processPhoto(uri);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, photoRoles]);

  useEffect(() => {
    // Only fires when the seller changes the preset, not when a photo
    // finishes processing (processPhoto already composites onto the
    // current preset itself) — re-bakes the main photo's composite onto
    // the new preset, recentered, without re-running background removal.
    // Other angle photos always use EVIDENCE_BACKGROUND_PRESET, which
    // never changes here, so they don't need re-baking.
    if (!mainPhoto) return;
    const preset = BACKGROUND_PRESET_OPTIONS.find((p) => p.id === backgroundPresetId);
    const entry = bgByUri[mainPhoto];
    if (!preset || !entry?.cutoutUri) return;
    compositeOntoBackground(entry.cutoutUri, preset.source, { x: 0, y: 0 })
      .then((composedUri) => {
        setBgByUri((prev) => (prev[mainPhoto] ? { ...prev, [mainPhoto]: { ...prev[mainPhoto], composedUri, offset: { x: 0, y: 0 } } } : prev));
      })
      .catch((err) => console.error("recomposite on preset change failed:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundPresetId]);

  // Hard rule: nobody publishes a photo with its original background —
  // only one of our approved presets. So the Edit step can't be left
  // (and Publish can't fire) until the swap has actually succeeded, not
  // just "finished trying" — a failure blocks forward progress too,
  // with Retry as the only way past it.
  const editStepBlocked = step === 1 && !allAngleReady;
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
    // Every angle photo needs its composed image ready — a listing can
    // never go live with an original, unswapped background.
    if (publishing || photos.length === 0 || !allAngleReady) return;
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
      // Angle photos upload their composed (background-swapped) version;
      // detail shots (label/tag/close-up) stay exactly as the seller shot
      // them — that's the whole point of marking a photo "Detail".
      const photosToUpload = photos.map((uri, i) => (roleFor(uri, i) === "angle" ? bgByUri[uri]?.composedUri ?? uri : uri));
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
        size: approvedField(sizeText.trim() || "One size"),
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
          <View style={styles.wizardCol}>
            <LoginForm
              heading="Log in to publish"
              sub="Your photo and background are saved — log in or create an account to finish publishing."
              onSuccess={() => {
                // Login happens at the end now, from Review — stay right
                // there so the seller just taps Publish again.
                setAwaitingLogin(false);
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerInner}>
            <PrimaryButton label="Back" variant="secondary" onPress={back} style={styles.backBtn} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Magic Listing" />
      <StepperHeader steps={STEPS} activeIndex={step} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.wizardCol}>
        {step === 0 ? (
          <PhotoStep
            photos={photos}
            onPhotosChange={setPhotos}
            comingSoon={photoStepBlocked}
            showCameraOption={!isWideScreen}
            sizeText={sizeText}
            setSizeText={setSizeText}
            photoRoles={photoRoles}
            setPhotoRoles={setPhotoRoles}
          />
        ) : null}
        {step === 1 ? (
          <EditStep
            angleUris={angleUris}
            bgByUri={bgByUri}
            backgroundPresetId={backgroundPresetId}
            setBackgroundPresetId={setBackgroundPresetId}
            onRetry={processPhoto}
            setOffset={setOffsetFor}
            onRepositionEnd={rebakeComposite}
            detailCount={photos.length - angleUris.length}
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
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerInner}>
          {step > 0 ? <PrimaryButton label="Back" variant="secondary" onPress={back} style={styles.backBtn} /> : null}
          <PrimaryButton
            label={step === STEPS.length - 1 ? (publishing ? "Publishing…" : "Publish") : "Continue"}
            onPress={step === STEPS.length - 1 ? onPublish : next}
            disabled={step === STEPS.length - 1 ? publishing || !allAngleReady : !canContinue}
            style={styles.continueBtn}
          />
        </View>
      </View>
    </View>
  );
}

function PhotoStep({
  photos,
  onPhotosChange,
  comingSoon,
  showCameraOption,
  sizeText,
  setSizeText,
  photoRoles,
  setPhotoRoles,
}: {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  comingSoon: boolean;
  showCameraOption: boolean;
  sizeText: string;
  setSizeText: (v: string) => void;
  photoRoles: Record<string, "angle" | "detail">;
  setPhotoRoles: (updater: (prev: Record<string, "angle" | "detail">) => Record<string, "angle" | "detail">) => void;
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
        <Text style={styles.fieldLabel}>Size</Text>
        <TextInput
          value={sizeText}
          onChangeText={setSizeText}
          placeholder="e.g. M, EU 38, One size"
          placeholderTextColor={`${colors.text}55`}
          style={[styles.editableField, { marginBottom: spacing.md }]}
        />
        <View style={styles.pickerRow}>
          {showCameraOption ? (
            <Pressable style={styles.pickerButton} onPress={() => addPhotos(takePhoto)} disabled={busy}>
              <CameraIcon size={26} color={colors.primary} />
              <Text style={styles.pickerButtonLabel}>Take a photo</Text>
            </Pressable>
          ) : null}
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
      <Text style={styles.stepSub}>
        The first photo is your main photo — it's what buyers see first in the feed. Every photo tagged "Full shot"
        gets its background swapped the same way; tap a photo's tag to mark it "Detail shot" (label, tag, close-up)
        instead so it stays exactly as you shot it.
      </Text>
      <Text style={styles.fieldLabel}>Size</Text>
      <TextInput
        value={sizeText}
        onChangeText={setSizeText}
        placeholder="e.g. M, EU 38, One size"
        placeholderTextColor={`${colors.text}55`}
        style={[styles.editableField, { marginBottom: spacing.md }]}
      />
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
            {index > 0 ? (
              <Pressable
                onPress={() =>
                  setPhotoRoles((prev) => ({ ...prev, [uri]: (prev[uri] ?? "angle") === "angle" ? "detail" : "angle" }))
                }
                style={styles.roleToggle}
              >
                <Text style={styles.roleToggleText}>
                  {(photoRoles[uri] ?? "angle") === "angle" ? "Full shot" : "Detail shot"}
                </Text>
              </Pressable>
            ) : null}
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

// How far the seller can drag the cutout off-center, as a fraction of the
// canvas's own half-width/half-height (see compositeOntoBackground) — high
// enough to give real room to reposition, low enough that the product
// can't be dragged fully out of frame.
const MAX_DRAG_OFFSET = 0.4;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function EditStep({
  angleUris,
  bgByUri,
  backgroundPresetId,
  setBackgroundPresetId,
  onRetry,
  setOffset,
  onRepositionEnd,
  detailCount,
}: {
  angleUris: string[];
  bgByUri: Record<string, BgEntry>;
  backgroundPresetId: string;
  setBackgroundPresetId: (id: string) => void;
  onRetry: (uri: string) => void;
  setOffset: (uri: string, offset: { x: number; y: number }) => void;
  onRepositionEnd: (uri: string, offset: { x: number; y: number }) => void;
  detailCount: number;
}) {
  const mainPreset = BACKGROUND_PRESET_OPTIONS.find((p) => p.id === backgroundPresetId);
  return (
    <View>
      <Text style={styles.stepHeading}>Choose the background</Text>
      <Text style={styles.stepSub}>
        Cirka cuts your main photo out and places it on the background you pick below. Every other full-shot photo
        automatically gets a plain, consistent background instead — no picking needed, and it keeps the set looking
        like one shoot rather than several different scenes. The item itself is never altered. Publishing isn't
        possible until every photo below finishes — drag any of them to reposition it.
      </Text>
      <Text style={styles.fieldLabel}>Main photo background</Text>
      <View style={styles.presetRow}>
        {BACKGROUND_PRESET_OPTIONS.filter((p) => p.allowedForMainPhoto).map((preset: BackgroundPreset & { source: number }) => {
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
      {angleUris.map((uri, i) => (
        <EditPhotoCard
          key={uri}
          label={i === 0 ? "Main photo" : `Photo ${i + 1} of ${angleUris.length}`}
          imageUri={uri}
          entry={bgByUri[uri] ?? EMPTY_BG_ENTRY}
          activePreset={i === 0 ? mainPreset : EVIDENCE_BACKGROUND_PRESET}
          onRetry={() => onRetry(uri)}
          setOffset={(offset) => setOffset(uri, offset)}
          onRepositionEnd={(offset) => onRepositionEnd(uri, offset)}
        />
      ))}
      <Text style={styles.stepSub}>
        {detailCount > 0
          ? `${detailCount} photo${detailCount === 1 ? "" : "s"} marked "Detail shot" on the previous step ${detailCount === 1 ? "stays" : "stay"} exactly as shot — label, defect and close-up photos aren't cut out.`
          : "Label, defect and serial-number photos can be marked \"Detail shot\" on the previous step to keep them exactly as shot."}
      </Text>
    </View>
  );
}

function EditPhotoCard({
  label,
  imageUri,
  entry,
  activePreset,
  onRetry,
  setOffset,
  onRepositionEnd,
}: {
  label: string;
  imageUri: string;
  entry: BgEntry;
  activePreset: (BackgroundPreset & { source: number }) | undefined;
  onRetry: () => void;
  setOffset: (offset: { x: number; y: number }) => void;
  onRepositionEnd: (offset: { x: number; y: number }) => void;
}) {
  const { cutoutUri, composedUri, bgStatus, bgErrorMessage, offset } = entry;
  const interactive = bgStatus === "ready" && !!cutoutUri && !!activePreset;

  // The PanResponder itself is created exactly once per card (recreating it
  // on every render would drop any gesture in progress). Its handlers must
  // therefore never close over reactive render values directly —
  // `interactive`, `setOffset`, `onRepositionEnd` — or they'd permanently
  // see whatever those were on the very first render (e.g. `interactive` is
  // always false at mount, before background removal finishes). Every
  // value the handlers need lives in a ref that's reassigned each render
  // instead, so the handlers always read the current one.
  const containerSize = useRef({ width: 0, height: 0 });
  const liveOffset = useRef(offset);
  const dragStart = useRef(offset);
  const interactiveRef = useRef(interactive);
  const setOffsetRef = useRef(setOffset);
  const onRepositionEndRef = useRef(onRepositionEnd);
  liveOffset.current = offset;
  interactiveRef.current = interactive;
  setOffsetRef.current = setOffset;
  onRepositionEndRef.current = onRepositionEnd;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => interactiveRef.current,
      onMoveShouldSetPanResponder: () => interactiveRef.current,
      onPanResponderGrant: () => {
        dragStart.current = liveOffset.current;
      },
      onPanResponderMove: (_evt: GestureResponderEvent, gesture: PanResponderGestureState) => {
        const w = containerSize.current.width || 1;
        const h = containerSize.current.height || 1;
        const next = {
          x: clamp(dragStart.current.x + gesture.dx / (w / 2), -MAX_DRAG_OFFSET, MAX_DRAG_OFFSET),
          y: clamp(dragStart.current.y + gesture.dy / (h / 2), -MAX_DRAG_OFFSET, MAX_DRAG_OFFSET),
        };
        liveOffset.current = next;
        setOffsetRef.current(next);
      },
      onPanResponderRelease: () => onRepositionEndRef.current(liveOffset.current),
      onPanResponderTerminate: () => onRepositionEndRef.current(liveOffset.current),
    })
  ).current;

  // Never preview the original background as a stand-in for the swapped
  // one — a listing can only publish with one of our presets, so the
  // preview shouldn't imply otherwise while that hasn't happened yet.
  const previewUri = composedUri ?? (bgStatus === "removing" ? imageUri : undefined);
  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={[styles.fieldLabel, { marginBottom: spacing.xs }]}>{label}</Text>
      <View
        style={styles.editPreviewWrap}
        onLayout={(e) => {
          containerSize.current = { width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height };
        }}
        {...(interactive ? panResponder.panHandlers : {})}
      >
        {interactive ? (
          <>
            <Image
              source={activePreset!.source}
              style={[styles.fill, { position: "absolute", top: 0, left: 0, resizeMode: "cover" }]}
            />
            <Image
              source={{ uri: cutoutUri! }}
              style={
                [
                  {
                    position: "absolute",
                    resizeMode: "contain",
                    top: `${15 + offset.y * 50}%`,
                    left: `${15 + offset.x * 50}%`,
                    width: "70%",
                    height: "70%",
                  },
                ] as ImageStyle[]
              }
            />
          </>
        ) : previewUri ? (
          <Image source={{ uri: previewUri }} style={[styles.fill, { resizeMode: "cover" }]} />
        ) : null}
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
      <Text style={styles.stepHeading}>Detected details</Text>

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
  content: { padding: spacing.md, paddingBottom: spacing.xl, alignItems: "center" },
  wizardCol: { width: "100%", maxWidth: WIZARD_MAX_WIDTH },
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
  roleToggle: {
    marginTop: 4,
    alignItems: "center",
    paddingVertical: 3,
    borderRadius: radii.pill,
    backgroundColor: colors.neutralSurface,
  },
  roleToggleText: { fontSize: 10, color: colors.text, opacity: 0.75, fontWeight: typography.weights.bodyMedium as "500" },
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
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  footerInner: { flexDirection: "row", gap: spacing.sm, width: "100%", maxWidth: WIZARD_MAX_WIDTH },
  backBtn: { flex: 1 },
  continueBtn: { flex: 2 },
});
