import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import logoImg from "../img/image.png";

import { Menu, X, User } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/signin");
  }

  const links = [
    { name: "Home", to: "/" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Saved Jobs", to: "/saved-jobs" },
    { name: "Proposals", to: "/proposals" },
    { name: "Notifications", to: "/notifications" },
    { name: "About Us", to: "/about" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
        {/* Logo + Website Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logoImg} alt="LeadCraft" className="h-10 w-10 rounded" />
          <span className="text-xl font-bold text-gray-800">LeadCraft</span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Profile + Mobile */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-full border bg-gray-50 hover:bg-gray-100"
            >
              <User className="h-6 w-6 text-gray-600" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <nav className="flex flex-col space-y-2 px-6 py-4 text-gray-700 font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={signOut}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
