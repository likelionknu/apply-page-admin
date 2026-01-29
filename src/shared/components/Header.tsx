import logoImg from "../assets/logo.png";
import googleImg from "../assets/google.png";

const ToggleBar = () => (
  <div className="bg-gray1 h-0.5 w-4.5 rounded-[20px]"></div>
);

function Header() {
  return (
    <header className="text-white1 bg-black1 fixed z-100 flex h-20 w-full">
      <nav className="mx-auto flex w-full max-w-310 items-center justify-between">
        <div className="flex gap-14.5">
          <div className="flex cursor-pointer items-center gap-1">
            <img src={logoImg} alt="knu" className="w-9" />
            <p className="text-[21px] leading-140 font-bold">LIKELION KNU</p>
          </div>
          <div className="tracking-tight-custom flex items-center gap-12 text-[18px] leading-140 font-medium">
            <a className="hover:text-blue cursor-pointer">프로젝트</a>
            <a className="hover:text-blue cursor-pointer">파트 소개</a>
            <a className="hover:text-blue cursor-pointer">지원하기</a>
          </div>
        </div>
        <div className="flex items-center gap-[19.2px]">
          <div className="border-white1 mr-2 flex cursor-pointer items-center rounded-lg border-[0.4px] px-5 py-2.5">
            <img src={googleImg} alt="google" className="w-6" />
            <p className="tracking-tight-custom ml-2.5 text-base leading-140 font-semibold">
              구글 계정으로 시작하기
            </p>
          </div>
          <div className="mr-1.5 hidden cursor-pointer flex-col gap-[4.5px]">
            <ToggleBar />
            <ToggleBar />
            <ToggleBar />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
