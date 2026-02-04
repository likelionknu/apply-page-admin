import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "../features/main/pages/AdminLoginPage";
import AdminUserDashboardPage from "../features/userlist/pages/AdminUserDashboardPage";
import AdminAnnouncementPage from "../features/announce/pages/AdminAnnouncementPage";

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
        <Route path="*" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
