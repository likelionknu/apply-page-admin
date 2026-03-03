import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AdminLoginPage from "../features/main/pages/AdminLoginPage";
import AdminUserListPage from "@userlist/pages/AdminUserListPage";
import AdminAnnouncementManagementPage from "../features/status/pages/AdminAnnouncementManagementPage";
import AdminAnnouncementPage from "../features/announce/pages/AdminAnnouncementPage";
import AdminSpecificAnnouncementPage from "../features/specific/pages/AdminSpecificAnnouncementPage";
import AdminAnnouncementCreatePage from "../features/announce/pages/AdminAnnouncementCreatePage";
import AdminAnnouncementEditPage from "@announce/pages/AdminAnnouncementEditPage";
import GoogleCallback from "@shared/apis/GoogleCallBack";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<GoogleCallback />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/admin/user-list" element={<AdminUserListPage />} />
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
          path="/admin/announcements/edit/:recruitId"
          element={<AdminAnnouncementEditPage />}
        />
        <Route
          path="/admin/announcements/specific/:id"
          element={<AdminSpecificAnnouncementPage />}
        />
        <Route
          path="/admin/announcements/specific/test"
          element={<AdminSpecificAnnouncementPage />}
        />
        {/* <Route path="*" element={<AdminLoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
