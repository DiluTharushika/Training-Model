import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DOCUMENTS = [
  {
    id: "doc-1",
    title: "Selecta Product Catalog & Codes 2026",
    category: "Catalog",
    updatedAt: "2026-04-10",
    summary: "Complete listing of hardware product codes, item names, and categories distributed by Selecta Marketing.",
    content: `SELECTA MARKETING (PVT) LTD
Official Hardware and Tools Catalog 2026.
Headquarters: No 19, Anagarika Dharmapala Mawatha, Galle.
Contact: 0773246100 / 0912238380.

This document indexes all active inventory items:
- Saw Blades (Code 2502: Selecta Hack Saw Blade, Code 2504: High Speed Blade No.1)
- Hand Saws (Code 6090: Hand Saw P/H 18", Code 6092: Hand Saw R/G Black Blade 18")
- Trowels (Code 2680: Plastering Trowel Wood Handle, Code 2901: Mason Trowel R/G 6" Point)
- Pliers (Code 2920: Combination Plier 6", Code 2922: Long Nose Plier 6", Code 2918: Side Cutting Plier 6")
- Allen Keys (Code 2915: Allen Key Ball Point 9pcs, Code 2917: Hex Key 9pcs)
- Rivet Tools (Code 2591: Pop Rivet Gun Heavy Duty)
- Tapes (Code 3390: Masking Tape 1", Code 3400: Insulation Tape Black)

Orders must specify the exact item code and quantity. Distribution is handled via regional sales executives.`
  },
  {
    id: "doc-2",
    title: "Safety & Handling Manual for Cutting & Flap Discs",
    category: "Safety Guides",
    updatedAt: "2026-01-15",
    summary: "Critical safety measures and installation guidelines for operating abrasive cutting discs and flap wheels.",
    content: `SAFETY INSTRUCTIONS FOR ABRASIVE WHEELS & DISCS
Recommended for: Flap Discs (Codes 6001-6006), Cutting Discs (Codes 2701-2704), and Diamond Wheels.

1. Visual Inspection: Prior to mounting, inspect the cutting disc for chips, cracks, or warps. Never use a damaged wheel.
2. Speed Limits: Ensure the RPM rating of the angle grinder does not exceed the maximum RPM printed on the disc label (typically 12,200 RPM for 115mm discs).
3. Mounting: Use the correct flange adapters. Do not force a disc onto the spindle or alter the arbor hole. Hand-tighten securely.
4. Personal Protective Equipment (PPE):
   - Face Shield or Safety Goggles (ANSI approved)
   - Heavy-duty leather work gloves
   - Dust mask and protective apron
5. Grinding Angle: Maintain a 15-30 degree angle relative to the workpiece for flap discs. Never grind with the side of a thin cutting-off wheel.`
  },
  {
    id: "doc-3",
    title: "Masonry Trowel Material Selection & Care",
    category: "Manuals",
    updatedAt: "2025-11-20",
    summary: "Best practices for choosing trowel widths, shapes (round vs point), and maintenance of steel blades.",
    content: `SELECTA TROWEL USER MANUAL
Covers: Plastering Trowels (Code 2680), Point Mason Trowels (Codes 2901-2905), and Round Mason Trowels (Codes 2909-2911).

Selecta Masonry Trowels are forged from high-tensile carbon steel, featuring a rubberized grip (R/G) to absorb vibrations and reduce hand fatigue.

1. Shape Selection:
   - Point Trowels: Ideal for clean mortar application in joints, corners, and detail work.
   - Round Trowels: Best for moving larger volumes of mortar, mixing, and finishing concrete blocks.
   - Plastering Trowels: Designed for spreading mortar, cement, or adhesive onto flat wall surfaces during plastering.
2. Maintenance Guidelines:
   - Always wash cement residue immediately after use. Concrete curing on the blade causes corrosion.
   - Lightly oil the carbon steel blade before long-term storage to prevent rust.
   - Avoid tapping brick faces with the blade edge; use the wooden or rubber handle tip instead.`
  },
  {
    id: "doc-4",
    title: "Heavy Duty Pop Rivet Gun Guide",
    category: "Manuals",
    updatedAt: "2026-03-05",
    summary: "Operational manual outlining nosepiece sizes, loading mechanisms, and cleaning of internal pulling jaws.",
    content: `SELECTA POP RIVET GUN (CODE 2591)
OPERATIONAL & SERVICE GUIDE

The Selecta Pop Rivet Gun is equipped with 4 interchangeable nosepieces for setting aluminum and steel rivets of sizes: 2.4mm (3/32"), 3.2mm (1/8"), 4.0mm (5/32"), and 4.8mm (3/16").

Operation Steps:
1. Select nosepiece size matching the rivet shank diameter. Tighten using the provided wrench.
2. Drill a hole through the joining metals. Hole size should be 0.1mm larger than rivet diameter.
3. Insert the rivet mandrel (stem) fully into the nosepiece.
4. Insert the rivet head into the drilled hole.
5. Squeeze the gun handles together. This pulls the mandrel, expanding the rivet sleeve.
6. Squeeze twice or thrice until the mandrel snaps off. Open the handles to discard the broken stem.

Maintenance:
- Lubricate the internal jaws every 1,000 cycles with light machine oil.
- Clean metal shavings from the jaw housing by unscrewing the front barrel.`
  },
  {
    id: "doc-5",
    title: "Hand Saw Wood Cutting Techniques",
    category: "Tutorials",
    updatedAt: "2026-02-18",
    summary: "Instructions on tensioning, alignment, and teeth-per-inch (TPI) selection for wood cutting and sawing.",
    content: `WOOD CUTTING & HAND SAW TUTORIAL
Reference: Selecta Hand Saws (18" & 20" Black/Plastic Blades, Codes 6090-6093).

Optimal cutting depends on stance, grip, and keeping the saw blade straight.

1. Stance and Grip:
   - Position yourself with your shoulder, elbow, and hand saw aligned directly in line with the cut.
   - Use the index finger along the handle grip pointing forward to guide direction.
2. Starting the Cut:
   - Use the thumb of your free hand to guide the blade just above the teeth.
   - Pull the saw backward gently two or three times to form a guiding notch.
3. Blade Angle:
   - Crosscutting (cutting across grain): Hold the saw at a 45-degree angle to the wood surface.
   - Ripping (cutting along grain): Hold the saw at a 60-degree angle to the surface.
4. Maintenance: Use beeswax or paraffin on the sides of the blade to minimize friction and prevent binding in green lumber.`
  }
];

