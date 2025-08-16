import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function TopNav() {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/signin");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-xl font-medium ${
      isActive ? "bg-brand text-white" : "text-ink-700 hover:bg-brand-light"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-ink-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white font-bold">
            LC
          </div>
          <span className="text-lg font-semibold">LeadCraft</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Dashboard
          </NavLink>
          <NavLink to="/jobs" className={linkClass}>
            Jobs
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
          <button onClick={signOut} className="btn btn-primary ml-2">
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}
