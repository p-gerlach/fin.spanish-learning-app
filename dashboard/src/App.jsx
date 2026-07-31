import { useState } from "react";
import JobForm from "./components/JobForm.jsx";
import JobCard from "./components/JobCard.jsx";
import "./App.css";

function App() {
  // Every job the user has submitted, newest first.
  // Populated for real once step 3+ wires up the server calls.
  const [jobs] = useState([]);

  return (
    <div className="layout">
      <header className="topbar">
        <h1>kie.ai Generation Dashboard</h1>
        <p className="subtitle">Submit a prompt, track the job, see the result.</p>
      </header>

      <main className="columns">
        <section className="column form-column">
          <JobForm />
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
