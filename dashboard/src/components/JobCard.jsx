import StatusBadge from "./StatusBadge.jsx";
import ResultView from "./ResultView.jsx";

// One job: prompt, status badge, result.
function JobCard({ job }) {
  return (
    <div className="job-card">
      <p className="job-card-prompt">{job.prompt}</p>
      <StatusBadge status={job.status} />
      <ResultView job={job} />
    </div>
  );
}

export default JobCard;
