import { useState } from "react";
import { MODELS } from "../models.js";

const MODEL_IDS = Object.keys(MODELS);

// Model picker + prompt box + Generate button.
function JobForm({ onSubmit, submitting }) {
  const [model, setModel] = useState(MODEL_IDS[0]);
  const [prompt, setPrompt] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit({ model, prompt });
    setPrompt("");
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>New generation</h2>

      <label htmlFor="model">Model</label>
      <select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
        {MODEL_IDS.map((id) => (
          <option key={id} value={id}>
            {MODELS[id].label}
          </option>
        ))}
      </select>

      <label htmlFor="prompt">Prompt</label>
      <textarea
        id="prompt"
        rows={4}
        placeholder="Describe what you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button type="submit" disabled={submitting || !prompt.trim()}>
        {submitting ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}

export default JobForm;
