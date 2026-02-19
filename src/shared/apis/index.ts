import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // const token = sessionStorage.getItem("accessToken");
    const token = import.meta.env.VITE_TEST_TOKEN;

    if (token) {
      config.headers = config.headers || {};

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // 백엔드가 200 OK에 에러 코드를 담아 주는 경우에 대한 방어 로직
    if (response.data?.error?.code === "C401") {
      return Promise.reject({
        response: { status: 401, config: response.config },
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 아직 재시도하지 않은 요청이라면
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        // 토큰 재발급 요청 (axios.post 사용)
        const { data } = await axios.post(
          `${BASE_URL}/v1/auth/reissue?refresh_token=${refreshToken}`,
        );

        // 새 토큰 저장 (백엔드 응답 구조인 data.data... 확인 필요)
        const { access_token, refresh_token } = data.data;

        sessionStorage.setItem("accessToken", access_token);
        if (refresh_token) {
          sessionStorage.setItem("refreshToken", refresh_token);
        }

        // 실패했던 요청의 헤더를 새 토큰으로 교체 후 재요청
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시 로그아웃
        console.error("Session expired:", refreshError);
        sessionStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
