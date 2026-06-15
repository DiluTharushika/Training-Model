import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import TrainingModules from "../pages/TrainingModules";
import DocumentSearch from "../pages/DocumentSearch";
import ImageLibrary from "../pages/ImageLibrary";
import Faqs from "../pages/Faqs";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/training-modules" element={<TrainingModules />} />
      <Route path="/document-search" element={<DocumentSearch />} />
      <Route path="/image-library" element={<ImageLibrary />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}