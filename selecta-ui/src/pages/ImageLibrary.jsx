import { useState, useMemo } from "react";
import { productImages } from "../data/productImages";
import { useLanguage } from "../context/LanguageContext";

export default function ImageLibrary() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedMessage, setCopiedMessage] = useState("");

  const categories = useMemo(() => {
    const list = new Set(productImages.map((img) => img.category));
    return [t("allCategoryTab"), ...Array.from(list).sort()];
  }, [t]);

  const filteredImages = useMemo(() => {
    const query = search.toLowerCase().trim();
    const isAll = selectedCategory === t("allCategoryTab") || selectedCategory === "All";
    return productImages.filter((img) => {
      const matchesCategory = isAll || img.category === selectedCategory;
      const matchesSearch = img.name.toLowerCase().includes(query) || img.filename.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, t]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedMessage(`Copied ${type}!`);
    setTimeout(() => setCopiedMessage(""), 2000);
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.target = "_blank";
      link.click();
    }
  };

  return (
    <div className="max-w-7xl w-full space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="rounded-2xl border border-white/5 bg-[#161225]/45 backdrop-blur-md shadow-xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-left">
            <h1 className="text-xl font-bold text-white">{t("imageLibrary")}</h1>
            <p className="text-xs text-slate-300 mt-1">{t("statsHeader")}</p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto bg-white/5 border border-white/5 p-1.5 rounded-xl">
            <span className="text-xs font-bold px-3 py-1.5 bg-white/10 shadow-sm rounded-lg text-white">
              {t("totalImages")}: {productImages.length}
            </span>
            <span className="text-xs font-medium px-3 py-1.5 text-slate-400">
              {t("filteredImages")}: {filteredImages.length}
            </span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("imageSearchPlaceholder")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500/50 transition"
            />
            <svg className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 text-white text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 md:w-64"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0f0c1b] text-white">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={[
              "px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200",
              selectedCategory === cat
                ? "bg-purple-700 border-purple-600 text-white shadow-lg shadow-purple-500/20"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredImages.map((img, index) => (
            <div
              key={img.path}
              onClick={() => setSelectedImage(img)}
              style={{ animationDelay: `${(index % 20) * 30}ms` }}
              className="group cursor-pointer rounded-2xl border border-white/5 bg-[#161225]/45 backdrop-blur shadow-md overflow-hidden hover:shadow-purple-500/10 hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 flex flex-col animate-fade-in"
            >
              <div className="aspect-square bg-white/5 flex items-center justify-center p-3 overflow-hidden relative border-b border-white/5">
                <img
                  src={img.url}
                  alt={img.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-purple-950/0 group-hover:bg-purple-900/20 transition-colors flex items-center justify-center">
                  <span className="bg-white/95 px-3 py-1.5 rounded-lg text-[10px] font-bold text-purple-700 shadow opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    {t("quickView")}
                  </span>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-[10px] font-bold text-slate-200 line-clamp-2 min-h-[2rem] text-left">{img.name}</h3>
                <div className="mt-2">
                  <span className="inline-flex rounded-full bg-purple-500/15 text-[9px] font-bold text-purple-300 px-2 py-0.5 border border-purple-500/20">
                    {img.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-[#161225]/45 backdrop-blur p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-sm font-bold text-white">No images match your search</h3>
          <p className="mt-1 text-xs text-slate-400">Try tweaking your search term or select another category.</p>
          <button onClick={() => { setSearch(""); setSelectedCategory("All"); }} className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold hover:bg-purple-800 transition">
            {t("clearFilters")}
          </button>
        </div>
      )}

      {/* Details Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSelectedImage(null)} />
          <div className="bg-[#161225]/90 backdrop-blur-xl border border-white/10 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl shadow-purple-900/30 relative z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-20 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image side */}
            <div className="md:w-1/2 bg-white/5 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 overflow-hidden min-h-[300px]">
              <img src={selectedImage.url} alt={selectedImage.name} className="max-h-full max-w-full object-contain" />
            </div>

            {/* Info side */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="text-left">
                  <span className="inline-flex rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 border border-purple-500/30">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-base font-bold text-white mt-2 leading-tight">{selectedImage.name}</h2>
                </div>
                <div className="space-y-3 pt-3 border-t border-white/5 text-left">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">{t("filenameLabel")}</span>
                    <p className="text-xs font-semibold text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5 mt-1 select-all break-all">{selectedImage.filename}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">{t("pathLabel")}</span>
                    <p className="text-xs font-semibold text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5 mt-1 select-all break-all">{selectedImage.path}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                {copiedMessage && (
                  <div className="text-xs text-green-400 font-bold text-center mb-1 animate-pulse">{copiedMessage}</div>
                )}
                <button onClick={() => handleCopy(selectedImage.name, "Name")} className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition">
                  {t("copyName")}
                </button>
                <button onClick={() => handleCopy(selectedImage.filename, "Filename")} className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-xs font-bold transition">
                  {t("copyFilename")}
                </button>
                <button onClick={() => handleDownload(selectedImage.url, selectedImage.filename)} className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition">
                  {t("downloadImage")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}