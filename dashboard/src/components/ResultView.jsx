// Renders the finished result: image, <video>, or <audio>, based on job.model/type.
// Filled in once results start coming back from the server (build-order step 5).
function ResultView({ job }) {
  if (!job?.resultUrl) return null;
  return <div className="result-view">Result: {job.resultUrl}</div>;
}

export default ResultView;
