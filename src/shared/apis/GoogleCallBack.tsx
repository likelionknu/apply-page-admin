import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      navigate("/login");
      return;
    }

    const platform = "ADMIN";
    const encodedCode = encodeURIComponent(code);

    fetch(
      `${import.meta.env.VITE_BASE_API_URL}/v1/auth/login?code=${encodedCode}&platform=${platform}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("login failed");
        return res.json();
      })
      .then((res) => {
        const { access_token, refresh_token, name, role } = res.data;
        if (role === "ADMIN") {
          sessionStorage.setItem("accessToken", access_token);
          sessionStorage.setItem("refreshToken", refresh_token);
          sessionStorage.setItem("userName", name);

          navigate("/admin/user-list");
          return;
        }

        sessionStorage.clear();
        navigate("/login?reason=no-access", { replace: true });
      })
      .catch((err) => {
        console.error("Login error:", err);
        sessionStorage.clear();
        navigate("/login"); // 로그인 페이지로 돌아가기
      });
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default GoogleCallback;
