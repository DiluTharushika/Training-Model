import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/selecta-logo.png";

const base =
  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition";
const inactive = "text-slate-700 hover:bg-purple-100";
const active = "bg-purple-700 text-white shadow";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-slate-200 bg-white/70 backdrop-blur p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-5">
        <img src={logo} alt="Selecta logo" className="h-10 w-auto" />
      </div>

      {/* New Chat */}
      <button
        onClick={() => navigate("/dashboard?new=1")}
        className="mb-4 w-full bg-purple-700 hover:bg-purple-800 text-white rounded-lg py-2 text-sm font-semibold"
      >
        + New Chat
      </button>

      <nav className="space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/training-modules"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          Training Modules
        </NavLink>

        <NavLink
          to="/document-search"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          Document Search
        </NavLink>

        <NavLink
          to="/image-library"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          Image Library
        </NavLink>

        <NavLink
          to="/faqs"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          FAQs
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          Settings
        </NavLink>
      </nav>

      <div className="mt-auto pt-4 text-xs text-slate-400">v0.1</div>
    </aside>
  );
}