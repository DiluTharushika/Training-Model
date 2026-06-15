export default function Header({ onMenuClick }) {
  return (
    <header className="h-16 px-4 md:px-6 flex items-center gap-3 border-b border-slate-200 bg-white/70 backdrop-blur">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden px-3 py-2 rounded-lg border border-slate-200 bg-white"
      >
        Menu
      </button>

      <div className="w-full max-w-3xl">
        <input
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search internal resources"
        />
      </div>
    </header>
  );
}