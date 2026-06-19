import { useState, useMemo } from "react";
import { productImages } from "../data/productImages";
import { useLanguage } from "../context/LanguageContext";

export default function ImageLibrary() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedMessage, setCopiedMessage] = useState("");
  const [imgError, setImgError] = useState(false);

  const categories = useMemo(() => {
    const list = new Set(productImages.map((img) => img.category));
    return [t("allCategoryTab") || "All", ...Array.from(list).sort()];
  }, [t]);

  const filteredImages = useMemo(() => {
    const query = search.toLowerCase().trim();
    const isAll =
      selectedCategory === t("allCategoryTab") ||
      selectedCategory === "All";
    return productImages.filter((img) => {
      const matchesCategory = isAll || img.category === selectedCategory;
      const matchesSearch =
        img.name.toLowerCase().includes(query) ||
        img.filename.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, t]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedMessage(`✓ Copied ${type}!`);
    setTimeout(() => setCopiedMessage(""), 2000);
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.target = "_blank";
      link.click();
    }
  };

  const openModal = (img) => {
    setImgError(false);
    setCopiedMessage("");
    setSelectedImage(img);
    // ✅ Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    setImgError(false);
    setCopiedMessage("");
    // ✅ Restore body scroll
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* ✅ Modal rendered at ROOT level - outside all containers */}
      {selectedImage && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          className="flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 9998 }}
            className="bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Card */}
          <div
            style={{ zIndex: 9999, position: "relative" }}
            className="bg-white rounded-3xl max-w-3xl w-full 
                       overflow-hidden shadow-2xl
                       border border-slate-200
                       flex flex-col md:flex-row
                       max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{ position: "absolute", top: 16, right: 16, zIndex: 10000 }}
              className="h-9 w-9 rounded-full
                         bg-slate-100 hover:bg-red-50
                         border border-slate-200 hover:border-red-200
                         text-slate-500 hover:text-red-500
                         flex items-center justify-center
                         shadow-sm transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* ── LEFT: Image Panel ── */}
            <div className="md:w-1/2 bg-gradient-to-br 
                            from-slate-50 to-purple-50/30
                            p-8 flex items-center justify-center
                            border-b md:border-b-0 md:border-r
                            border-slate-200 min-h-[280px]
                            md:min-h-[400px]">
              {!imgError ? (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-h-[320px] max-w-full 
                             object-contain drop-shadow-md"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <div className="w-20 h-20 rounded-2xl bg-slate-200
                                  flex items-center justify-center">
                    <svg className="w-10 h-10 text-slate-400"
                         fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 
                               16m-2-2l1.586-1.586a2 2 0 012.828 
                               0L20 14m-6-6h.01M6 20h12a2 2 0 
                               002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 
                               2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-slate-600">
                    Image unavailable
                  </p>
                  <p className="text-xs text-slate-400 text-center px-4">
                    Could not load image. Check file path.
                  </p>
                  <code className="text-[10px] text-slate-400
                                   bg-slate-100 px-3 py-2 rounded-lg
                                   break-all text-center max-w-[200px]
                                   border border-slate-200">
                    {selectedImage.url}
                  </code>
                </div>
              )}
            </div>

            {/* ── RIGHT: Info Panel ── */}
            <div className="md:w-1/2 p-6 md:p-8
                            flex flex-col justify-between
                            overflow-y-auto max-h-[90vh] md:max-h-[500px]">

              {/* Top info */}
              <div className="space-y-4">
                {/* Category badge + Name */}
                <div className="text-left pr-8">
                  <span className="inline-flex rounded-full
                                   bg-purple-50 text-purple-600
                                   text-xs font-bold px-3 py-1
                                   border border-purple-200">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-lg font-bold text-slate-800
                                 mt-3 leading-snug">
                    {selectedImage.name}
                  </h2>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* File details */}
                <div className="space-y-3 text-left">
                  {/* Filename */}
                  <div>
                    <span className="text-[9px] uppercase font-bold
                                     text-slate-400 tracking-widest">
                      {t("filenameLabel") || "Filename"}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="flex-1 text-xs font-mono
                                    text-slate-600 bg-slate-50
                                    p-2.5 rounded-lg border border-slate-200
                                    select-all break-all">
                        {selectedImage.filename}
                      </p>
                    </div>
                  </div>

                  {/* Path */}
                  <div>
                    <span className="text-[9px] uppercase font-bold
                                     text-slate-400 tracking-widest">
                      {t("pathLabel") || "File Path"}
                    </span>
                    <div className="mt-1">
                      <p className="text-xs font-mono text-slate-600
                                    bg-slate-50 p-2.5 rounded-lg
                                    border border-slate-200
                                    select-all break-all">
                        {selectedImage.path}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">

                {/* Copied toast */}
                {copiedMessage && (
                  <div className="text-xs text-green-700 font-bold
                                  text-center bg-green-50
                                  border border-green-200
                                  py-2 rounded-xl mb-1">
                    {copiedMessage}
                  </div>
                )}

                {/* Copy Name */}
                <button
                  onClick={() => handleCopy(selectedImage.name, "Name")}
                  className="w-full py-3 px-4
                             bg-gradient-to-r from-purple-600 to-purple-500
                             hover:from-purple-700 hover:to-purple-600
                             text-white rounded-xl text-xs font-bold
                             shadow-md shadow-purple-200
                             transition-all duration-200
                             flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 
                             2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 
                             0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {t("copyName") || "Copy Product Name"}
                </button>

                {/* Copy Filename */}
                <button
                  onClick={() => handleCopy(selectedImage.filename, "Filename")}
                  className="w-full py-3 px-4
                             bg-slate-100 hover:bg-slate-200
                             text-slate-700 rounded-xl text-xs font-bold
                             border border-slate-200
                             transition-all duration-200
                             flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 
                             2 0 012-2h5.586a1 1 0 01.707.293l5.414 
                             5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t("copyFilename") || "Copy Filename"}
                </button>

                {/* Download */}
                <button
                  onClick={() => handleDownload(
                    selectedImage.url,
                    selectedImage.filename
                  )}
                  className="w-full py-3 px-4
                             bg-gradient-to-r from-emerald-500 to-green-500
                             hover:from-emerald-600 hover:to-green-600
                             text-white rounded-xl text-xs font-bold
                             shadow-md shadow-green-200
                             transition-all duration-200
                             flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 
                             4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t("downloadImage") || "Download Image"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Page Content ── */}
      <div className="max-w-7xl w-full space-y-5">

        {/* Page Header */}
        <div className="rounded-2xl border border-slate-200
                        bg-white shadow-sm p-5 md:p-6">
          <div className="flex flex-col md:flex-row
                          md:items-center md:justify-between gap-4">
            <div className="text-left">
              <h1 className="text-xl font-bold text-slate-800">
                {t("imageLibrary") || "Image Library"}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {t("statsHeader") || "Browse and download product images"}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 self-start md:self-auto
                            bg-slate-50 border border-slate-200
                            p-1.5 rounded-xl">
              <span className="text-xs font-bold px-3 py-1.5
                               bg-gradient-to-r from-purple-600 to-purple-500
                               text-white shadow-sm shadow-purple-200 rounded-lg">
                {t("totalImages") || "Total"}: {productImages.length}
              </span>
              <span className="text-xs font-medium px-3 py-1.5 text-slate-500">
                {t("filteredImages") || "Shown"}: {filteredImages.length}
              </span>
            </div>
          </div>

          {/* Search & Filter Row */}
          <div className="mt-5 flex flex-col md:flex-row gap-3">

            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2
                              text-slate-400 pointer-events-none">
                <svg className="h-4 w-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("imageSearchPlaceholder")
                             || "Search by product name or filename..."}
                className="w-full rounded-xl border border-slate-200
                           bg-slate-50 hover:bg-white px-4 py-2.5 pl-10
                           text-sm text-slate-700 placeholder-slate-400
                           outline-none focus:ring-2 focus:ring-purple-400/30
                           focus:border-purple-300 focus:bg-white
                           transition-all duration-200 shadow-sm"
              />
            </div>

            {/* Category select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-slate-200
                         bg-slate-50 hover:bg-white
                         text-slate-700 text-sm px-4 py-2.5
                         outline-none shadow-sm
                         focus:ring-2 focus:ring-purple-400/30
                         focus:border-purple-300
                         cursor-pointer md:w-64
                         transition-all duration-200"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tab Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={[
                "px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200",
                selectedCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 border-purple-400 text-white shadow-md shadow-purple-200"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 shadow-sm",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid or Empty */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3
                          md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map((img, index) => (
              <div
                key={img.path || img.filename || index}
                onClick={() => openModal(img)}
                style={{ animationDelay: `${(index % 20) * 30}ms` }}
                className="group cursor-pointer rounded-2xl
                           border border-slate-200 bg-white shadow-sm
                           overflow-hidden
                           hover:shadow-xl hover:shadow-purple-100
                           hover:border-purple-300
                           transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-square bg-slate-50
                                flex items-center justify-center
                                p-3 overflow-hidden relative
                                border-b border-slate-100">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="max-h-full max-w-full object-contain
                               group-hover:scale-105
                               transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0
                                  bg-purple-600/0 group-hover:bg-purple-600/8
                                  transition-all duration-200
                                  flex items-center justify-center">
                    <span className="bg-white px-3 py-1.5 rounded-lg
                                     text-[10px] font-bold text-purple-600
                                     shadow-md border border-purple-100
                                     opacity-0 group-hover:opacity-100
                                     translate-y-2 group-hover:translate-y-0
                                     transition-all duration-200">
                      {t("quickView") || "Quick View"}
                    </span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h3 className="text-[10px] font-bold text-slate-700
                                 line-clamp-2 min-h-[2rem] text-left">
                    {img.name}
                  </h3>
                  <div className="mt-2">
                    <span className="inline-flex rounded-full
                                     bg-purple-50 text-[9px] font-bold
                                     text-purple-600 px-2 py-0.5
                                     border border-purple-200">
                      {img.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-slate-200
                          bg-white shadow-sm p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100
                            flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 text-slate-400" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2
                         l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 
                         20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 
                         2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-700">
              No images found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Try tweaking your search or select another category.
            </p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory("All"); }}
              className="mt-4 px-5 py-2.5
                         bg-gradient-to-r from-purple-600 to-purple-500
                         hover:from-purple-700 hover:to-purple-600
                         text-white rounded-xl text-xs font-bold
                         shadow-md shadow-purple-200
                         transition-all duration-200"
            >
              {t("clearFilters") || "Clear Filters"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}