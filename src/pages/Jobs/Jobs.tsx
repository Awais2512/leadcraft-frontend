import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

type Job = {
  id: string;
  title: string;
  platform: string | null;
  status: string;
  created_at: string;
};

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api<Job[]>("/jobs"); // expects FastAPI route
        setJobs(data);
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading jobs...</div>;
  if (err) return <div className="text-red-600">{err}</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Link to="#" className="btn btn-primary pointer-events-none opacity-50">
          + Add Job (via UI – coming soon)
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-ink-300 bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="px-4 py-3">
                  <Link to={`/jobs/${j.id}`} className="text-brand underline">
                    {j.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{j.platform || "-"}</td>
                <td className="px-4 py-3">{j.status}</td>
                <td className="px-4 py-3">
                  {new Date(j.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {!jobs.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-ink-700">
                  No jobs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
