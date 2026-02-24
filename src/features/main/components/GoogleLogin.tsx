import GoogleImg from "@shared/assets/google.png";
import GoogleLoginHandler from "@shared/apis/GoogleLogin";

function GoogleLogin() {
  const handleClick = () => {
    GoogleLoginHandler();
  };

  return (
    <div
      onClick={handleClick}
      className="border-white1 flex cursor-pointer items-center rounded-xl md:rounded-lg border-[0.4px] px-8 py-2.5"
    >
      <img src={GoogleImg} alt="google" className="w-3.5 h-3.5 md:w-6" />
      <span className="tracking-tight-custom ml-2.5 text-[14px] md:text-base leading-140 font-semibold">
        구글 계정으로 시작하기
      </span>
    </div>
  );
}

export default GoogleLogin;
