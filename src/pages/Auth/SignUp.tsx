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

// simple scoring
function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  // if (password.length >= 12) score++;
  return score; // 0–5
}

export default function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [confirmPassword, setConfirmPassword] = useState("");
=======
  const [confirm, setConfirm] = useState("");
>>>>>>> 0ab4a23120577f9297545beb0b1056c30eba11f8
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const strength = getStrength(password);
  const percent = (strength / 4) * 100;
  const strengthText =
    strength <= 2 ? "Weak" : strength <= 3 ? "Medium" : "Strong";
  const barColor =
    strength <= 2
      ? "bg-red-500"
      : strength <= 3
      ? "bg-yellow-500"
      : "bg-green-500";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

<<<<<<< HEAD
    if (password !== confirmPassword) {
=======
    if (password !== confirm) {
>>>>>>> 0ab4a23120577f9297545beb0b1056c30eba11f8
      setErr("Passwords do not match.");
      return;
    }

<<<<<<< HEAD
    const { error } = await supabase.auth.signUp({
=======
    const { data, error } = await supabase.auth.signUp({
>>>>>>> 0ab4a23120577f9297545beb0b1056c30eba11f8
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/profile-setup" },
    });

<<<<<<< HEAD
    if (error) return setErr(error.message);
    setOk(true);

    setTimeout(() => nav("/signin"), 2500);
=======
    // --- Handle "already exists" case
    if (error) {
      if (error.message.includes("User already registered")) {
        setErr("Email already registered. Please sign in.");
      } else {
        setErr(error.message);
      }
      return;
    }

    // Supabase might return a user even if already confirmed
    if (
      data?.user &&
      data.user.confirmation_sent_at &&
      data.user.identities?.length === 0
    ) {
      // Already exists & confirmed
      setErr("Email already registered. Please sign in.");
      return;
    }

    setOk(true);
    setTimeout(() => nav("/signin"), 2000);
>>>>>>> 0ab4a23120577f9297545beb0b1056c30eba11f8
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
<<<<<<< HEAD
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
=======
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.currentTarget.value)}
>>>>>>> 0ab4a23120577f9297545beb0b1056c30eba11f8
          placeholder="Re-enter password"
          leftIcon={<LockIcon />}
          autoComplete="new-password"
          required
        />

<<<<<<< HEAD
=======
        {password && (
          <div>
            <div className="h-2 w-full rounded bg-gray-200">
              <div
                className={`h-2 rounded ${barColor}`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <p
              className={`mt-1 text-xs font-medium ${barColor.replace(
                "bg-",
                "text-"
              )}`}
            >
              Password strength: {strengthText}
            </p>
          </div>
        )}

>>>>>>> 0ab4a23120577f9297545beb0b1056c30eba11f8
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
