export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h3 className="font-semibold">Saved Jobs</h3>
        </div>
        <div className="card">
          <h3 className="font-semibold">Proposals</h3>
        </div>
        <div className="card">
          <h3 className="font-semibold">Profile</h3>
        </div>
      </div>
    </div>
  );
}
