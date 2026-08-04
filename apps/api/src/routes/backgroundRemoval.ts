import { removeBackground } from "@imgly/background-removal-node";
import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CUTOUT_DIR = path.join(__dirname, "..", "..", "public", "assets", "cutouts");

// The package's own default `publicPath` resolves "node_modules/@imgly/..."
// against process.cwd(), which breaks under npm workspace hoisting (the
// package lives in the repo root's node_modules, not apps/api's). Point it
// at the package's actual install location instead.
const MODEL_ASSETS_PATH = `file://${path.dirname(fileURLToPath(import.meta.resolve("@imgly/background-removal-node")))}/`;

// In-memory upload (single small image, discarded once processed — we
// only need the model's output, not the original).
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

// Below this fraction of non-transparent pixels, the model effectively
// found nothing (a near-empty mask) — treated as a failure rather than a
// "successful" cutout of an invisible product. Real garment/bag/shoe
// photos, even tightly cropped, clear this by a wide margin.
const MIN_PRODUCT_COVERAGE = 0.02;

async function nonTransparentFraction(pngBuffer: Buffer): Promise<number> {
  const { data, info } = await sharp(pngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { channels } = info;
  let opaque = 0;
  const totalPixels = data.length / channels;
  for (let i = channels - 1; i < data.length; i += channels) {
    if (data[i] > 16) opaque++;
  }
  return opaque / totalPixels;
}

// Runs a real image-segmentation model (onnxruntime + a pretrained ISNet
// checkpoint, bundled with the npm package) locally on this server — no
// external AI API, no account, no key. Backs the "choose a background"
// step of the Sell flow.
export function backgroundRemovalRouter(): Router {
  const router = Router();

  router.post("/api/remove-background", upload.single("photo"), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "no_file" });

    try {
      // Phone photos are frequently stored as landscape pixel data plus an
      // EXIF "rotate to portrait" tag. sharp (used internally by the
      // segmentation library) doesn't apply that tag unless asked — so
      // without this, the model sees the raw sideways pixels and the
      // cutout comes out rotated. .rotate() with no args auto-orients
      // from EXIF and bakes it into the pixels, then strips the tag.
      const normalizedBuffer = await sharp(file.buffer).rotate().toBuffer();

      // Must be a Blob with an explicit `type` — a raw Uint8Array gets
      // wrapped in a type-less Blob internally, and the library's format
      // sniffing keys off blob.type, not the actual byte content.
      const inputBlob = new Blob([normalizedBuffer], { type: file.mimetype || "image/jpeg" });
      const blob = await removeBackground(inputBlob, { publicPath: MODEL_ASSETS_PATH });
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const coverage = await nonTransparentFraction(buffer);
      if (coverage < MIN_PRODUCT_COVERAGE) {
        console.error(`remove-background: mask too empty (${(coverage * 100).toFixed(2)}% coverage) — not writing it`);
        return res.status(422).json({ error: "no_product_detected" });
      }

      const filename = `${randomUUID()}.png`;
      await writeFile(path.join(CUTOUT_DIR, filename), buffer);
      res.status(201).json({ url: `/assets/cutouts/${filename}` });
    } catch (err) {
      console.error("remove-background failed:", err);
      res.status(500).json({ error: "processing_failed" });
    }
  });

  return router;
}
