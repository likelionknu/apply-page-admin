import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "../features/main/pages/AdminLoginPage";
import AdminUserDashboardPage from "../features/userlist/pages/AdminUserDashboardPage";
import AdminAnnouncementManagementPage from "../features/status/pages/AdminAnnouncementManagementPage";
import AdminAnnouncementPage from "../features/announce/pages/AdminAnnouncementPage";
import AdminSpecificAnnouncementPage from "../features/specific/pages/AdminSpecificAnnouncementPage";
import AdminAnnouncementCreatePage from "../features/announce/pages/AdminAnnouncementCreatePage";
import AdminAnnouncementEditPage from "@announce/pages/AdminAnnouncementEditPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/user-dashboard"
          element={<AdminUserDashboardPage />}
        />
        <Route
          path="/admin/announcements"
          element={<AdminAnnouncementPage />}
        />
        <Route
          path="/admin/announcements/management"
          element={<AdminAnnouncementManagementPage />}
        />
        <Route
          path="/admin/announcements/create"
          element={<AdminAnnouncementCreatePage />}
        />
        <Route
          path="/admin/announcements/edit"
          element={<AdminAnnouncementEditPage />}
        />
        <Route
          path="/admin/announcements/specific"
          element={<AdminSpecificAnnouncementPage />}
        />
        <Route path="*" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
