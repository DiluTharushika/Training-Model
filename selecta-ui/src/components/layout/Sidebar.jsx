import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/selecta-logo.png";
import { useLanguage } from "../../context/LanguageContext";

const base =
  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border border-transparent";

const inactive =
  "text-slate-500 hover:bg-slate-100 hover:text-slate-800 hover:border-slate-200";

const active =
  "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-200 border-purple-400/20";

export default function Sidebar() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col 
                      border-r border-slate-200 
                      bg-white 
                      shadow-sm
                      p-4">

      {/* ── Logo + Subtitle ── */}
      <div className="flex flex-col gap-0.5 mb-6 mt-1 px-1">
        <img src={logo} alt="Selecta" className="h-9 w-auto object-contain" />
        <span className="text-[10px] text-slate-400 font-semibold tracking-wider pl-0.5">
          Enterprise Assistant
        </span>
      </div>

      {/* ── New Chat Button ── */}
      <button
        onClick={() => navigate("/dashboard?new=1")}
        className="mb-5 w-full 
                   bg-gradient-to-r from-purple-600 to-purple-500
                   hover:from-purple-700 hover:to-purple-600
                   text-white rounded-xl py-2.5 
                   text-xs font-bold 
                   shadow-md shadow-purple-200
                   transition-all duration-200 
                   flex items-center justify-center gap-2"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        {t("newChat")}
      </button>

      {/* ── Navigation ── */}
      <nav className="space-y-1 flex-1">

        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 
                     01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 
                     2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 
                     2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 
                     012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {t("dashboard")}
        </NavLink>

        <NavLink
          to="/training-modules"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 
                     001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t("trainingVideos")}
        </NavLink>

        <NavLink
          to="/document-search"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 
                     1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 
                     01-2 2z" />
          </svg>
          {t("documentSearch")}
        </NavLink>

        <NavLink
          to="/image-library"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 
                     2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 
                     00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t("imageLibrary")}
        </NavLink>

        <NavLink
          to="/faqs"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 
                     1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 
                     3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t("faqs")}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 
                     002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 
                     001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 
                     00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 
                     0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 
                     1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 
                     1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 
                     1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 
                     2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {t("settings")}
        </NavLink>

      </nav>

      {/* ── Footer version ── */}
      <div className="pt-4 border-t border-slate-100">
        <div className="text-[10px] text-slate-400 font-mono 
                        tracking-wider text-center">
          v1.0.0-PRO
        </div>
      </div>

    </aside>
  );
}