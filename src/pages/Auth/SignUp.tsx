import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/signin" },
    });
    if (error) return setErr(error.message);
    setOk(true);
    // Optionally redirect after a pause:
    setTimeout(() => nav("/signin"), 1500);
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="card w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Create your account</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          {ok && (
            <p className="text-sm text-green-600">
              Check your email to verify, then sign in.
            </p>
          )}
          <button className="btn btn-primary w-full">Sign up</button>
        </form>
        <p className="mt-4 text-center text-sm text-ink-700">
          Already have an account?{" "}
          <Link className="text-brand underline" to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
