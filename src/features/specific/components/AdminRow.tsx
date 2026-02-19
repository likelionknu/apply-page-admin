import React, { useState } from "react";
import UnCheckCircle1 from "@specific/assets/UnCheckCircle1.png";
import CheckedCircle1 from "@specific/assets/CheckedCircle1.png";

interface AdminRowProps {
  application_id: number;
  name: string;
  depart: string;
  memo: string | null;
  submit_at: string | null;
  evaluation: string;
  status: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onRowClick?: () => void;
}

export const AdminRow: React.FC<AdminRowProps> = ({
  application_id,
  name,
  depart,
  memo,
  submit_at,
  evaluation,
  status,
  isSelected,
  onSelect,
  onRowClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const evaluationColorMap: Record<string, string> = {
    PASS: "text-admin-blue",
    FAIL: "text-admin-red",
    HOLD: "text-[#F8D90E]",
  };

  return (
    <div
      className="bg-admin-box hover:bg-admin-outline-2 flex h-12 w-298.5 cursor-pointer items-center justify-center rounded-[10px] transition"
      onClick={onRowClick}
    >
      <div className="flex w-284.5 items-center">
        <img
          src={isSelected ? CheckedCircle1 : UnCheckCircle1}
          alt="circle"
          className="h-4.75 w-4.75 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(application_id);
          }}
        />

        <div className="ml-8.25 w-12 truncate text-center text-sm font-medium text-white">
          {application_id}
        </div>

        <div className="ml-13.25 w-16 truncate text-center text-sm font-medium text-white">
          {name}
        </div>

        <div className="ml-12 w-40 truncate text-center text-sm font-medium text-white">
          {depart}
        </div>

        <div className="relative ml-10 w-56 text-center text-sm font-medium">
          <div
            onClick={(event) => {
              event.stopPropagation();
              if (memo) {
                setIsOpen(!isOpen);
              }
            }}
            className={`cursor-pointer truncate ${
              !memo ? "text-admin-disable" : "text-white"
            }`}
          >
            {memo && memo.trim() !== "" ? memo : "미등록"}
          </div>

          {isOpen && memo && (
            <div className="absolute top-full left-1/2 z-50 mt-2 w-80 -translate-x-1/2 rounded-lg bg-black p-3 text-xs text-white shadow-lg">
              {memo}
            </div>
          )}
        </div>

        <div
          className={`ml-9 w-52 truncate text-center text-sm font-medium ${
            submit_at === null ? "text-admin-disable" : "text-white"
          }`}
        >
          {submit_at ?? "최종 제출되지 않음"}
        </div>

        <div
          className={`ml-9.25 w-14 truncate text-center text-sm font-medium ${
            evaluationColorMap[evaluation ?? ""] ?? "text-admin-disable"
          }`}
        >
          {evaluation ?? "미등록"}
        </div>

        <div className="ml-8.5 w-20 truncate text-center text-sm font-medium text-white">
          {status}
        </div>
      </div>
    </div>
  );
};
