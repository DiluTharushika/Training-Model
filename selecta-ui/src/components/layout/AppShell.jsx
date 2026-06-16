import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07050a] text-slate-100 flex relative overflow-hidden font-sans select-none">
      
      {/* GLOWING BACKGROUND BLOBS (Glassmorphism effect) */}
      <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-purple-800/15 blur-[120px] pointer-events-none animate-float-slow z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#792CA2]/10 blur-[140px] pointer-events-none animate-float-medium z-0" />
      
      {/* Desktop sidebar */}
      <div className="hidden md:block z-20">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 animate-slide-in">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content body */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Header onMenuClick={() => setOpen(true)} />
        <main className="flex-1 min-h-0 p-4 md:p-6 overflow-y-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}