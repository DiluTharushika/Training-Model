import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

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
      className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-sm"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold"
      >
        Send
      </button>
    </form>
  );
}