import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { User, Settings, Bell, CreditCard, HelpCircle, Lock, LogOut } from "lucide-react";

export default function Sidebar({
  profilePic,
  firstName,
  lastName,
}: {
  profilePic?: string | null;
  firstName?: string;
  lastName?: string;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", to: "/", icon: <User size={20} /> },
    { name: "Profile", to: "/profile", icon: <User size={20} /> },
    { name: "Settings", to: "/settings", icon: <Settings size={20} /> },
    { name: "Change Password", to: "/change-password", icon: <Lock size={20} /> },
    { name: "Notifications", to: "/notifications", icon: <Bell size={20} /> },
    { name: "Billing & Subscription", to: "/billing", icon: <CreditCard size={20} /> },
    { name: "Help & Support", to: "/help", icon: <HelpCircle size={20} /> },
  ];

  return (
    <aside
      className={`fixed top-16 left-[10%] right-[10%] h-[60%] bg-white shadow-md transition-all duration-300 z-40 
      rounded-xl ${open ? "w-[64%] md:max-w-sm" : "w-[80px] md:w-[80px]"}`}
    >
      <div className="p-6 flex flex-col items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shadow">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No Img
            </div>
          )}
        </div>
        {open && (
          <div className="mt-3 font-semibold text-lg text-gray-800 text-center">
            {firstName} {lastName}
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-2 px-2 text-gray-700 font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
              ${
                location.pathname === link.to
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-green-50 hover:text-green-600"
              }`}
          >
            {link.icon}
            {open && <span>{link.name}</span>}
          </Link>
        ))}

        <hr className="my-4 border-gray-300" />
        <Link
          to="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          {open && <span>Logout</span>}
        </Link>
      </nav>
    </aside>
  );
}
