// Every network call from the React app goes through this file, and only
// ever to OUR OWN server — never directly to kie.ai. The server holds the
// API key; see server/index.js.
//
// The server itself is still returning fake data (build-order step 2), but
// these functions do a real fetch to it, so the browser <-> server round
// trip is real.

const SERVER_URL = "http://localhost:3001";

export async function submitGeneration(model, params) {
  const res = await fetch(`${SERVER_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, params }),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit generation (status ${res.status})`);
  }
  return res.json(); // { taskId }
}

export async function getJobStatus(taskId) {
  const res = await fetch(`${SERVER_URL}/api/status/${taskId}`);
  if (!res.ok) {
    throw new Error(`Failed to get job status (status ${res.status})`);
  }
  return res.json(); // { status, resultUrl, error }
}
