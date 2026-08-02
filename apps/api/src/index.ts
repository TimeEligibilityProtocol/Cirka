import cors from "cors";
import "dotenv/config";
import express from "express";
import { loadEnv } from "./config/env.js";
import { buildProviders } from "./providers/factory.js";
import { healthRouter } from "./routes/health.js";

const env = loadEnv();
const providers = buildProviders(env);

const app = express();
app.use(cors());
app.use(express.json());
app.use(healthRouter(providers));

app.listen(env.port, () => {
  console.log(`wearto.you api listening on :${env.port} (${env.nodeEnv})`);
});
