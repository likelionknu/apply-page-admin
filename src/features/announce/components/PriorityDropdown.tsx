import { useState } from "react";
import DropdownImg from "../assets/dropdown.png";

interface PriorityDropdown {
  currentPriority: number;
  totalCount: number;
  onPriorityChange: (newPriority: number) => void;
}

function PriorityDropdown({
  currentPriority,
  totalCount,
  onPriorityChange,
}: PriorityDropdown) {
  const [isOpen, setIsOpen] = useState(false); // 셀렉트 박스 활성화

  const priorityOptions = Array.from({ length: totalCount }, (_, i) => i + 1);

  // 선택 후 비활성화
  const handleSelect = (priority: number) => {
    onPriorityChange(priority);
    setIsOpen(false);
  };

  return (
    <div className="relative md:w-26.75">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray2 bg-admin-box flex cursor-pointer items-center justify-between rounded-[10px] px-3 py-2 text-[14px] font-medium"
      >
        <span>순서 {currentPriority}</span>
        <img
          src={DropdownImg}
          alt="드랍다운"
          className={`w-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full overflow-hidden rounded-[10px] border border-gray-700 bg-[#1A1A1A] shadow-lg">
          {priorityOptions.map((p) => (
            <div
              key={p}
              onClick={() => handleSelect(p)}
              className={`cursor-pointer px-4 py-2 text-[14px] hover:bg-gray-700 ${
                p === currentPriority
                  ? "bg-gray-800 font-bold text-white"
                  : "text-gray-400"
              }`}
            >
              순서 {p}
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-0 cursor-default"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default PriorityDropdown;