export default function DocumentSearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeDocId, setActiveDocId] = useState("doc-1");
  const navigate = useNavigate();

  // Unique categories list
  const categories = useMemo(() => {
    const list = new Set(DOCUMENTS.map((d) => d.category));
    return ["All", ...Array.from(list).sort()];
  }, []);

  // Filtered documents
  const filteredDocs = useMemo(() => {
    const query = search.toLowerCase().trim();
    return DOCUMENTS.filter((doc) => {
      const matchesCategory = category === "All" || doc.category === category;
      const matchesSearch =
        doc.title.toLowerCase().includes(query) ||
        doc.summary.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  // Active document object
  const activeDoc = useMemo(() => {
    return DOCUMENTS.find((d) => d.id === activeDocId) || DOCUMENTS[0];
  }, [activeDocId]);

  // Navigate to chat with inquiry prefilled
  const handleAskAI = (docTitle) => {
    navigate(`/dashboard?new=0&ask=Explain the details in the document: ${docTitle}`);
  };

  // Function to highlight search matches
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-slate-900 rounded px-0.5 font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-7xl w-full flex flex-col gap-5 h-[calc(100vh-8rem)]">
      {/* Header section */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Knowledge Base & Document Search</h1>
            <p className="text-sm text-slate-500">
              Search internal guides, product operating manuals, and standard safety documentation.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents content..."
              className="w-full sm:w-64 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main split content pane */}
      <div className="flex-1 flex flex-col md:flex-row gap-5 min-h-0">
        {/* Left Side: Document List */}
        <div className="w-full md:w-80 flex flex-col bg-white/70 backdrop-blur border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Documents ({filteredDocs.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={[
                  "p-3 rounded-xl border cursor-pointer transition text-left",
                  activeDocId === doc.id
                    ? "bg-purple-50 border-purple-300 text-purple-900 shadow-sm"
                    : "bg-white border-slate-150 hover:bg-slate-50/50 hover:border-slate-300 text-slate-800",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded">
                    {doc.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{doc.updatedAt}</span>
                </div>
                <h3 className="text-xs font-bold mt-2 line-clamp-1">
                  {highlightText(doc.title, search)}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {highlightText(doc.summary, search)}
                </p>
              </div>
            ))}

            {filteredDocs.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">No documents found.</div>
            )}
          </div>
        </div>

        {/* Right Side: Document Reader Pane */}
        <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-w-0">
          {activeDoc ? (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Reader Header */}
              <div className="p-4 md:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 border border-purple-200">
                      {activeDoc.category}
                    </span>
                    <span className="text-xs text-slate-500">Updated: {activeDoc.updatedAt}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1.5 truncate">
                    {activeDoc.title}
                  </h2>
                </div>
                
                <button
                  onClick={() => handleAskAI(activeDoc.title)}
                  className="flex items-center justify-center gap-1.5 self-start sm:self-auto px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Ask Selecta AI
                </button>
              </div>

              {/* Reader Body */}
              <div className="flex-1 p-5 md:p-6 overflow-y-auto">
                <div className="prose max-w-none text-left">
                  <div className="p-4 bg-purple-50/40 border-l-4 border-purple-500 rounded-r-xl mb-6">
                    <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wide">Summary</h4>
                    <p className="text-xs text-purple-800 mt-1 leading-relaxed">
                      {highlightText(activeDoc.summary, search)}
                    </p>
                  </div>

                  <div className="whitespace-pre-line text-sm text-slate-700 leading-relaxed font-sans font-normal">
                    {highlightText(activeDoc.content, search)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <svg className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">No Document Selected</h3>
              <p className="mt-1 text-sm text-slate-500">Select a document from the left list to read its contents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}