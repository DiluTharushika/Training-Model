// Dynamically import all images from the Edited Product Photos directory using Vite's import.meta.glob
const rawImages = import.meta.glob("../assets/Edited Product Photos/*.{png,jpg,jpeg,svg}", { eager: true });

export const productImages = Object.entries(rawImages).map(([path, module]) => {
  const filename = path.split("/").pop();
  
  // Strip file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  
  // Clean up filenames (remove duplicate spaces, remove brackets/parentheses, etc.)
  const cleanName = nameWithoutExt
    .replace(/\s+/g, " ")
    .replace(/[\(\)]/g, "")
    .replace(/\bmain\b/i, "") // remove "main" tag if present
    .trim();

  // Determine category based on keywords in filename
  let category = "Other";
  const upper = cleanName.toUpperCase();
  
  if (upper.includes("PLIER")) {
    category = "Pliers";
  } else if (upper.includes("DRILL") || upper.includes("BIT")) {
    category = "Drills & Bits";
  } else if (upper.includes("DISC") || upper.includes("WHEEL")) {
    category = "Abrasives & Discs";
  } else if (upper.includes("CHISEL")) {
    category = "Chisels";
  } else if (upper.includes("SAW") || upper.includes("BLADE")) {
    category = "Saws & Blades";
  } else if (upper.includes("TAPE")) {
    category = "Tapes";
  } else if (upper.includes("TROWEL") || upper.includes("PLASTERING")) {
    category = "Trowels";
  } else if (upper.includes("KEY")) {
    category = "Allen & Hex Keys";
  } else if (upper.includes("BRUSH")) {
    category = "Brushes";
  } else if (upper.includes("SAND") || upper.includes("PAPER")) {
    category = "Abrasives & Discs";
  } else if (upper.includes("SCAP") || upper.includes("SCRAP")) {
    category = "Scrapers";
  } else if (upper.includes("RIVET") || upper.includes("POP")) {
    category = "Rivet Tools";
  }

  return {
    path,
    filename,
    name: cleanName || filename,
    url: module.default,
    category
  };
});
