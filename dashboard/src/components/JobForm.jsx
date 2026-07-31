import { useState } from "react";

// Model picker + prompt box + Generate button.
// Only one fake model for now — real models get added once their exact
// kie.ai spec (endpoint + params) has been pasted in, per CLAUDE.md section 5.
function JobForm({ onSubmit, submitting }) {
  const [model, setModel] = useState("test-model");
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
        <option value="test-model">Test model (fake data)</option>
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
