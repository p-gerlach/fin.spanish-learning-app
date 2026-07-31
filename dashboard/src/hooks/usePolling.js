import { useEffect, useRef } from "react";
import { getJobStatus } from "../services/api.js";

const POLL_INTERVAL_MS = 3000;
const TIMEOUT_MS = 15 * 60 * 1000; // give up after 15 minutes, per CLAUDE.md
const ACTIVE_STATES = new Set(["waiting", "queuing", "generating"]);

// Every 3s, checks GET /api/status/:taskId for every job still in progress
// and reports changes back via onUpdate(jobId, changes). Stops checking a
// job once it's success/fail, or if kie.ai never finishes within 15 minutes.
//
// A transient error (e.g. a 429 rate limit) is just logged and retried on
// the next tick — it does not fail the job.
function usePolling(jobs, onUpdate) {
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;

  useEffect(() => {
    const interval = setInterval(() => {
      jobsRef.current
        .filter((job) => ACTIVE_STATES.has(job.status))
        .forEach(async (job) => {
          if (Date.now() - job.createdAt > TIMEOUT_MS) {
            onUpdate(job.id, { status: "fail", failMsg: "Timed out waiting for kie.ai" });
            return;
          }

          try {
            const result = await getJobStatus(job.id);
            onUpdate(job.id, {
              status: result.state,
              resultUrl: result.resultUrls?.[0] ?? null,
              failMsg: result.failMsg || null,
            });
          } catch (err) {
            console.warn(`Status check failed for ${job.id}, will retry:`, err.message);
          }
        });
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [onUpdate]);
}

export default usePolling;
