export default function MessageBubble({ role = "bot", text, products }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all duration-200 animate-slide-in",
          isUser
            ? "bg-purple-700 text-white shadow-md shadow-purple-500/10"
            : "bg-white/5 border border-white/10 text-slate-200 shadow-lg",
        ].join(" ")}
      >
        <div className="whitespace-pre-line">{text}</div>
        
        {products && products.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {products.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-200 transition"
              >
                {p.url && (
                  <div className="h-10 w-10 flex-shrink-0 bg-white rounded-lg border border-slate-200 flex items-center justify-center p-1 overflow-hidden">
                    <img src={p.url} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </div>
                )}
                <div className="min-w-0 text-left">
                  <div className="text-[11px] font-bold text-slate-900 truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Code: {p.code || "N/A"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}