import Footer from "@shared/components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import Modal from "@shared/components/Modal";

import linkImg from "@shared/assets/link.png";
import mainLogoImg from "@shared/assets/loginlogo.png";
import Button from "@shared/components/Button";
import GoogleLogin from "@main/components/GoogleLogin";

function AdminLoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const showNoAccessModal = searchParams.get("reason") === "no-access";

  const closeModal = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("reason");
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="bg-admin-background flex w-full flex-col text-white">
      <div className="mx-auto mt-30 flex min-h-dvh w-full max-w-360 flex-col items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <img src={mainLogoImg} alt="logo" className="w-4.75 h-7 md:h-10 md:w-7" />
            <p className="text-[30px] md:text-[40px] leading-none font-semibold">
              LIKELION KNU
            </p>
          </div>
          <p className="pr-0.5 text-right text-[16px] text-white">
            운영진 전용 페이지
          </p>
        </div>

        <div className="bg-admin-box flex h-44.75 w-full md:max-w-130.25 max-w-87.5  flex-col items-center justify-center gap-5 rounded-[10px] border border-none">
          <GoogleLogin />
          <Link
            to={"https://www.likelionknu.com"}
            className="text-admin-blue flex items-center justify-center hover:cursor-pointer"
          >
            <p className="text-[13px] mr-2 md:mr-4">아기사자 지원페이지를 찾고 있나요?</p>
            <img
              src={linkImg}
              alt="linkToApplyPage"
              className="h-3 w-3 md:h-4.25 md:w-4.25"
            />
          </Link>
        </div>
      </div>
      <Footer />

      {/* 권한 없는 경우 모달 */}
      {showNoAccessModal && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title onClick={closeModal}>접근 권한이 부족해요</Modal.Title>
            <Modal.Description>
              이 페이지는 운영진을 위한 페이지에요.{"\n"}
              일반 지원자는 대표 홈페이지에서 로그인해야 해요.
            </Modal.Description>
          </Modal.TextLayout>
          <Modal.ButtonLayout>
            <Button onClick={closeModal}>확인</Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </div>
  );
}

export default AdminLoginPage;
