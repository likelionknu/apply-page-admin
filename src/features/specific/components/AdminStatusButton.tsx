import { useState } from "react";
import Vector2 from "@specific/assets/Vector2.png";

interface AdminStatusButtonProps {
  text: string;
}

const AdminStatusButton = ({ text }: AdminStatusButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const STATUS_OPTIONS = [
    "임시저장",
    "최종제출",
    "서류 검토 중",
    "서류 합격",
    "서류 불합격",
    "면접 완료",
    "면접 대기",
    "면접 검토 중",
    "최종 탈락",
    "최종 합격",
    "회수",
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* 🔽 상단 버튼 */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-admin-box flex h-9 w-28 cursor-pointer items-center justify-center rounded-[10px] text-sm font-medium text-white hover:opacity-70"
      >
        <div className="flex items-center gap-4.25">
          {text}
          <img
            className={`h-1.5 w-2.5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={Vector2}
            alt="Vector2"
          />
        </div>
      </div>

      {/* 🔽 드롭다운 (absolute로 띄움) */}
      {isOpen && (
        <div className="bg-admin-box text-admin-sub scrollbar-hide absolute top-11 z-50 flex h-72 w-32 flex-col overflow-y-auto rounded-[10px] p-2 text-sm font-medium shadow-lg">
          {STATUS_OPTIONS.map((status) => (
            <div
              key={status}
              className="hover:text-admin-white flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors hover:bg-white/10"
              onClick={() => {
                /* 상태 변경 로직 */
                console.log(status);
              }}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStatusButton;
