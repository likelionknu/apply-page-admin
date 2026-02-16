import { useState } from "react";
import Footer from "@shared/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@shared/components/Modal";

import googleImg from "@shared/assets/google.png";
import linkImg from "@shared/assets/link.png";
import mainLogoImg from "@shared/assets/loginlogo.png";
import Button from "@shared/components/Button";

function AdminLoginPage() {
  const [showNoAccessModal, setShowNoAccessModal] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // const fakeEmail = "member@example.com"; //허용x
    const fakeEmail = "admin1@likelion.com"; //허용

    const allowedAdmins = ["admin1@likelion.com", "admin2@likelion.com"];

    if (allowedAdmins.includes(fakeEmail)) {
      navigate("/admin/user-list");
    } else {
      setShowNoAccessModal(true);
    }
  };

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
          <button
            onClick={handleGoogleLogin}
            className="border-gray2 hover:bg-black2 m-5 flex cursor-pointer items-center rounded-lg border-[0.4px] px-5 py-2.5 text-white transition"
          >
            <img src={googleImg} alt="google" className="w-6" />
            <p className="tracking-tight-custom ml-2.5 text-[16px] leading-140 font-semibold">
              구글 계정으로 시작하기
            </p>
          </button>

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

      {/* 권한 없는 경우 모달 */}
      {showNoAccessModal && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title onClick={() => setShowNoAccessModal(false)}>
              접근 권한이 부족해요{" "}
            </Modal.Title>
            <Modal.Description>
              {`이 페이지는 운영진을 위한 페이지에요\n일반 지원자는 대표 홈페이지에서 로그인해야 해요`}
            </Modal.Description>
          </Modal.TextLayout>
          <Modal.ButtonLayout>
            <div
              onClick={() => setShowNoAccessModal(false)}
              className="flex w-full"
            >
              <Button>완료</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </div>
  );
}

export default AdminLoginPage;
