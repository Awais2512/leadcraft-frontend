import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { api } from "../../lib/api";

type Profile = {
  first_name?: string;
  last_name?: string;
  profile_picture?: string | null;
  bio?: string;
  services?: string;
  skills?: string[];
  hourly_rate?: number;
  tone_default?: string;
  availability?: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await api<Profile>("/profile");
      setProfile({ ...data, skills: data.skills ?? [] });
      setLoading(false);
    })();
  }, []);

  async function save() {
    setSaving(true);
    await api("/profile", { method: "POST", body: JSON.stringify(profile) });
    setSaving(false);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setProfile({ ...profile, profile_picture: reader.result as string });
    reader.readAsDataURL(file);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Sidebar
        firstName={profile.first_name}
        lastName={profile.last_name}
        profilePic={profile.profile_picture || null}
      />

      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <div className="bg-white p-6 shadow-md rounded-xl space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {profile.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Name + Bio */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="First Name"
              value={profile.first_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, first_name: e.target.value })
              }
            />
            <input
              className="border p-2 rounded"
              placeholder="Last Name"
              value={profile.last_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, last_name: e.target.value })
              }
            />
          </div>

          <textarea
            className="w-full border rounded p-2"
            placeholder="Bio"
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={save}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
