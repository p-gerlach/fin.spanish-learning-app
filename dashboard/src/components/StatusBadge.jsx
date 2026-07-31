// Coloured pill showing a job's status: pending / done / failed.
function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

export default StatusBadge;
