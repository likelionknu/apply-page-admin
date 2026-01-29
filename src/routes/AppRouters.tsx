import { BrowserRouter, Route, Routes } from "react-router-dom";
import PendingPage from "../shared/PendingPage";
import AdminAnnouncementPage from "../features/admin/pages/AdminAnnouncementPage";
import AdminUserDashboardPage from "../features/admin/pages/AdminUserDashboardPage";
import AdminLoginPage from "../features/admin/pages/AdminLoginPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/user-dashboard"
          element={<AdminUserDashboardPage />}
        />
        <Route
          path="/admin/announcements"
          element={<AdminAnnouncementPage />}
        />
        <Route path="*" element={<PendingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
