import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MessageBubble from "../components/chat/MessageBubble.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";

export default function Dashboard() {
  const initialMessages = useMemo(
    () => [
      {
        role: "bot",
        text:
          "Hello! I’m Selecta AI, your enterprise assistant. How can I help you today?",
      },
    ],
    []
  );

  const [messages, setMessages] = useState(initialMessages);

  const location = useLocation();
  const navigate = useNavigate();

  // Reset chat when URL has ?new=1
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("new") === "1") {
      setMessages(initialMessages);

      params.delete("new");
      const search = params.toString();
      navigate(
        { pathname: "/dashboard", search: search ? `?${search}` : "" },
        { replace: true }
      );
    }
  }, [location.search, navigate, initialMessages]);

  // Auto scroll to bottom
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text) {
    setMessages((m) => [...m, { role: "user", text }]);

    // demo bot reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Thanks—working on it. I can also summarize key points or attach relevant documents if you want.",
        },
      ]);
    }, 400);
  }

  const suggestions = [
    "How do I complete onboarding?",
    "Show me approved safety tools",
    "Find 2024 compliance doc",
    "Create a training plan for new hires",
  ];

  return (
    <div className="h-full min-h-0 flex flex-col gap-4">
      {/* Top section */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm">
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-base md:text-lg font-semibold text-slate-900">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Ask questions, search internal knowledge, and generate responses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-brand bg-brand/10 px-3 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-brand" />
              Online
            </span>

            <button
              onClick={() => navigate("/dashboard?new=1")}
              className="text-sm font-semibold px-4 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white"
            >
              New Chat
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="px-4 md:px-5 pb-4 md:pb-5">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((t) => (
              <button
                key={t}
                onClick={() => handleSend(t)}
                className="px-3 py-2 rounded-full border border-slate-200 bg-white hover:bg-brand/5 text-sm text-slate-800"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur shadow-sm overflow-hidden flex flex-col">
        {/* Chat header row */}
        <div className="px-4 md:px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-brand/15 flex items-center justify-center text-brand font-bold">
              S
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Selecta AI
              </div>
              <div className="text-xs text-slate-500">
                Enterprise Assistant
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Messages: <span className="font-semibold">{messages.length}</span>
          </div>
        </div>

        {/* Messages list */}
        <div className="flex-1 min-h-0 p-4 md:p-5 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} role={msg.role} text={msg.text} />
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 md:p-4 border-t border-slate-200 bg-white/70">
          <ChatInput onSend={handleSend} />
          <div className="mt-2 text-[11px] text-slate-500">
            Tip: Press <span className="font-semibold">Enter</span> to send.
          </div>
        </div>
      </div>
    </div>
  );
}