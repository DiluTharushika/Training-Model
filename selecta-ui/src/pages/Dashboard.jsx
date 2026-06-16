import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MessageBubble from "../components/chat/MessageBubble.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";
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
            : "Hello! I’m Selecta AI, your enterprise assistant. How can I help you today?",
      },
    ],
    [lang]
  );

  const [messages, setMessages] = useState(initialMessages);

  const location = useLocation();
  const navigate = useNavigate();

  // Reset chat if language changes to match initial message language
  useEffect(() => {
    setMessages(initialMessages);
  }, [lang, initialMessages]);

  // Helper to search and map catalog items with images
  const findProductMatches = (query) => {
    const q = query.toLowerCase().trim();
    if (q.length < 3) return [];

    // Filter catalog items
    const matchedCatalog = CATALOG.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    ).slice(0, 4);

    // Cross-reference with product images
    return matchedCatalog.map((item) => {
      // Find matching image by keyword matching
      const cleanItemName = item.name.replace("SELECTA", "").trim().toUpperCase();
      const words = cleanItemName.split(" ").filter((w) => w.length > 2 && !w.includes('"'));

      const imgMatch = productImages.find((img) => {
        const imgNameUpper = img.name.toUpperCase();
        if (words.length > 0) {
          return words.every((word) => imgNameUpper.includes(word));
        }
        return false;
      });

      return {
        name: item.name,
        code: item.code,
        url: imgMatch ? imgMatch.url : null,
      };
    });
  };

  // Reset chat when URL has ?new=1 or execute pre-filled ?ask=...
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
    } else {
      const askQuery = params.get("ask");
      if (askQuery) {
        handleSend(askQuery);
        params.delete("ask");
        const search = params.toString();
        navigate(
          { pathname: "/dashboard", search: search ? `?${search}` : "" },
          { replace: true }
        );
      }
    }
  }, [location.search, navigate, initialMessages]);

  // Auto scroll to bottom
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text) {
    // Add user message
    setMessages((m) => [...m, { role: "user", text }]);

    // Process Bot reply
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let replyText = "";
      let productsList = [];

      const isSinhala = /[\u0D80-\u0DFF]/.test(text);

      if (isSinhala) {
        // Sinhala Language Branch
        // 1. Check for contact/location info in Sinhala
        if (
          lowerText.includes("ලිපිනය") ||
          lowerText.includes("පිහිටීම") ||
          lowerText.includes("කොහේද") ||
          lowerText.includes("ගාල්ල") ||
          lowerText.includes("දුරකථන") ||
          lowerText.includes("අංකය") ||
          lowerText.includes("සම්බන්ධ") ||
          lowerText.includes("විද්‍යුත් තැපෑල") ||
          lowerText.includes("ඊමේල්")
        ) {
          replyText =
            "සෙලෙක්ටා මාර්කටින් (පුද්) සමාගම (Selecta Marketing) පිහිටා ඇත්තේ මෙහිය:\n📍 නො. 19, අනගාරික ධර්මපාල මාවත, ගාල්ල, ශ්‍රී ලංකාව.\n\n📞 දුරකථන: 0773246100 / 0912238380\n✉️ විද්‍යුත් තැපෑල: selectamarketing.pvt.ltd@gmail.com\n\nඔබට අපගේ විකුණුම් නියෝජිතයින් සම්බන්ධ කරගැනීමට අවශ්‍ය නම් අපට දන්වන්න!";
        }
        // 2. Check for ordering/delivery info in Sinhala
        else if (
          lowerText.includes("ඇණවුම්") ||
          lowerText.includes("ඇනවුම්") ||
          lowerText.includes("මිලදී") ||
          lowerText.includes("ඩිලිවරි") ||
          lowerText.includes("බෙදාහැර") ||
          lowerText.includes("භාණ්ඩ")
        ) {
          replyText =
            "ඇණවුම් සහ බෙදාහැරීම් ක්‍රියාවලිය:\n\n📦 ඇණවුම් කිරීම: ඔබට අවශ්‍ය භාණ්ඩවල කේතය (Product Code) සහ ප්‍රමාණය සමඟ අපගේ විකුණුම් නියෝජිතයා අමතන්න හෝ සෘජුවම අපගේ ප්‍රධාන කාර්යාලය අමතන්න.\n🚚 බෙදාහැරීම: ඔබ සිටින ප්‍රදේශය සහ ඇණවුම් කරන ප්‍රමාණය මත බෙදාහැරීම් සිදු කරනු ලැබේ. සවිස්තරාත්මක තොරතුරු සඳහා අපගේ දුරකථන අංක මගින් විමසන්න.";
        }
        // 3. Check for catalog products in Sinhala
        else {
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
              replyText = `ඔව්, අප සතුව "${matchKeyword}" කාණ්ඩයට අදාළ ගුණාත්මක නිෂ්පාදන කිහිපයක් තිබේ. පහත දැක්වෙන්නේ අපගේ නිෂ්පාදන නාමාවලියෙන් ගැලපෙන අයිතම කිහිපයකි:`;
              productsList = matches;
            }
          }
        }

        // Sinhala fallback response
        if (!replyText) {
          replyText =
            "මම සෙලෙක්ටා AI සහකාර සහකරු වේ. ඔබට පහත දේවල් පිළිබඳව සිංහලෙන් විමසිය හැක:\n- නිෂ්පාදන සහ කේත (උදා: 'ප්ලයර්', 'කියත්', 'ටේප්' වැනි සිංහල වචන)\n- ඇණවුම් කිරීම සහ බෙදාහැරීම් විස්තර\n- ආයතනයේ ලිපිනය සහ දුරකථන අංක";
        }
      } else {
        // English Language Branch
        // 1. Check for contact/location info
        if (
          lowerText.includes("location") ||
          lowerText.includes("address") ||
          lowerText.includes("where is") ||
          lowerText.includes("galle") ||
          lowerText.includes("phone") ||
          lowerText.includes("contact") ||
          lowerText.includes("email")
        ) {
          replyText =
            "Selecta Marketing (Pvt) Ltd is located at:\n📍 No 19, Anagarika Dharmapala Mawatha, Galle, Sri Lanka.\n\n📞 Phone: 0773246100 / 0912238380\n✉️ Email: selectamarketing.pvt.ltd@gmail.com\n\nLet me know if you need directions or sales representative contact information!";
        }
        // 2. Check for pre-filled document queries
        else if (lowerText.startsWith("explain the details in the document:")) {
          const docTitle = text.substring("explain the details in the document:".length).trim();
          replyText = `I see you are inquiring about the document: "${docTitle}".\n\nThis document is stored in our compliance and operations knowledge base. If you need details on safety protocols, operating nosepieces, blade lubrication, or steel corrosion limits mentioned in this manual, please let me know what specific section you'd like me to summarize!`;
        }
        // 3. Check matched FAQs
        else {
          const matchedFaq = FAQS.find((faq) => {
            const faqQ = faq.q.toLowerCase();
            // basic overlap check
            if (faqQ.includes("sell") && lowerText.includes("sell") && lowerText.includes("product")) return true;
            if (faqQ.includes("order") && lowerText.includes("order")) return true;
            if (faqQ.includes("delivery") && lowerText.includes("delivery")) return true;
            if (faqQ.includes("identify") && (lowerText.includes("identify") || lowerText.includes("code"))) return true;
            return false;
          });

          if (matchedFaq) {
            replyText = matchedFaq.a;
          } else {
            // 4. Check Catalog for products
            const keywords = ["plier", "saw", "tape", "trowel", "disc", "drill", "bit", "chisel", "key", "brush", "sand", "paper", "cutting", "blade", "rivet"];
            const matchedKeyword = keywords.find((kw) => lowerText.includes(kw));

            if (matchedKeyword) {
              const matches = findProductMatches(matchedKeyword);
              if (matches.length > 0) {
                replyText = `Yes! We carry several high-quality products related to "${matchedKeyword}". Here are the matching entries from our inventory catalog:`;
                productsList = matches;
              }
            }
          }
        }

        // Fallback response
        if (!replyText) {
          replyText =
            "I'm here to help you navigate Selecta's products, operations, and guidelines. You can ask me about:\n- Product categories and codes (e.g. 'pliers', 'saws', 'discs')\n- Order placing, deliveries, and catalog IDs\n- Locations, contact phone numbers, or training details.";
        }
      }

      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: replyText,
          products: productsList,
        },
      ]);
    }, 450);
  }

  const suggestions = useMemo(() => {
    return lang === "si"
      ? [
          "ගාල්ල ලිපිනය කොහේද?",
          "ප්ලයර් වර්ග මොනවාද?",
          "ඇණවුමක් කරන්නේ කෙසේද?",
          "භාණ්ඩ බෙදාහැරීම කොහොමද?",
        ]
      : [
          "How do I complete onboarding?",
          "Show me approved safety tools",
          "Find 2024 compliance doc",
          "Create a training plan for new hires",
        ];
  }, [lang]);

  return (
    <div className="h-full min-h-0 flex flex-col gap-4 animate-fade-in">
      {/* Top section */}
      <div className="rounded-2xl border border-white/5 bg-[#161225]/45 backdrop-blur-md shadow-xl">
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-left">
            <h1 className="text-base md:text-lg font-bold text-white">
              {t("dashboard")}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              {t("askPrompt")}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              {t("online")}
            </span>

            <button
              onClick={() => navigate("/dashboard?new=1")}
              className="text-xs font-bold px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white transition-all duration-200"
            >
              {t("newChat")}
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
                className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-500/15 hover:border-purple-500/35 text-xs text-slate-200 transition-all duration-200"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0 rounded-2xl border border-white/5 bg-[#161225]/45 backdrop-blur-md shadow-xl overflow-hidden flex flex-col">
        {/* Chat header row */}
        <div className="px-4 md:px-5 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
              S
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">
                Selecta AI
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                Enterprise Assistant
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-bold tracking-wider">
            MESSAGES: <span className="text-purple-400 font-mono">{messages.length}</span>
          </div>
        </div>

        {/* Messages list */}
        <div className="flex-grow min-h-0 p-4 md:p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} role={msg.role} text={msg.text} products={msg.products} />
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 md:p-4 border-t border-white/5 bg-transparent">
          <ChatInput onSend={handleSend} />
          <div className="mt-2 text-[10px] text-slate-500 text-left font-semibold">
            {t("tipEnter")}
          </div>
        </div>
      </div>
    </div>
  );
}