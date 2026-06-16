import { useState, useEffect, useRef } from "react";
import { productImages } from "../data/productImages";

const VIDEOS = [
  {
    id: "vid-1",
    title: "Angle Grinder Safety & Disc Mounting",
    description: "Standard operating procedures for mounting, testing maximum RPM ratings, and angle alignments for cutting and flap discs.",
    duration: "5:42",
    durationSeconds: 342,
    category: "Safety Guide",
    imageKeyword: "CUTTING DISC MAIN",
  },
  {
    id: "vid-2",
    title: "Hand Saws: Alignments & Sawing Techniques",
    description: "Master woodcutting postures, angle of attack (45° crosscut vs 60° rip), and blade lubrication using beeswax.",
    duration: "4:15",
    durationSeconds: 255,
    category: "Operations",
    imageKeyword: "HAND SAW BLACK MAIN",
  },
  {
    id: "vid-3",
    title: "Trowel Work & Plastering Cement Care",
    description: "Proper application methods for point and round trowels, shank grip positions, and blade washing to prevent cement corrosion.",
    duration: "3:50",
    durationSeconds: 230,
    category: "Maintenance",
    imageKeyword: "MASON TROWEL POINT MAIN",
  }
];

export default function TrainingModules() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("selecta_video_auth") === "true";
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const timerRef = useRef(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle playing state updates
  useEffect(() => {
    if (isPlaying && activeVideo) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeVideo.durationSeconds) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return activeVideo.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeVideo]);

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if email ends with @selecta.lk or is admin@selecta.lk
    const isCorpEmail = cleanEmail.endsWith("@selecta.lk") || cleanEmail === "admin@selecta.lk";
    const isCorrectPassword = password === "selecta2026";

    if (!isCorpEmail) {
      setErrorMsg("Unauthorized domain. Please use a company email (e.g. name@selecta.lk).");
      return;
    }

    if (!isCorrectPassword) {
      setErrorMsg("Incorrect security password. Contact your system administrator.");
      return;
    }

    // Authenticate
    setIsAuthenticated(true);
    setErrorMsg("");
    localStorage.setItem("selecta_video_auth", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("selecta_video_auth");
    setActiveVideo(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const selectVideo = (video) => {
    setActiveVideo(video);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Find thumbnail image
  const getThumbnail = (keyword) => {
    const found = productImages.find((img) => img.name.toUpperCase().includes(keyword));
    return found ? found.url : null;
  };

  return (
    <div className="max-w-6xl w-full space-y-6">
      {/* AUTHENTICATION GATE */}
      {!isAuthenticated ? (
        <div className="flex justify-center py-10">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-xl p-6 md:p-8 space-y-6 text-center">
            {/* Lock Icon */}
            <div className="mx-auto h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-700 border border-purple-100">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Secure Video Portal</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your company email and security code to access Selecta's proprietary training videos.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block">Company Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. employee@selecta.lk"
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block">Security Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs font-semibold text-red-700 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow transition"
              >
                Access Training Portal
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 leading-normal">
              🔒 **Demo Credentials**:<br />
              Email: <span className="font-semibold text-slate-500">employee@selecta.lk</span> | Password: <span className="font-semibold text-slate-500">selecta2026</span>
            </div>
          </div>
        </div>
      ) : (
        /* TRAINING VIDEOS DASHBOARD */
        <div className="space-y-6">
          {/* Header row */}
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">Company Training Videos</h1>
                <span className="inline-flex rounded-full bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 text-[10px] font-bold">
                  Session Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Access step-by-step video logs on hardware tool handling, adjustments, and safety procedures.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-sm transition"
            >
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Lock Portal
            </button>
          </div>

          {/* Confidential Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-left">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
              ⚠️ Proprietary Company Asset
            </h4>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              These training videos contain internal logistics, safety techniques, and proprietary methodologies of 
              <strong> Selecta Marketing (Pvt) Ltd</strong>. Sharing, recorded copying, or distribution is strictly prohibited.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Video List Grid */}
            <div className="lg:col-span-1 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-left">
                Available Courses ({VIDEOS.length})
              </span>
              
              <div className="space-y-3">
                {VIDEOS.map((vid) => {
                  const thumbnail = getThumbnail(vid.imageKeyword);
                  const isActive = activeVideo?.id === vid.id;

                  return (
                    <div
                      key={vid.id}
                      onClick={() => selectVideo(vid)}
                      className={[
                        "p-3 rounded-2xl border cursor-pointer transition flex gap-3 text-left hover:shadow-sm",
                        isActive
                          ? "bg-purple-50 border-purple-300 text-purple-900 shadow-sm"
                          : "bg-white/80 border-slate-200 hover:border-slate-350 text-slate-800",
                      ].join(" ")}
                    >
                      {/* Video Thumbnail placeholder */}
                      <div className="h-16 w-20 flex-shrink-0 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-1.5 overflow-hidden relative">
                        {thumbnail ? (
                          <img src={thumbnail} alt={vid.title} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                            V
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] px-1 rounded font-bold font-mono">
                          {vid.duration}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-purple-700">
                              {vid.category}
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                            {vid.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-1">{vid.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Secure Custom Video Player Canvas */}
            <div className="lg:col-span-2 flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm min-h-[420px]">
              {activeVideo ? (
                <div className="flex-grow flex flex-col">
                  {/* Custom video frame wrapper */}
                  <div className="aspect-video bg-slate-950 flex flex-col justify-between p-4 relative overflow-hidden group select-none selecta-player">
                    
                    {/* CONFIDENTIAL Watermark Overlay (diagonal text) */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
                      <span className="text-2xl md:text-4xl font-extrabold text-white rotate-12 uppercase tracking-widest text-center select-none">
                        SELECTA INTERNAL PROPERTY - DO NOT LEAK
                      </span>
                    </div>

                    {/* Small Corner Corporate Watermark */}
                    <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-40 text-right bg-black/40 px-2 py-1 rounded text-[9px] text-white tracking-widest font-mono">
                      SELECTA SECURE-LOG v0.1
                    </div>

                    {/* Top status bar (fades on hover) */}
                    <div className="z-10 bg-gradient-to-b from-black/70 to-transparent p-2 text-left absolute top-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                        Streaming: {activeVideo.category}
                      </span>
                      <h3 className="text-sm font-bold text-white truncate mt-0.5">
                        {activeVideo.title}
                      </h3>
                    </div>

                    {/* Mid screen play state overlays */}
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer"
                    >
                      {!isPlaying ? (
                        <div className="h-16 w-16 rounded-full bg-purple-700/90 hover:scale-105 hover:bg-purple-800 text-white flex items-center justify-center shadow-lg transition">
                          <svg className="h-8 w-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      ) : (
                        // Mock active visual frequency waves (indicates video playing)
                        <div className="flex gap-1 items-end opacity-20">
                          <span className="w-1.5 h-8 bg-white rounded-full animate-pulse" />
                          <span className="w-1.5 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                          <span className="w-1.5 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                          <span className="w-1.5 h-10 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.1s" }} />
                          <span className="w-1.5 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                        </div>
                      )}
                    </div>

                    {/* Bottom controls panel */}
                    <div className="z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-3 mt-auto absolute bottom-0 left-0 right-0 opacity-100 group-hover:opacity-100 transition-opacity">
                      {/* Timeline bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-white font-mono">
                          {formatTime(currentTime)}
                        </span>
                        
                        <div
                          className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const percentage = clickX / rect.width;
                            setCurrentTime(Math.floor(percentage * activeVideo.durationSeconds));
                          }}
                        >
                          <div
                            className="absolute left-0 top-0 h-full bg-purple-500 rounded-full flex items-center justify-end"
                            style={{ width: `${(currentTime / activeVideo.durationSeconds) * 100}%` }}
                          >
                            <span className="h-2.5 w-2.5 rounded-full bg-white shadow scale-0 group-hover:scale-100 transition-transform" />
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-white/70 font-mono">
                          {activeVideo.duration}
                        </span>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={togglePlay}
                            className="text-white hover:text-purple-400 transition"
                          >
                            {isPlaying ? (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>

                          {/* Mock Volume bar */}
                          <div className="flex items-center gap-1.5">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                              />
                            </svg>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={volume}
                              onChange={(e) => setVolume(e.target.value)}
                              className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                          </div>
                        </div>

                        {/* Player state status */}
                        <div className="text-[10px] text-white/50 font-bold tracking-wider uppercase flex items-center gap-1.5">
                          <span className={["h-1.5 w-1.5 rounded-full", isPlaying ? "bg-green-500 animate-ping" : "bg-red-500"].join(" ")} />
                          {isPlaying ? "SECURE BROADCAST" : "PAUSED"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Meta info description */}
                  <div className="p-5 text-left space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">{activeVideo.title}</h2>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {activeVideo.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-between text-[10px] text-slate-400">
                      <span>Stream Security: HTTPS Encrypted</span>
                      <span>Asset ID: {activeVideo.id.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">No Video Selected</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose a training course from the left menu to start the secure streaming player.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}