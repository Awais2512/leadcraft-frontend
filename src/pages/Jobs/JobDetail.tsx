import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

type Job = {
  id: string;
  title: string;
  url: string | null;
  raw_post: string;
  tone: string | null;
  time_est: any | null;
  price_quote: any | null;
};

type Proposal = { id: string; status: string; created_at: string };

export default function JobDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [includeEst, setIncludeEst] = useState(false);
  const [tone, setTone] = useState("friendly");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api<Job>(`/jobs/${id}`);
        setJob(data);
        setTone(data.tone || "friendly");
        const p = await api<Proposal[]>(`/proposals?job_id=${id}`);
        setProposals(p);
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function generateProposal() {
    try {
      const res = await api<{ id: string }>(`/proposals/generate`, {
        method: "POST",
        body: JSON.stringify({
          job_id: id,
          include_estimates: includeEst,
          tone,
        }),
      });
      nav(`/proposals/${res.id}`);
    } catch (e: any) {
      alert(e.message);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!job) return <div>Not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          {job.url && (
            <a
              className="text-brand underline"
              href={job.url}
              target="_blank"
              rel="noreferrer"
            >
              Open original post
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select
            className="input w-44"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="confident">Confident</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={includeEst}
              onChange={(e) => setIncludeEst(e.target.checked)}
            />
            Include estimates
          </label>
          <button className="btn btn-primary" onClick={generateProposal}>
            Generate Proposal
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-2 font-semibold">Raw Job Post</h3>
          <pre className="whitespace-pre-wrap text-sm text-ink-700">
            {job.raw_post}
          </pre>
        </div>
        <div className="card">
          <h3 className="mb-2 font-semibold">Job Defaults</h3>
          <div className="text-sm text-ink-700 space-y-1">
            <div>
              <span className="font-medium">Tone:</span> {job.tone || "-"}
            </div>
            <div>
              <span className="font-medium">Time Est:</span>{" "}
              {job.time_est ? JSON.stringify(job.time_est) : "-"}
            </div>
            <div>
              <span className="font-medium">Price Quote:</span>{" "}
              {job.price_quote ? JSON.stringify(job.price_quote) : "-"}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-2 font-semibold">Proposals</h3>
        <ul className="space-y-2">
          {proposals.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-ink-300 p-3"
            >
              <div className="text-sm">
                <div className="font-medium">{p.status}</div>
                <div className="text-ink-700">
                  {new Date(p.created_at).toLocaleString()}
                </div>
              </div>
              <Link to={`/proposals/${p.id}`} className="btn btn-primary">
                Open
              </Link>
            </li>
          ))}
          {!proposals.length && (
            <li className="text-ink-700 text-sm">No proposals yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
