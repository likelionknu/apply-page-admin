import WarringImg from "../assets/warring.png";

function WarningMessage() {
  return (
    <div className="bg-admin-box tracking-tight-custom border-admin-red mt-4 flex items-center gap-7 rounded-[10px] border px-7 py-4 text-[12px] leading-6 font-medium md:text-[15px] md:leading-0">
      <img src={WarringImg} alt="경고" className="w-4" />이 공고에 지원서를
      제출(임시저장 포함)한 사용자가 존재하다면 수정은 거부될 수 있어요
    </div>
  );
}

export default WarningMessage;
