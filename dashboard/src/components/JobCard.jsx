import StatusBadge from "./StatusBadge.jsx";
import ResultView from "./ResultView.jsx";

// One job: prompt, status badge, result (or failure message).
function JobCard({ job }) {
  return (
    <div className="job-card">
      <p className="job-card-prompt">{job.prompt}</p>
      <StatusBadge status={job.status} />
      {job.status === "fail" && job.failMsg && <p className="job-card-error">{job.failMsg}</p>}
      <ResultView job={job} />
    </div>
  );
}

export default JobCard;
