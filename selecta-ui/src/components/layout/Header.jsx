import { useLanguage } from "../../context/LanguageContext";

export default function Header({ onMenuClick }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between gap-4 border-b border-white/5 bg-black/20 backdrop-blur-md z-30">
      
      <div className="flex items-center gap-3 flex-1 max-w-3xl">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-semibold transition"
        >
          Menu
        </button>

        {/* Localized search input */}
        <div className="w-full">
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 transition-all duration-200"
            placeholder={t("searchPlaceholder")}
          />
        </div>
      </div>

      {/* Language Selector Dropdown */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold py-2 pl-8 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer transition-all duration-200"
          >
            <option value="en" className="bg-[#0f0c1b] text-white">English</option>
            <option value="si" className="bg-[#0f0c1b] text-white">සිංහල</option>
          </select>
          <div className="pointer-events-none absolute left-3 top-2.5 flex items-center text-slate-400">
            {/* World Globe icon */}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}