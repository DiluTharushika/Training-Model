import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");
  const { lang } = useLanguage();

  function submit(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onSend?.(v);
    setValue("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-2xl shadow-lg"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-white placeholder-slate-400"
        placeholder={lang === "si" ? "පණිවිඩයක් ලියන්න..." : "Type a message..."}
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold transition-all duration-200"
      >
        {lang === "si" ? "යවන්න" : "Send"}
      </button>
    </form>
  );
}