// Every network call from the React app goes through this file, and only
// ever to OUR OWN server — never directly to kie.ai. The server holds the
// API key; see server/index.js.
//
// Stubbed out until build-order step 3 wires up the real server routes.

export async function submitGeneration(/* model, params */) {
  throw new Error("submitGeneration is not wired up yet");
}

export async function getJobStatus(/* taskId */) {
  throw new Error("getJobStatus is not wired up yet");
}
