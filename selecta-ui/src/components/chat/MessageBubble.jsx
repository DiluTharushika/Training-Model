export default function MessageBubble({ role = "bot", text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-purple-700 text-white"
            : "bg-white border border-slate-200 text-slate-800",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}