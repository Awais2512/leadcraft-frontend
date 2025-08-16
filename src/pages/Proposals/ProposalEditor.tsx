import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

type Proposal = {
  id: string;
  content: string;
  status: string;
  tone: string | null;
  includes_estimates: boolean;
};

export default function ProposalEditor() {
  const { id } = useParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api<Proposal>(`/proposals/${id}`);
        setProposal(data);
        setContent(data.content);
      } catch (e: any) {
        setErr(e.message);
      }
    })();
  }, [id]);

  async function save() {
    try {
      setSaving(true);
      await api(`/proposals`, {
        method: "POST",
        body: JSON.stringify({ id, content }),
      });
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (err) return <div className="text-red-600">{err}</div>;
  if (!proposal) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Proposal</h1>
      <textarea
        className="input h-[60vh] resize-vertical"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          className="btn border border-ink-300"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
