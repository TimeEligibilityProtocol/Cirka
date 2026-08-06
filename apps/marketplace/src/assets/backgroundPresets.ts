import { BACKGROUND_PRESETS } from "@wearto-you/domain";

const FILES: Record<string, number> = {
  "solid-beige": require("../../assets/backgrounds/01-solid-beige.png"),
  "soft-halo": require("../../assets/backgrounds/02-soft-halo.png"),
  "studio-shadow": require("../../assets/backgrounds/03-studio-shadow.png"),
  "architectural-arch": require("../../assets/backgrounds/04-architectural-arch.png"),
  "palm-shadow": require("../../assets/backgrounds/05-palm-shadow.png"),
  "stone-texture": require("../../assets/backgrounds/06-stone-texture.png"),
  circle: require("../../assets/backgrounds/07-circle.png"),
  "shadow-circle": require("../../assets/backgrounds/08-shadow-circle.png"),
  beige: require("../../assets/backgrounds/09-beige.png"),
};

export const BACKGROUND_PRESET_OPTIONS = BACKGROUND_PRESETS.map((preset) => ({
  ...preset,
  source: FILES[preset.id],
}));
