import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { productImages } from "../data/productImages";
import { FAQS, CATALOG } from "./Faqs";
import { useLanguage } from "../context/LanguageContext";

export default function Dashboard() {
  const { lang, t } = useLanguage();

  const initialMessages = useMemo(
    () => [
      {
        role: "bot",
        text:
          lang === "si"
            ? "ආයුබෝවන්! මම සෙලෙක්ටා AI. අද ඔබට මා උපකාර කරන්නේ කෙසේද?"
            : "Hello! I'm Selecta AI, your enterprise assistant. How can I help you today?",
      },
    ],
    [lang]
  );

  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMessages(initialMessages);
  }, [lang, initialMessages]);

  const findProductMatches = (query) => {
    const q = query.toLowerCase().trim();
    if (q.length < 3) return [];
    const matchedCatalog = CATALOG.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    ).slice(0, 4);
    return matchedCatalog.map((item) => {
      const cleanItemName = item.name.replace("SELECTA", "").trim().toUpperCase();
      const words = cleanItemName.split(" ").filter((w) => w.length > 2 && !w.includes('"'));
      const imgMatch = productImages.find((img) => {
        const imgNameUpper = img.name.toUpperCase();
        if (words.length > 0) return words.every((word) => imgNameUpper.includes(word));
        return false;
      });
      return { name: item.name, code: item.code, url: imgMatch ? imgMatch.url : null };
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("new") === "1") {
      setMessages(initialMessages);
      setInputValue("");
      params.delete("new");
      const search = params.toString();
      navigate({ pathname: "/dashboard", search: search ? `?${search}` : "" }, { replace: true });
    } else {
      const askQuery = params.get("ask");
      if (askQuery) {
        handleSend(askQuery);
        params.delete("ask");
        const search = params.toString();
        navigate({ pathname: "/dashboard", search: search ? `?${search}` : "" }, { replace: true });
      }
    }
  }, [location.search]);

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text) {
    if (!text || !text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInputValue("");

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let replyText = "";
      let productsList = [];
      const isSinhala = /[\u0D80-\u0DFF]/.test(text);

      if (isSinhala) {
        if (lowerText.includes("ලිපිනය") || lowerText.includes("පිහිටීම") || lowerText.includes("කොහේද") || lowerText.includes("ගාල්ල") || lowerText.includes("දුරකථන") || lowerText.includes("අංකය") || lowerText.includes("සම්බන්ධ") || lowerText.includes("විද්‍යුත් තැපෑල") || lowerText.includes("ඊමේල්")) {
          replyText = "සෙලෙක්ටා මාර්කටින් (පුද්) සමාගම (Selecta Marketing) පිහිටා ඇත්තේ මෙහිය:\n📍 නො. 19, අනගාරික ධර්මපාල මාවත, ගාල්ල, ශ්‍රී ලංකාව.\n\n📞 දුරකථන: 0773246100 / 0912238380\n✉️ විද්‍යුත් තැපෑල: selectamarketing.pvt.ltd@gmail.com\n\nඔබට අපගේ විකුණුම් නියෝජිතයින් සම්බන්ධ කරගැනීමට අවශ්‍ය නම් අපට දන්වන්න!";
        } else if (lowerText.includes("ඇණවුම්") || lowerText.includes("ඇනවුම්") || lowerText.includes("මිලදී") || lowerText.includes("ඩිලිවරි") || lowerText.includes("බෙදාහැර") || lowerText.includes("භාණ්ඩ")) {
          replyText = "ඇණවුම් සහ බෙදාහැරීම් ක්‍රියාවලිය:\n\n📦 ඇණවුම් කිරීම: ඔබට අවශ්‍ය භාණ්ඩවල කේතය (Product Code) සහ ප්‍රමාණය සමඟ අපගේ විකුණුම් නියෝජිතයා අමතන්න.\n🚚 බෙදාහැරීම: ඔබ සිටින ප්‍රදේශය සහ ඇණවුම් කරන ප්‍රමාණය මත බෙදාහැරීම් සිදු කරනු ලැබේ.";
        } else {
          let matchKeyword = null;
          if (lowerText.includes("ප්ලයර්")) matchKeyword = "plier";
          else if (lowerText.includes("කියත්") || lowerText.includes("තල")) matchKeyword = "saw";
          else if (lowerText.includes("ටේප්") || lowerText.includes("ඇලවුම්")) matchKeyword = "tape";
          else if (lowerText.includes("හැන්ද") || lowerText.includes("මේසන්")) matchKeyword = "trowel";
          else if (lowerText.includes("ඩිස්ක්") || lowerText.includes("රෝද")) matchKeyword = "disc";
          else if (lowerText.includes("ඩ්‍රිල්") || lowerText.includes("කටු")) matchKeyword = "drill";
          else if (lowerText.includes("නියන")) matchKeyword = "chisel";
          else if (lowerText.includes("යතුර") || lowerText.includes("ඇලන්")) matchKeyword = "key";
          else if (lowerText.includes("බුරුසු") || lowerText.includes("පින්සල්")) matchKeyword = "brush";
          else if (lowerText.includes("වැලි") || lowerText.includes("කොළ")) matchKeyword = "sand";
          if (matchKeyword) {
            const matches = findProductMatches(matchKeyword);
            if (matches.length > 0) {
              replyText = `ඔව්, අප සතුව "${matchKeyword}" කාණ්ඩයට අදාළ නිෂ්පාදන ඇත:`;
              productsList = matches;
            }
          }
        }
        if (!replyText) replyText = "මම සෙලෙක්ටා AI සහකාරයා වේ. නිෂ්පාදන, ඇණවුම්, ලිපිනය ගැන විමසන්න.";
      } else {
        if (lowerText.includes("location") || lowerText.includes("address") || lowerText.includes("where is") || lowerText.includes("galle") || lowerText.includes("phone") || lowerText.includes("contact") || lowerText.includes("email")) {
          replyText = "Selecta Marketing (Pvt) Ltd is located at:\n📍 No 19, Anagarika Dharmapala Mawatha, Galle, Sri Lanka.\n\n📞 Phone: 0773246100 / 0912238380\n✉️ Email: selectamarketing.pvt.ltd@gmail.com\n\nLet me know if you need directions or sales representative contact information!";
        } else if (lowerText.startsWith("explain the details in the document:")) {
          const docTitle = text.substring("explain the details in the document:".length).trim();
          replyText = `I see you are inquiring about the document: "${docTitle}".\n\nThis document is stored in our compliance and operations knowledge base. Please let me know what specific section you'd like me to summarize!`;
        } else {
          const matchedFaq = FAQS.find((faq) => {
            const faqQ = faq.q.toLowerCase();
            if (faqQ.includes("sell") && lowerText.includes("sell") && lowerText.includes("product")) return true;
            if (faqQ.includes("order") && lowerText.includes("order")) return true;
            if (faqQ.includes("delivery") && lowerText.includes("delivery")) return true;
            if (faqQ.includes("identify") && (lowerText.includes("identify") || lowerText.includes("code"))) return true;
            return false;
          });
          if (matchedFaq) {
            replyText = matchedFaq.a;
          } else {
            const keywords = ["plier", "saw", "tape", "trowel", "disc", "drill", "bit", "chisel", "key", "brush", "sand", "paper", "cutting", "blade", "rivet"];
            const matchedKeyword = keywords.find((kw) => lowerText.includes(kw));
            if (matchedKeyword) {
              const matches = findProductMatches(matchedKeyword);
              if (matches.length > 0) {
                replyText = `Yes! We carry several high-quality products related to "${matchedKeyword}". Here are matching entries from our catalog:`;
                productsList = matches;
              }
            }
          }
        }
        if (!replyText) replyText = "I'm here to help you navigate Selecta's products, operations, and guidelines. You can ask me about:\n- Product categories and codes (e.g. 'pliers', 'saws', 'discs')\n- Order placing, deliveries, and catalog IDs\n- Locations, contact phone numbers, or training details.";
      }

      setMessages((m) => [...m, { role: "bot", text: replyText, products: productsList }]);
    }, 450);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  }

  const suggestions = useMemo(() => {
    return lang === "si"
      ? ["ගාල්ල ලිපිනය කොහේද?", "ප්ලයර් වර්ග මොනවාද?", "ඇණවුමක් කරන්නේ කෙසේද?", "භාණ්ඩ බෙදාහැරීම කොහොමද?"]
      : ["How do I complete onboarding?", "Show me approved safety tools", "Find 2024 compliance doc", "Create a training plan for new hires"];
  }, [lang]);

  const card = {
    borderRadius: "14px",
    border: "1px solid rgba(139,92,246,0.18)",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 2px 16px rgba(139,92,246,0.07)",
  };

  return (
    /* Full height column — no overflow, fills the <main> exactly */
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%", minHeight: 0 }}>

      {/* ── Top panel (fixed height, never scrolls) ── */}
      <div style={{ ...card, flexShrink: 0 }}>
        <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h1 style={{ fontSize: "15px", fontWeight: 700, color: "#1e1b4b", margin: 0 }}>{t("dashboard")}</h1>
            <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "3px", marginBottom: 0 }}>{t("askPrompt")}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: "#7c3aed", background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.25)", padding: "5px 12px", borderRadius: "20px", whiteSpace: "nowrap" }}>
              <span style={{ height: "7px", width: "7px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              {t("online")}
            </span>
            <button
              onClick={() => navigate("/dashboard?new=1")}
              style={{ fontSize: "12px", fontWeight: 700, padding: "7px 16px", borderRadius: "10px", background: "#7c3aed", color: "#fff", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {t("newChat")}
            </button>
          </div>
        </div>
        {/* Suggestion chips */}
        <div style={{ padding: "0 20px 14px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              style={{ padding: "6px 13px", borderRadius: "20px", border: "1px solid rgba(139,92,246,0.22)", background: "rgba(139,92,246,0.06)", fontSize: "12px", color: "#3b0764", fontWeight: 500, cursor: "pointer" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat panel (fills remaining height, messages scroll inside) ── */}
      <div style={{ ...card, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Chat header — fixed, never scrolls */}
        <div style={{ flexShrink: 0, padding: "12px 20px", borderBottom: "1px solid rgba(139,92,246,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ height: "32px", width: "32px", borderRadius: "50%", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 700, fontSize: "13px" }}>S</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e1b4b" }}>Selecta AI</div>
              <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: 600 }}>Enterprise Assistant</div>
            </div>
          </div>
          <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 700, letterSpacing: "0.05em" }}>
            MESSAGES: <span style={{ color: "#7c3aed", fontFamily: "monospace" }}>{messages.length}</span>
          </div>
        </div>

        {/* ── Messages list — THIS is the only scrollable zone ── */}
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {messages.map((msg, idx) => (
            <div key={idx}>
              <div style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "78%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg,#7c3aed,#6d28d9)" : "#f3f0ff",
                  border: msg.role === "user" ? "none" : "1px solid rgba(139,92,246,0.15)",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: msg.role === "user" ? "#ffffff" : "#111827",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {msg.text}
                </div>
              </div>
              {msg.products?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px", paddingLeft: "4px" }}>
                  {msg.products.map((p, i) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid rgba(139,92,246,0.18)", borderRadius: "10px", padding: "10px 12px", minWidth: "120px", maxWidth: "160px" }}>
                      {p.url && <img src={p.url} alt={p.name} style={{ width: "100%", height: "70px", objectFit: "contain", marginBottom: "6px" }} />}
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#1e1b4b" }}>{p.name}</div>
                      <div style={{ fontSize: "10px", color: "#7c3aed", marginTop: "2px" }}>{p.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input bar — fixed at bottom, never scrolls */}
        <div style={{ flexShrink: 0, padding: "12px 16px", borderTop: "1px solid rgba(139,92,246,0.12)", background: "rgba(255,255,255,0.6)" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === "si" ? "පණිවිඩයක් ටයිප් කරන්න..." : "Type a message..."}
              style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(139,92,246,0.25)", background: "#ffffff", fontSize: "13px", color: "#111827", outline: "none", fontFamily: "inherit" }}
            />
            <button
              onClick={() => handleSend(inputValue)}
              style={{ padding: "10px 20px", borderRadius: "10px", background: "#7c3aed", color: "#fff", border: "none", fontWeight: 700, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {t("send") || "Send"}
            </button>
          </div>
          <div style={{ marginTop: "5px", fontSize: "10px", color: "#9ca3af", fontWeight: 600 }}>
            {t("tipEnter") || "Tip: Press Enter to send."}
          </div>
        </div>

      </div>
    </div>
  );
}
