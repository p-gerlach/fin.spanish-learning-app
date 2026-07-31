// Model picker + prompt box + Generate button.
// Wired up to POST /api/generate in a later build-order step.
function JobForm() {
  return (
    <form className="job-form">
      <h2>New generation</h2>

      <label htmlFor="model">Model</label>
      <select id="model" disabled>
        <option>Coming soon</option>
      </select>

      <label htmlFor="prompt">Prompt</label>
      <textarea id="prompt" rows={4} placeholder="Describe what you want to generate..." disabled />

      <button type="submit" disabled>
        Generate
      </button>
    </form>
  );
}

export default JobForm;
