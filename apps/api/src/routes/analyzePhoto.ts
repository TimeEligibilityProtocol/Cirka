import Anthropic from "@anthropic-ai/sdk";
import { Router } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

const CONDITIONS = ["New with tags", "Excellent", "Very good", "Good", "Fair"] as const;

const RECORD_ITEM_DETAILS_TOOL = {
  name: "record_item_details",
  description: "Record what you can see about the second-hand fashion item in the photo, for a resale marketplace listing.",
  input_schema: {
    type: "object" as const,
    properties: {
      color: { type: "string", description: "The item's primary colour, e.g. 'Cream', 'Burgundy', 'Dark denim'." },
      material: { type: "string", description: "Best guess at the fabric/material, e.g. 'Cotton blend', 'Leather'. Say 'Unknown' if genuinely not visible." },
      condition: {
        type: "string",
        enum: [...CONDITIONS],
        description:
          "Your best suggestion of visible wear level, from photo evidence only. This is a suggestion the seller reviews and confirms or overrides — never treat it as final.",
      },
      conditionNote: { type: "string", description: "One short sentence explaining the condition judgement, e.g. 'Like new, no visible wear.'" },
      description: {
        type: "string",
        description:
          "A 1-2 sentence resale listing description in a plain, honest, second-hand-marketplace tone (not luxury ad copy). Describe the item itself, not the photo.",
      },
      measurements: {
        type: "string",
        description:
          `Identify the specific item type (dress, top, trousers/skirt, jacket/coat, shoes, bag, or accessory), then list ONE LINE PER STANDARD MEASUREMENT POINT for that type, each on its own line as "Label: " (label followed by a colon and a space, then leave the value itself blank) — this is a checklist of exactly what the seller should measure with a tape measure, not a guessed number. Never invent a value here: a single flat photo has no scale reference, so any number you write would be a fabricated guess wearing the costume of a real measurement — worse than an honest blank.
Standard points by type — use exactly these labels when the type matches:
- Dress/skirt: Length, Waist, Hips (add Bust for dresses with a fitted top)
- Top/shirt/blouse: Shoulder, Chest/Bust, Length, Sleeve length
- Trousers/jeans: Waist, Hips, Inseam, Length
- Jacket/coat/blazer: Shoulder, Chest, Length, Sleeve length
- Shoes/boots: Insole length, EU size
- Bag: Width, Height, Depth, Strap drop (if visible)
- Accessory (scarf/belt/hat): whatever 1-2 dimensions actually define its size`,
      },
    },
    required: ["color", "material", "condition", "conditionNote", "description", "measurements"],
  },
};

/**
 * Real AI photo analysis (description, measurements, color/material/
 * condition) for the Sell flow's "Detected details" step — replaces the
 * previously hard-coded DETECTED placeholder. Separate from background
 * removal: that's a local segmentation model with no external API; this
 * needs an actual vision-capable LLM call, so it requires
 * ANTHROPIC_API_KEY to be configured. Whoever operates this deployment
 * uses their own key — see apps/api/.env.example.
 */
export function analyzePhotoRouter(anthropicApiKey: string | null): Router {
  const router = Router();
  const client = anthropicApiKey ? new Anthropic({ apiKey: anthropicApiKey }) : null;

  router.post("/api/analyze-photo", upload.single("photo"), async (req, res) => {
    if (!client) {
      return res.status(503).json({ error: "ai_not_configured" });
    }
    const file = req.file;
    if (!file) return res.status(400).json({ error: "no_file" });
    if (!file.mimetype.startsWith("image/")) return res.status(400).json({ error: "not_an_image" });

    try {
      const message = await client.messages.create({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        tools: [RECORD_ITEM_DETAILS_TOOL],
        tool_choice: { type: "tool", name: "record_item_details" },
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
                text: "This is a photo of a second-hand fashion item being listed for resale. Look at it carefully and record its details.",
              },
            ],
          },
        ],
      });

      const toolUse = message.content.find((block) => block.type === "tool_use");
      if (!toolUse || toolUse.type !== "tool_use") {
        return res.status(502).json({ error: "no_analysis_returned" });
      }

      res.status(200).json(toolUse.input);
    } catch (err) {
      console.error("analyze-photo failed:", err);
      res.status(500).json({ error: "processing_failed" });
    }
  });

  return router;
}
