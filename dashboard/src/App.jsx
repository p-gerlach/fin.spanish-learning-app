import { useState } from "react";
import JobForm from "./components/JobForm.jsx";
import JobCard from "./components/JobCard.jsx";
import { submitGeneration, getJobStatus } from "./services/api.js";
import { MODELS } from "./models.js";
import "./App.css";

function App() {
  // Every job the user has submitted, newest first.
  const [jobs, setJobs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit({ model, prompt }) {
    setSubmitting(true);
    setError(null);
    try {
      const input = MODELS[model].buildInput(prompt);
      const { taskId } = await submitGeneration(model, input);

      setJobs((prev) => [
        { id: taskId, model, prompt, status: "pending", resultUrl: null, createdAt: Date.now() },
        ...prev,
      ]);

      // taskId above is now a REAL kie.ai task id (step 3). The status check
      // below is still fake — GET /api/status is wired to real "Get Task
      // Details" data in step 4, so this still reports a canned "done".
      const result = await getJobStatus(taskId);
      setJobs((prev) =>
        prev.map((job) =>
          job.id === taskId
            ? { ...job, status: result.status, resultUrl: result.resultUrl }
            : job,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="layout">
      <header className="topbar">
        <h1>kie.ai Generation Dashboard</h1>
        <p className="subtitle">Submit a prompt, track the job, see the result.</p>
      </header>

      <main className="columns">
        <section className="column form-column">
          <JobForm onSubmit={handleSubmit} submitting={submitting} />
          {error && <p className="form-error">{error}</p>}
        </section>

        <section className="column jobs-column">
          {jobs.length === 0 ? (
            <p className="empty-state">No jobs yet. Submit one to see it here.</p>
          ) : (
            <div className="job-grid">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
