import { Image } from "react-native";
import { apiClient } from "../config/apiClient";

/**
 * Runs a real segmentation model (onnxruntime, bundled with the npm
 * package — no external AI API, no account, no key) on our own server —
 * see apps/api/src/routes/backgroundRemoval.ts. The browser-side
 * (WASM-in-page) version of this library can't be bundled by this app's
 * Metro build (onnxruntime-web's dynamic-import syntax isn't something
 * Metro can parse), so the model runs server-side instead; the tradeoff
 * is a network round trip instead of fully offline processing.
 */
export async function removeImageBackground(imageUri: string): Promise<string> {
  const relativeUrl = await apiClient.removeBackground(imageUri);
  return apiClient.resolveAssetUrl(relativeUrl);
}

const CANVAS_SIZE = { width: 1200, height: 1500 }; // matches the 4:5 product image spec

/** Draws the approved background preset, then the cutout centered on top, and returns a data URL. */
export function compositeOntoBackground(cutoutUri: string, backgroundAssetSource: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const backgroundUri = Image.resolveAssetSource(backgroundAssetSource).uri;

    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE.width;
    canvas.height = CANVAS_SIZE.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas 2D context unavailable"));
      return;
    }

    const bg = new window.Image();
    bg.crossOrigin = "anonymous";
    bg.onload = () => {
      // Cover-fit the background preset.
      const scale = Math.max(canvas.width / bg.width, canvas.height / bg.height);
      const bw = bg.width * scale;
      const bh = bg.height * scale;
      ctx.drawImage(bg, (canvas.width - bw) / 2, (canvas.height - bh) / 2, bw, bh);

      const cutout = new window.Image();
      cutout.crossOrigin = "anonymous";
      cutout.onload = () => {
        // Contain-fit the cutout, leaving a margin so it reads as a
        // product photo, not a full-bleed crop.
        const margin = 0.88;
        const fit = Math.min((canvas.width * margin) / cutout.width, (canvas.height * margin) / cutout.height);
        const cw = cutout.width * fit;
        const ch = cutout.height * fit;
        ctx.drawImage(cutout, (canvas.width - cw) / 2, (canvas.height - ch) / 2, cw, ch);
        resolve(canvas.toDataURL("image/png"));
      };
      cutout.onerror = () => reject(new Error("Failed to load cutout image"));
      cutout.src = cutoutUri;
    };
    bg.onerror = () => reject(new Error("Failed to load background preset"));
    bg.src = backgroundUri;
  });
}
