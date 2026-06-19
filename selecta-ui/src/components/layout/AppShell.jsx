import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 
                    text-slate-800 flex relative overflow-hidden font-sans select-none">

      {/* ── Soft background blobs ── */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px]
                      rounded-full bg-purple-200/30 blur-[120px]
                      pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px]
                      rounded-full bg-violet-100/40 blur-[140px]
                      pointer-events-none z-0" />

      {/* ── Desktop Sidebar ── */}
      <div className="hidden md:block z-20 shrink-0">
        <Sidebar />
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 z-10 min-h-screen">

        {/* Header */}
        <Header onMenuClick={() => setOpen(true)} />

        {/* Page body */}
        <main className="flex-1 min-h-0 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}