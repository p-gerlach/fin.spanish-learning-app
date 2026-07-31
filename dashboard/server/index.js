// This server is the ONLY thing allowed to hold the kie.ai API key
// (loaded from .env below) and the ONLY thing allowed to call kie.ai.
// The React app never talks to kie.ai directly.
//
// Build-order step 2 (server plumbing): the two routes below return FAKE
// data — no request to kie.ai happens yet. That comes in step 3, once we
// have a real model spec pasted from docs.kie.ai to code against.

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

app.post("/api/generate", (req, res) => {
  const { model, params } = req.body;
  console.log("Fake generate request:", { model, params });

  // Real kie.ai call comes in step 3. For now, fake a task_id so React
  // has something to track.
  const taskId = `fake-task-${Date.now()}`;
  res.json({ taskId });
});

app.get("/api/status/:taskId", (req, res) => {
  console.log("Fake status check for:", req.params.taskId);

  // Real kie.ai "Get Task Details" call comes in step 4. For now, every
  // job is instantly "done" with a placeholder result.
  res.json({
    status: "done",
    resultUrl: "https://placehold.co/400x300?text=Fake+Result",
    error: null,
  });
});

app.listen(PORT, () => {
  console.log(`Dashboard server listening on http://localhost:${PORT}`);
});
