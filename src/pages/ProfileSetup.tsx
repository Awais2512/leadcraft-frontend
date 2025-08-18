import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import TextInput from "../components/TextInput";

export default function ProfileSetup() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [services, setServices] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initProfile() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        nav("/signin");
        return;
      }

      // Check if profile exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        // Insert empty profile row
        await supabase.from("profiles").insert([
          {
            id: user.id,
            email: user.email,
            full_name: "",
            bio: "",
            services: "",
            hourly_rate: null,
          },
        ]);
      }
      setLoading(false);
    }
    initProfile();
  }, [nav]);

  async function saveProfile(skip = false) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    if (!skip) {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          bio,
          services,
          hourly_rate: hourlyRate ? Number(hourlyRate) : null,
        })
        .eq("id", user.id);

      if (error) {
        setError(error.message);
        return;
      }
    }

    nav("/dashboard");
  }

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="mx-auto mt-12 max-w-lg rounded-2xl bg-white p-8 shadow">
      <h1 className="mb-4 text-2xl font-bold">Set up your profile</h1>
      <p className="mb-6 text-sm text-gray-600">
        Add details to make your proposals stand out. You can also skip and fill
        later.
      </p>

      {error && <p className="mb-2 text-red-600">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveProfile(false);
        }}
        className="space-y-4"
      >
        <TextInput
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.currentTarget.value)}
          placeholder="Your full name"
        />
        <TextInput
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
          placeholder="Tell us about yourself"
        />
        <TextInput
          label="Services"
          value={services}
          onChange={(e) => setServices(e.currentTarget.value)}
          placeholder="E.g., Web Development, UI/UX Design"
        />
        <TextInput
          label="Hourly Rate ($)"
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.currentTarget.value)}
          placeholder="e.g. 50"
        />

        <div className="mt-6 flex gap-4">
          <button type="submit" className="btn btn-primary flex-1">
            Save & Continue
          </button>
          <button
            type="button"
            onClick={() => saveProfile(true)}
            className="btn flex-1 border border-gray-300 bg-gray-100"
          >
            Skip for now
          </button>
        </div>
      </form>
    </div>
  );
}
