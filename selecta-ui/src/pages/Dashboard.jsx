import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MessageBubble from "../components/chat/MessageBubble.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";

const initialMessages = [
  {
    role: "bot",
    text: "Hello! I’m Selecta AI, your enterprise assistant. How can I help you today?",
  },
];

export default function Dashboard() {
  const [messages, setMessages] = useState(initialMessages);

  const location = useLocation();
  const navigate = useNavigate();

  // Reset chat when URL has ?new=1
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("new") === "1") {
      setMessages(initialMessages);

      // remove the query param from URL
      params.delete("new");
      const search = params.toString();
      navigate(
        { pathname: "/dashboard", search: search ? `?${search}` : "" },
        { replace: true }
      );
    }
  }, [location.search, navigate]);

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
        { role: "bot", text: "Thanks—working on it. What else should I include?" },
      ]);
    }, 400);
  }

  const suggestions = [
    "How do I complete onboarding?",
    "Show me approved safety tools",
    "Find 2024 compliance doc",
  ];

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((t) => (
          <button
            key={t}
            onClick={() => handleSend(t)}
            className="px-3 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-sm"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} text={msg.text} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}