import { removeBackground } from "@imgly/background-removal-node";
import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
      // Must be a Blob with an explicit `type` — a raw Uint8Array gets
      // wrapped in a type-less Blob internally, and the library's format
      // sniffing keys off blob.type, not the actual byte content.
      const inputBlob = new Blob([file.buffer], { type: file.mimetype || "image/jpeg" });
      const blob = await removeBackground(inputBlob, { publicPath: MODEL_ASSETS_PATH });
      const arrayBuffer = await blob.arrayBuffer();
      const filename = `${randomUUID()}.png`;
      await writeFile(path.join(CUTOUT_DIR, filename), Buffer.from(arrayBuffer));
      res.status(201).json({ url: `/assets/cutouts/${filename}` });
    } catch (err) {
      console.error("remove-background failed:", err);
      res.status(500).json({ error: "processing_failed" });
    }
  });

  return router;
}
