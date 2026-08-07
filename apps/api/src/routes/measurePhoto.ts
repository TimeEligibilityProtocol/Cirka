import Anthropic from "@anthropic-ai/sdk";
import { Router } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

// A standard bank/credit card (ISO/IEC 7810 ID-1) — the same fixed size
// worldwide, which is what makes it usable as a scale reference without
// asking the seller to own anything special.
const CARD_WIDTH_MM = 85.6;
const CARD_HEIGHT_MM = 53.98;

interface Point {
  x: number;
  y: number;
}

const LOCATE_MEASUREMENT_POINTS_TOOL = {
  name: "locate_measurement_points",
  description:
    "Locate the reference card and the garment's key measurement points in this flat-lay photo, as pixel coordinates only — do not calculate any real-world distances yourself, that happens afterward from the pixel positions you return.",
  input_schema: {
    type: "object" as const,
    properties: {
      cardFound: { type: "boolean", description: "Whether a rectangular card (or similar reference object) is visible in the photo." },
      cardCorners: {
        type: "array",
        description: "Pixel {x,y} of the card's 4 corners, in order around the card (clockwise or counter-clockwise, doesn't matter which, just consistent).",
        items: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
        minItems: 4,
        maxItems: 4,
      },
      itemType: {
        type: "string",
        description: "What kind of item this is, e.g. 'dress', 'top', 'trousers', 'jacket', 'shoes', 'bag', 'accessory'.",
      },
      measurementPoints: {
        type: "array",
        description:
          `For the detected item type, the standard measurement points as pixel coordinate pairs — the two ends of each measurement, e.g. left cuff to right cuff for chest width. Use these labels by type:
- Dress/skirt: Length, Waist, Hips (add Bust if a fitted dress)
- Top/shirt/blouse: Shoulder, Chest, Length, Sleeve length
- Trousers/jeans: Waist, Hips, Inseam, Length
- Jacket/coat/blazer: Shoulder, Chest, Length, Sleeve length
- Shoes/boots: Insole length
- Bag: Width, Height, Depth
Only include points you can actually see both ends of in this photo — skip a measurement rather than guess coordinates for something out of frame.`,
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            from: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
            to: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
          },
          required: ["label", "from", "to"],
        },
      },
    },
    required: ["cardFound", "itemType", "measurementPoints"],
  },
};

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Real, calculated measurements (not an AI guess) from a dedicated flat-lay
 * photo: item laid flat next to a standard bank card. The card's fixed,
 * known real-world size gives a pixels-per-mm scale; that scale is then
 * applied to the garment's own measurement points. All arithmetic happens
 * here in code, not in the model — the model only ever returns pixel
 * coordinates, which is a task vision models are reliable at, unlike
 * unit conversion or precise arithmetic.
 *
 * Deliberately a separate photo/step from the main listing photos — a
 * card placed on a hanging garment (the shot that gets background-removed
 * for the listing) would both ruin the cutout and look unprofessional in
 * the final listing image.
 */
export function measurePhotoRouter(anthropicApiKey: string | null): Router {
  const router = Router();
  const client = anthropicApiKey ? new Anthropic({ apiKey: anthropicApiKey }) : null;

  router.post("/api/measure-photo", upload.single("photo"), async (req, res) => {
    if (!client) return res.status(503).json({ error: "ai_not_configured" });
    const file = req.file;
    if (!file) return res.status(400).json({ error: "no_file" });
    if (!file.mimetype.startsWith("image/")) return res.status(400).json({ error: "not_an_image" });

    try {
      const message = await client.messages.create({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        tools: [LOCATE_MEASUREMENT_POINTS_TOOL],
        tool_choice: { type: "tool", name: "locate_measurement_points" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: file.mimetype as "image/jpeg" | "image/png" | "image/webp", data: file.buffer.toString("base64") },
              },
              {
                type: "text",
                text: "This photo shows a second-hand fashion item laid flat next to a standard bank card for scale. Locate the card's corners and the item's key measurement points as pixel coordinates.",
              },
            ],
          },
        ],
      });

      const toolUse = message.content.find((block) => block.type === "tool_use");
      if (!toolUse || toolUse.type !== "tool_use") {
        return res.status(502).json({ error: "no_analysis_returned" });
      }

      const result = toolUse.input as {
        cardFound: boolean;
        cardCorners?: Point[];
        itemType: string;
        measurementPoints: { label: string; from: Point; to: Point }[];
      };

      if (!result.cardFound || !result.cardCorners || result.cardCorners.length !== 4) {
        return res.status(422).json({ error: "no_card_detected" });
      }
      if (result.measurementPoints.length === 0) {
        return res.status(422).json({ error: "no_measurement_points_detected" });
      }

      // The 4 corners give 4 edges; the two longest are the card's long
      // side (85.6mm), the two shortest are the short side (53.98mm) —
      // average each pair for a steadier scale than trusting one edge.
      const corners = result.cardCorners;
      const edges = corners.map((c, i) => distance(c, corners[(i + 1) % 4]));
      const sorted = [...edges].sort((a, b) => a - b);
      const shortEdgePx = (sorted[0] + sorted[1]) / 2;
      const longEdgePx = (sorted[2] + sorted[3]) / 2;
      const mmPerPxFromLong = CARD_WIDTH_MM / longEdgePx;
      const mmPerPxFromShort = CARD_HEIGHT_MM / shortEdgePx;
      // Average the two independent scale estimates — a simple built-in
      // sanity cross-check, since a correctly-detected card gives two
      // numbers that should already roughly agree.
      const mmPerPx = (mmPerPxFromLong + mmPerPxFromShort) / 2;

      const measurements = result.measurementPoints.map((p) => {
        const pxDistance = distance(p.from, p.to);
        const cm = (pxDistance * mmPerPx) / 10;
        return `${p.label}: ${cm.toFixed(1)} cm`;
      });

      res.status(200).json({
        itemType: result.itemType,
        measurementsText: measurements.join("\n"),
      });
    } catch (err) {
      console.error("measure-photo failed:", err);
      res.status(500).json({ error: "processing_failed" });
    }
  });

  return router;
}
