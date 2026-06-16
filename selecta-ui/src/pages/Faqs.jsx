import { useMemo, useState } from "react";

export const FAQS = [
  {
    q: "What products does Selecta sell?",
    a: "Selecta Marketing sells a wide range of hardware tools and accessories including saw blades, hand saws, trowels, pliers, chisels, rivet guns, tapes, wheels/discs, spanners, paint tools, abrasives and drill bits.",
  },
  {
    q: "How can I place an order?",
    a: "Place orders via your sales representative or contact Selecta Marketing directly. Provide the product code(s) and quantities.",
  },
  {
    q: "Do you provide delivery?",
    a: "Delivery depends on location and order volume. Please contact our office with your address for confirmation.",
  },
  {
    q: "How do I identify the correct item?",
    a: "Use the product CODE with the ITEM NAME. If unsure, share the code list with our team for verification.",
  },
];

export const CATALOG = [
  { code: "2502", name: "SELECTA HACK SAW BLADE", category: "Saw Blades" },
  { code: "2504", name: "SELECTA HIGH SPEED BLADE NO.01", category: "Saw Blades" },

  { code: "6090", name: 'SELECTA HAND SAW P/H 18"', category: "Hand Saws" },
  { code: "6091", name: 'SELECTA HAND SAW P/H 20"', category: "Hand Saws" },
  { code: "6092", name: 'SELECTA HAND SAW R/G BLACK BLADE 18"', category: "Hand Saws" },
  { code: "6093", name: 'SELECTA HAND SAW R/G BLACK BLADE 20"', category: "Hand Saws" },

  { code: "2680", name: "SELECTA PLASTERING TROWEL (WOOD HANDLE)", category: "Trowels" },

  { code: "2915", name: "SELECTA ALLEN KEY BALL POINT 9pcs", category: "Allen Keys" },
  { code: "2916", name: "SELECTA ALLEN KEY TROX KEY WITH HOLE 9pcs", category: "Allen Keys" },
  { code: "2917", name: "SELECTA ALLEN KEY HEX KEY 9pcs", category: "Allen Keys" },

  { code: "2920", name: 'SELECTA COMBINATION PLIER 6"', category: "Pliers" },
  { code: "2921", name: 'SELECTA COMBINATION PLIER 8"', category: "Pliers" },
  { code: "2918", name: 'SELECTA SIDE CUTTING PLIER 6"', category: "Pliers" },
  { code: "2919", name: 'SELECTA SIDE CUTTING PLIER 8"', category: "Pliers" },
  { code: "2922", name: 'SELECTA LONG NOSE PLIER 6"', category: "Pliers" },
  { code: "2923", name: 'SELECTA LONG NOSE PLIER 8"', category: "Pliers" },

  { code: "2925", name: 'SELECTA FIRMER CHISEL P/H - 1/4"', category: "Chisels" },
  { code: "2926", name: 'SELECTA FIRMER CHISEL P/H 1/2"', category: "Chisels" },
  { code: "2927", name: 'SELECTA FIRMER CHISEL P/H - 3/4"', category: "Chisels" },
  { code: "2928", name: 'SELECTA FIRMER CHISEL P/H 1"', category: "Chisels" },

  { code: "2591", name: "SELECTA POP RIVET GUN", category: "Rivet Tools" },

  { code: "2601", name: "SELECTA STEEL TAPE 3 m", category: "Measuring Tools" },
  { code: "2602", name: "SELECTA STEEL TAPE 5 m", category: "Measuring Tools" },
  { code: "2603", name: "SELECTA STEEL TAPE 7.5 m", category: "Measuring Tools" },

  { code: "3390", name: 'SELECTA MASKING TAPE 1" (12PCS)', category: "Tapes" },
  { code: "3391", name: 'SELECTA MASKING TAPE 2" (6 PCS)', category: "Tapes" },
  { code: "3392", name: 'SELECTA MASKING TAPE 1" JUMBO 30M (12PCS)', category: "Tapes" },
  { code: "3393", name: 'SELECTA MASKING TAPE 2" JUMBO 30M (6PCS)', category: "Tapes" },
  { code: "3400", name: "SELECTA INSULATION TAPE BLACK", category: "Tapes" },

  { code: "2901", name: 'MASON TROWEL R/GRIP SELECTA 6" POINT', category: "Trowels" },
  { code: "2902", name: 'MASON TROWEL R/GRIP SELECTA 7" POINT', category: "Trowels" },
  { code: "2903", name: 'MASON TROWEL R/GRIP SELECTA 8" POINT', category: "Trowels" },
  { code: "2904", name: 'MASON TROWEL R/GRIP SELECTA 9" POINT', category: "Trowels" },
  { code: "2905", name: 'MASON TROWEL R/GRIP SELECTA 10" POINT', category: "Trowels" },
  { code: "2909", name: 'MASON TROWEL R/GRIP SELECTA 8" ROUND', category: "Trowels" },
  { code: "2910", name: 'MASON TROWEL R/GRIP SELECTA 9" ROUND', category: "Trowels" },
  { code: "2911", name: 'MASON TROWEL R/GRIP SELECTA 10" ROUND', category: "Trowels" },
];

export default function Faqs() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(CATALOG.map((i) => i.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="max-w-6xl w-full space-y-5">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm p-4 md:p-6">
        <h1 className="text-lg font-semibold text-slate-900">
          FAQs & Tools Catalog
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Quick answers and a searchable list of Selecta hardware tools (codes + item names).
        </p>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm font-semibold text-slate-900">
            SELECTA MARKETING (PVT) LTD
          </div>
          <div className="text-sm text-slate-600">
            No 19, Anagarika Dharmapala Mawatha, Galle
          </div>
          <div className="text-sm text-slate-600">
            Phone: 0773246100 / 0912238380
          </div>
          <div className="text-sm text-slate-600">
            Email: selectamarketing.pvt.ltd@gmail.com
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm p-4 md:p-6">
        <h2 className="text-base font-semibold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Tools Catalog</h2>
            <p className="text-sm text-slate-500">Search by code, name, or category.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search (e.g., "2502", "plier", "tape")'
              className="w-full sm:w-72 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:#792CA2]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-56 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:#792CA2]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left font-semibold px-4 py-3 w-28">Code</th>
                <th className="text-left font-semibold px-4 py-3">Item Name</th>
                <th className="text-left font-semibold px-4 py-3 w-48">Category</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={`${item.code}-${item.name}`} className="border-t">
                  <td className="px-4 py-3 font-semibold text-slate-900">{item.code}</td>
                  <td className="px-4 py-3 text-slate-700">{item.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-brand/10 text-brand px-3 py-1 text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan={3}>
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          You can extend this page with prices later (if you provide price columns).
        </div>
      </div>
    </div>
  );
}