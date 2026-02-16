import { useState } from "react";
import Vector2 from "@specific/assets/Vector2.png";

interface AnnouncementReviewButtonProps {
  text: string;
}

const AnnouncementReviewButton = ({ text }: AnnouncementReviewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
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

      {isOpen && (
        <div className="bg-admin-box text-admin-sub absolute top-11 z-50 flex h-20 w-28 flex-col items-center justify-around rounded-[10px] text-sm font-medium shadow-lg">
          <div className="hover:text-admin-blue w-19.75 cursor-pointer">
            PASS
          </div>
          <div className="hover:text-admin-red w-19.75 cursor-pointer">
            FAIL
          </div>
          <div className="hover:text-admin-white w-19.75 cursor-pointer">
            HOLD
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementReviewButton;
