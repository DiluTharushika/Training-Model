import { useLanguage } from "../../context/LanguageContext";
import logo from "../../assets/selecta-logo.png";

export default function Header({ onMenuClick }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="h-16 shrink-0 sticky top-0 z-30 w-full
                       flex items-center justify-between gap-4
                       px-4 md:px-6
                       border-b border-slate-200/80
                       bg-white/90 backdrop-blur-xl
                       shadow-sm shadow-slate-200/50">

      {/* ===== LEFT: Logo + Divider + Search ===== */}
      <div className="flex items-center gap-3 flex-1">

        {/* Logo - desktop only */}
        <div className="hidden md:flex items-center shrink-0">
          <img
            src={logo}
            alt="Selecta"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block h-6 w-px bg-slate-200 shrink-0" />

        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center
                     w-9 h-9 rounded-xl border border-slate-200
                     bg-slate-50 hover:bg-slate-100
                     text-slate-600 transition-all duration-200 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 
                          text-slate-400 pointer-events-none">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
            </svg>
          </div>
          <input
            className="w-full h-9 pl-9 pr-4
                       rounded-xl border border-slate-200
                       bg-slate-50 hover:bg-white
                       text-sm text-slate-700 placeholder-slate-400
                       outline-none focus:ring-2 focus:ring-purple-400/30
                       focus:bg-white focus:border-purple-300
                       transition-all duration-200 shadow-sm"
            placeholder={t("searchPlaceholder") || "Search internal resources..."}
          />
        </div>
      </div>

      {/* ===== RIGHT: Actions + Language + Avatar ===== */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Notification Bell */}
        <button className="relative flex items-center justify-center
                           w-9 h-9 rounded-xl border border-slate-200
                           bg-slate-50 hover:bg-slate-100
                           text-slate-500 hover:text-slate-700
                           transition-all duration-200 shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 
                     14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 
                     10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 
                     .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 
                     0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Purple dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2
                           rounded-full bg-purple-500
                           ring-2 ring-white" />
        </button>

        {/* Refresh button */}
        <button className="flex items-center justify-center
                           w-9 h-9 rounded-xl border border-slate-200
                           bg-slate-50 hover:bg-slate-100
                           text-slate-500 hover:text-slate-700
                           transition-all duration-200 shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 
                     9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 
                     01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Language Selector */}
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-2.5 top-1/2
                          -translate-y-1/2 text-slate-400 z-10">
            <svg className="h-3.5 w-3.5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 
                       0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 
                       18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="appearance-none h-9 pl-8 pr-7
                       bg-slate-50 hover:bg-white
                       border border-slate-200
                       text-slate-600 text-xs font-semibold
                       rounded-xl outline-none shadow-sm
                       focus:ring-2 focus:ring-purple-400/30
                       focus:border-purple-300
                       cursor-pointer transition-all duration-200"
          >
            <option value="en">English</option>
            <option value="si">සිංහල</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2
                          -translate-y-1/2 text-slate-400">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* User Avatar */}
        <button className="flex items-center gap-2
                           px-2.5 py-1.5 rounded-xl
                           border border-slate-200
                           bg-slate-50 hover:bg-white
                           shadow-sm hover:shadow-md
                           transition-all duration-200 group">
          <div className="w-6 h-6 rounded-full
                          bg-gradient-to-br from-purple-500 to-purple-700
                          flex items-center justify-center
                          text-white text-[10px] font-bold shrink-0
                          shadow-sm shadow-purple-300">
            S
          </div>
          <span className="hidden lg:block text-xs font-semibold
                           text-slate-600 group-hover:text-slate-800
                           transition-colors">
            Admin
          </span>
          <svg className="hidden lg:block w-3 h-3 text-slate-400"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

      </div>
    </header>
  );
}