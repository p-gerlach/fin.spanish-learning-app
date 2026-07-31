// This server is the ONLY thing allowed to hold the kie.ai API key
// (loaded from .env below) and the ONLY thing allowed to call kie.ai.
// The React app never talks to kie.ai directly.
//
// Build-order step 3: /api/generate now makes a REAL call to kie.ai.
// /api/status is still fake — that's step 4 (Get Task Details).

import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;
const KIE_BASE_URL = "https://api.kie.ai";

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/generate", async (req, res) => {
  const { model, input } = req.body;

  if (!process.env.KIE_API_KEY) {
    return res.status(500).json({ error: "KIE_API_KEY is not set in server/.env" });
  }

  try {
    const kieRes = await fetch(`${KIE_BASE_URL}/api/v1/jobs/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KIE_API_KEY}`,
      },
      body: JSON.stringify({ model, input }),
    });
    const data = await kieRes.json();

    if (data.code !== 200) {
      console.error("kie.ai generate failed:", data);
      return res.status(kieRes.status >= 400 ? kieRes.status : 502).json({
        error: data.msg || "kie.ai request failed",
      });
    }

    res.json({ taskId: data.data.taskId });
  } catch (err) {
    console.error("generate error:", err);
    res.status(500).json({ error: "Could not reach kie.ai" });
  }
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
