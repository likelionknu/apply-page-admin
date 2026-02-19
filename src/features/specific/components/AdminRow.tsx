import React, { useState } from "react";
import UnCheckCircle1 from "@specific/assets/UnCheckCircle1.png";
import CheckedCircle1 from "@specific/assets/CheckedCircle1.png";

interface AdminRowProps {
  application_id: string | number;
  name: string;
  depart: string;
  memo: string;
  submitted_at: string;
  evaluation: string;
  status: string;
  onRowClick?: () => void;
}

export const AdminRow: React.FC<AdminRowProps> = ({
  application_id,
  name,
  depart,
  memo,
  submitted_at,
  evaluation,
  status,
  onRowClick,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      onClick={onRowClick}
      className="bg-admin-box hover:bg-admin-outline-2 flex h-12 w-298.5 cursor-pointer items-center justify-center rounded-[10px] transition"
    >
      <div className="flex w-284.5 items-center">
        <img
          src={isChecked ? CheckedCircle1 : UnCheckCircle1}
          alt="circle"
          className="h-4.75 w-4.75 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            setIsChecked((prev) => !prev);
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

        <div
          className={`ml-10 w-56 truncate text-center text-sm font-medium ${
            memo === "미등록" ? "text-admin-disable" : "text-white"
          }`}
        >
          {memo}
        </div>

        <div
          className={`ml-9 w-52 truncate text-center text-sm font-medium ${
            submitted_at === "최종 제출되지 않음"
              ? "text-admin-disable"
              : "text-white"
          }`}
        >
          {submitted_at}
        </div>

        <div
          className={`ml-9.25 w-14 truncate text-center text-sm font-medium ${
            evaluation === "PASS" ? "text-admin-blue" : "text-admin-disable"
          }`}
        >
          {evaluation}
        </div>

        <div className="ml-8.5 w-20 truncate text-center text-sm font-medium text-white">
          {status}
        </div>
      </div>
    </div>
  );
};
