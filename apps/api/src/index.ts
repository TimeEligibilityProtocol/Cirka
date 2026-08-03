import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./config/env.js";
import { buildProviders } from "./providers/factory.js";
import { backgroundRemovalRouter } from "./routes/backgroundRemoval.js";
import { healthRouter } from "./routes/health.js";
import { listingsRouter } from "./routes/listings.js";
import { ordersRouter } from "./routes/orders.js";
import { uploadsRouter } from "./routes/uploads.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const env = loadEnv();
const providers = buildProviders(env);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "..", "public", "assets")));
app.use(healthRouter(providers));
app.use(listingsRouter());
app.use(ordersRouter());
app.use(uploadsRouter());
app.use(backgroundRemovalRouter());

app.listen(env.port, "0.0.0.0", () => {
  console.log(`wearto.you api listening on :${env.port} (${env.nodeEnv})`);
});
