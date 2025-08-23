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

export default function SignIn() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) return setErr(error.message);
    nav("/");
  }

  async function onForgotPassword() {
    if (!email) {
      setErr("Please enter your email first.");
      return;
    }
    setErr(null);
    setMessage(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password", // yahan apni site ka URL dalna
    });
    if (error) {
      setErr(error.message);
    } else {
      setMessage("Password reset link sent to your email.");
    }
  }

  return (
    <AuthLayout subtitle="Welcome back! Sign in to your LeadCraft account.">
      <h1 className="mb-1 text-2xl font-bold">Sign in</h1>
      <p className="mb-6 text-sm text-ink-700">
        Enter your credentials to continue.
      </p>

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
          placeholder="••••••••"
          leftIcon={<LockIcon />}
          autoComplete="current-password"
          required
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-brand underline"
        >
          Forgot password?
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-ink-700">
        New here?{" "}
        <Link className="text-brand underline" to="/signup">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
