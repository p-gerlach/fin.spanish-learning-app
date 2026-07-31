// Coloured pill showing a job's kie.ai status:
// waiting / queuing / generating / success / fail
const LABELS = {
  waiting: "Waiting",
  queuing: "Queued",
  generating: "Generating",
  success: "Done",
  fail: "Failed",
};

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{LABELS[status] ?? status}</span>;
}

export default StatusBadge;
