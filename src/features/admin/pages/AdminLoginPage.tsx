import { Link } from "react-router-dom";
import googleImg from "../../../shared/assets/google.png";

function AdminLoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div className="flex w-360 flex-col items-center gap-6">
        <div className="text-center text-[30px] text-white">
          인증된 사용자만 관리자 페이지에 접근할 수 있습니다.
        </div>

        <Link
          to="/admin/user-dashboard"
          className="border-white1 hover:bg-black2 flex cursor-pointer items-center rounded-lg border-[0.4px] px-5 py-2.5 text-white transition"
        >
          <img src={googleImg} alt="google" className="w-6" />
          <p className="tracking-tight-custom ml-2.5 text-[16px] leading-140 font-semibold">
            구글 계정으로 시작하기
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminLoginPage;
