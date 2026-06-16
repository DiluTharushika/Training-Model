import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/selecta-logo.png";
import { useLanguage } from "../../context/LanguageContext";

const base =
  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200";
const inactive = "text-slate-300 hover:bg-white/5 hover:text-white";
const active = "bg-purple-700 text-white shadow-md shadow-purple-500/10";

export default function Sidebar() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col border-r border-white/5 bg-[#0e0c17]/60 backdrop-blur-md p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 mt-2">
        <img src={logo} alt="Selecta logo" className="h-10 w-auto" />
      </div>

      {/* New Chat Button */}
      <button
        onClick={() => navigate("/dashboard?new=1")}
        className="mb-5 w-full bg-purple-700 hover:bg-purple-800 text-white rounded-xl py-2.5 text-xs font-bold shadow-md shadow-purple-500/15 transition-all duration-200"
      >
        + {t("newChat")}
      </button>

      {/* Nav List */}
      <nav className="space-y-1.5">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          {t("dashboard")}
        </NavLink>

        <NavLink
          to="/training-modules"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          {t("trainingVideos")}
        </NavLink>

        <NavLink
          to="/document-search"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          {t("documentSearch")}
        </NavLink>

        <NavLink
          to="/image-library"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          {t("imageLibrary")}
        </NavLink>

        <NavLink
          to="/faqs"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          {t("faqs")}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          {t("settings")}
        </NavLink>
      </nav>

      <div className="mt-auto pt-4 text-[10px] text-slate-500 font-mono">v0.1</div>
    </aside>
  );
}