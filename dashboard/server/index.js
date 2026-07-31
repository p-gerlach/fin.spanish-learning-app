// This server is the ONLY thing allowed to hold the kie.ai API key
// (loaded from .env below) and the ONLY thing allowed to call kie.ai.
// The React app never talks to kie.ai directly.
//
// This is step 1 (skeleton) of the build order in CLAUDE.md: just get the
// server running. The real /api/generate and /api/status/:taskId routes
// (with fake data first, then real kie.ai calls) come in later steps.

import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Dashboard server listening on http://localhost:${PORT}`);
});
