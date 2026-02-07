import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "../features/main/pages/AdminLoginPage";
import AdminUserDashboardPage from "../features/userlist/pages/AdminUserDashboardPage";
import AdminAnnouncementPage from "../features/announce/pages/AdminAnnouncementPage";
import AdminSpecificAnnouncementPage from "../features/specificAnnouncement/pages/AdminSpecificAnnouncementPage";

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
          path="/admin/announcements/specific"
          element={<AdminSpecificAnnouncementPage />}
        />
        <Route path="*" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
