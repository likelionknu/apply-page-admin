import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "../features/main/pages/AdminLoginPage";
import AdminUserDashboardPage from "../features/userlist/pages/AdminUserDashboardPage";
import AdminAnnouncementManagementPage from "../features/announce/pages/AdminAnnouncementManagementPage";

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
          element={<AdminAnnouncementManagementPage />}
        />
        <Route path="*" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
