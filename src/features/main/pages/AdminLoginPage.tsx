import Footer from "@shared/components/Footer";
import { Link } from "react-router-dom";

import googleImg from "@shared/assets/google.png";
import linkImg from "@shared/assets/link.png";
import mainLogoImg from "@shared/assets/loginlogo.png";

function AdminLoginPage() {
  return (
    <div className="bg-admin-background flex w-full flex-col text-white">
      <div className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <img src={mainLogoImg} alt="logo" className="h-10 w-7" />
            <p className="text-[40px] leading-none font-semibold">
              LIKELION KNU
            </p>
          </div>
          <p className="pr-0.5 text-right text-[16px] text-white">
            운영진 전용 페이지
          </p>
        </div>

        <div className="bg-admin-box flex h-44.75 w-full max-w-130.25 flex-col items-center justify-center rounded-[10px] border border-none">
          <Link
            to="/admin/user-list"
            className="border-gray2 hover:bg-black2 m-5 flex cursor-pointer items-center rounded-lg border-[0.4px] px-5 py-2.5 text-white transition"
          >
            <img src={googleImg} alt="google" className="w-6" />
            <p className="tracking-tight-custom ml-2.5 text-[16px] leading-140 font-semibold">
              구글 계정으로 시작하기
            </p>
          </Link>
          <Link
            to={"https://apply-page-client.vercel.app/"}
            className="text-admin-blue flex items-center justify-center hover:cursor-pointer"
          >
            <p className="mr-4">아기사자 지원페이지를 찾고 있나요?</p>
            <img
              src={linkImg}
              alt="linkToApplyPage"
              className="h-4.25 w-4.25"
            />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLoginPage;
