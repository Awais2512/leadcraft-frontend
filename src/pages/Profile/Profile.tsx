import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Profile = {
  id?: string;
  bio?: string | null;
  services?: string | null;
  skills?: string[] | null;
  hourly_rate?: number | null;
  tone_default?: string | null;
  availability?: string | null;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api<Profile>("/profile");
        setProfile({
          ...data,
          skills: (data.skills as any) ?? [],
        });
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save() {
    try {
      setSaving(true);
      await api("/profile", {
        method: "POST",
        body: JSON.stringify(profile),
      });
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="text-red-600">{err}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="card space-y-4">
        <div>
          <label className="label">Bio</label>
          <textarea
            className="input h-28"
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Services (description)</label>
          <textarea
            className="input h-28"
            value={profile.services || ""}
            onChange={(e) =>
              setProfile({ ...profile, services: e.target.value })
            }
          />
        </div>
        <div>
          <label className="label">Skills (comma-separated)</label>
          <input
            className="input"
            value={(profile.skills || []).join(", ")}
            onChange={(e) =>
              setProfile({
                ...profile,
                skills: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Hourly Rate (USD)</label>
            <input
              className="input"
              type="number"
              min={0}
              step="1"
              value={profile.hourly_rate ?? ""}
              onChange={(e) =>
                setProfile({ ...profile, hourly_rate: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="label">Default Tone</label>
            <select
              className="input"
              value={profile.tone_default || "friendly"}
              onChange={(e) =>
                setProfile({ ...profile, tone_default: e.target.value })
              }
            >
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="confident">Confident</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Availability</label>
          <input
            className="input"
            value={profile.availability || ""}
            onChange={(e) =>
              setProfile({ ...profile, availability: e.target.value })
            }
            placeholder="e.g., 20 hrs/week, GMT+5"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
