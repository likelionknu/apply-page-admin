import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLoginPage from "../features/main/pages/AdminLoginPage";
import AdminUserListPage from "@userlist/pages/AdminUserListPage";
import AdminAnnouncementManagementPage from "../features/status/pages/AdminAnnouncementManagementPage";
import AdminAnnouncementPage from "../features/announce/pages/AdminAnnouncementPage";
import AdminSpecificAnnouncementPage from "../features/specific/pages/AdminSpecificAnnouncementPage";
import AdminAnnouncementCreatePage from "../features/announce/pages/AdminAnnouncementCreatePage";
import AdminAnnouncementEditPage from "@announce/pages/AdminAnnouncementEditPage";
import { useEffect } from "react";
import axios from "axios";
import GoogleCallback from "@shared/apis/GoogleCallBack";

function AppRouter() {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const refreshToken = sessionStorage.getItem("refreshToken");

      // 토큰 없으면 검사 없이 바로 진입
      if (!refreshToken) {
        return;
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/v1/auth/reissue`,
          { refresh_token: refreshToken },
        );

        const { access_token, refresh_token } = data.data;
        sessionStorage.setItem("accessToken", access_token);
        if (refresh_token) {
          sessionStorage.setItem("refreshToken", refresh_token);
        }
      } catch (error) {
        let msg = "서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";

        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error?.message) {
            msg = error.response.data.error.message;
          } else if (error.response?.data?.message) {
            msg = error.response.data.message;
          }
        } else if (error instanceof Error) {
          msg = error.message;
        }
        console.log(msg);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/callback" element={<GoogleCallback />} />
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
          path="/admin/announcements/edit"
          element={<AdminAnnouncementEditPage />}
        />
        <Route
          path="/admin/announcements/specific"
          element={<AdminSpecificAnnouncementPage />}
        />
        {/* <Route path="*" element={<AdminLoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
