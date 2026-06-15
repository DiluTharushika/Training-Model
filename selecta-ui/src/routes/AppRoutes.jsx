import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";

import Dashboard from "../pages/Dashboard";
import TrainingModules from "../pages/TrainingModules";
import DocumentSearch from "../pages/DocumentSearch";
import ImageLibrary from "../pages/ImageLibrary";
import Faqs from "../pages/Faqs";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  const wrap = (page) => <AppShell>{page}</AppShell>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={wrap(<Dashboard />)} />
      <Route path="/training-modules" element={wrap(<TrainingModules />)} />
      <Route path="/document-search" element={wrap(<DocumentSearch />)} />
      <Route path="/image-library" element={wrap(<ImageLibrary />)} />
      <Route path="/faqs" element={wrap(<Faqs />)} />
      <Route path="/settings" element={wrap(<Settings />)} />

      <Route path="*" element={wrap(<h1>404 - Page Not Found</h1>)} />
    </Routes>
  );
}