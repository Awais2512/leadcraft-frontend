import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import AuthLayout from "./AuthLayout";
import TextInput from "../../components/TextInput";

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 5h14v10H3V5Zm14 0-7 5L3 5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M6 9V7a4 4 0 1 1 8 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="4"
        y="9"
        width="12"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (password !== confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/signin" },
    });

    if (error) return setErr(error.message);
    setOk(true);

    setTimeout(() => nav("/signin"), 2500);
  }

  return (
    <AuthLayout subtitle="Create your account and start sending tailored proposals.">
      <h1 className="mb-1 text-2xl font-bold">Create account</h1>
      <p className="mb-6 text-sm text-ink-700">It takes less than a minute.</p>

      <form className="space-y-4" onSubmit={onSubmit}>
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="you@example.com"
          leftIcon={<MailIcon />}
          autoComplete="email"
          required
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="At least 8 characters"
          leftIcon={<LockIcon />}
          autoComplete="new-password"
          required
        />
        <TextInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          placeholder="Re-enter password"
          leftIcon={<LockIcon />}
          autoComplete="new-password"
          required
        />

        {err && <p className="text-sm text-red-600">{err}</p>}
        {ok && (
          <p className="text-sm text-green-600">
            Check your email to verify, then sign in.
          </p>
        )}

        <button className="btn btn-primary w-full">Sign up</button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-700">
        Already have an account?{" "}
        <Link className="text-brand underline" to="/signin">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
