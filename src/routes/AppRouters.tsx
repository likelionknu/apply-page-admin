import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "../features/main/pages/AdminLoginPage";
import AdminUserDashboardPage from "../features/userlist/pages/AdminUserDashboardPage";
import AdminAnnouncementPage from "../features/announce/pages/AdminAnnouncementPage";
import AdminAnnouncementCreatePage from "../features/announce/pages/AdminAnnouncementCreatePage";

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
          path="/admin/announcements/create"
          element={<AdminAnnouncementCreatePage />}
        />
        <Route path="*" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
