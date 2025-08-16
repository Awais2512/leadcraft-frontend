import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Logo from "./Logo";

export default function TopNav() {
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate("/signin");
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-ink-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/" className="btn">
            Dashboard
          </Link>
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <button onClick={signOut} className="btn btn-primary ml-2">
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}
