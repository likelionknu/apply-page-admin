import { Link } from "react-router-dom";
import logoImg from "../../../shared/assets/loginlogo.png";
import googleImg from "../../../shared/assets/google.png";
import linkImg from "../../../shared/assets/link.png";

import Footer from "../../../shared/components/Footer";

function AdminLoginPage() {
  return (
    <div className="bg-black1 text-white1 flex w-full flex-col">
      <div className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="logo" className="h-[40px] w-[28px]" />
            <p className="text-[40px] leading-none font-semibold">
              LIKELION KNU
            </p>
          </div>
          <p className="pr-[2px] text-right text-[16px] text-gray-400">
            운영진 전용 페이지
          </p>
        </div>

        <div className="bg-black3 flex h-[179px] w-full max-w-[521px] flex-col items-center justify-center rounded-[10px] border border-none">
          <Link
            to="/admin/user-dashboard"
            className="border-gray2 hover:bg-black2 m-5 flex cursor-pointer items-center rounded-lg border-[0.4px] px-5 py-2.5 text-white transition"
          >
            <img src={googleImg} alt="google" className="w-6" />
            <p className="tracking-tight-custom ml-2.5 text-[16px] leading-140 font-semibold">
              구글 계정으로 시작하기
            </p>
          </Link>
          <Link
            to={"https://apply-page-client.vercel.app/"}
            className="text-purple flex items-center justify-center hover:cursor-pointer"
          >
            <p className="mr-4">아기사자 지원페이지를 찾고 있나요?</p>
            <img
              src={linkImg}
              alt="linkToApplyPage"
              className="h-[17px] w-[17px]"
            />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLoginPage;
