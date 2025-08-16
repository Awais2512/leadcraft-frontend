export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h3 className="font-semibold">Saved Jobs</h3>
          <p className="text-ink-700 text-sm">
            Jobs you’ve captured from Upwork or pasted manually.
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Proposals</h3>
          <p className="text-ink-700 text-sm">
            Track drafts and sent proposals per job.
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Quick Start</h3>
          <p className="text-ink-700 text-sm">
            Go to Jobs → open a job → Generate Proposal.
          </p>
        </div>
      </div>
    </div>
  );
}
