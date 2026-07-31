// Every network call from the React app goes through this file, and only
// ever to OUR OWN server — never directly to kie.ai. The server holds the
// API key; see server/index.js.

const SERVER_URL = "http://localhost:3001";

export async function submitGeneration(model, input) {
  const res = await fetch(`${SERVER_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, input }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Failed to submit generation (status ${res.status})`);
  }
  return data; // { taskId }
}

export async function getJobStatus(taskId) {
  const res = await fetch(`${SERVER_URL}/api/status/${taskId}`);
  if (!res.ok) {
    throw new Error(`Failed to get job status (status ${res.status})`);
  }
  return res.json(); // { status, resultUrl, error } — still fake, see build-order step 4
}
