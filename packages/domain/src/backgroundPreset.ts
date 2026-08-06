/**
 * Mirrors backgrounds.json (approved product-photo background presets).
 * Source of truth for background_preset_id values — see
 * docs/product/source-assets/backgrounds.json and
 * docs/product/photo-background-fallback.md for the full mechanism this
 * feeds into (live preview vs. capture-then-process, both converging on
 * one of these five presets).
 */

export interface BackgroundPreset {
  id: string;
  file: string;
  allowedForMainPhoto: boolean;
  allowedForEvidencePhoto: boolean;
}

export const BACKGROUND_BASE_COLOR = "#E9D8C2";
export const BACKGROUND_SHADOW_COLOR = "#8B6A55";
export const DEFAULT_BACKGROUND_PRESET_ID = "solid-beige";

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  { id: "solid-beige", file: "backgrounds/01-solid-beige.png", allowedForMainPhoto: true, allowedForEvidencePhoto: true },
  { id: "soft-halo", file: "backgrounds/02-soft-halo.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
  { id: "studio-shadow", file: "backgrounds/03-studio-shadow.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
  { id: "architectural-arch", file: "backgrounds/04-architectural-arch.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
  { id: "palm-shadow", file: "backgrounds/05-palm-shadow.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
  { id: "stone-texture", file: "backgrounds/06-stone-texture.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
  { id: "circle", file: "backgrounds/07-circle.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
  { id: "shadow-circle", file: "backgrounds/08-shadow-circle.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
  { id: "beige", file: "backgrounds/09-beige.png", allowedForMainPhoto: true, allowedForEvidencePhoto: false },
];

export function getBackgroundPreset(id: string): BackgroundPreset | undefined {
  return BACKGROUND_PRESETS.find((p) => p.id === id);
}
