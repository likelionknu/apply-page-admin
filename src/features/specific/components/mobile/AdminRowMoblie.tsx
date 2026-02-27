import React from "react";
import TwoArrow from "@specific/assets/TwoArrow.svg";

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
  onOpenSetting?: () => void;
}

export const AdminRowMobile: React.FC<AdminRowProps> = ({
  application_id,
  name,
  depart,
  memo,
  submit_at,
  evaluation,
  status,
  onSelect,
  onRowClick,
  onOpenSetting,
}) => {
  interface AdminRowMobileInfoProps {
    label: string;
    value: string;
  }

  const AdminRowMobileInfo: React.FC<AdminRowMobileInfoProps> = ({
    label,
    value,
  }) => {
    return (
      <div className="border-admin-outline-2 flex h-11 w-full items-center justify-center border-b">
        <div className="flex w-full items-center py-3.75">
          <div className="text-admin-label w-13.75 justify-start text-xs font-medium">
            {label}
          </div>
          <div className="ml-7.5 justify-start text-xs font-medium text-white">
            {value}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-admin-box mx-auto flex h-76 w-full flex-col items-center rounded-[10px] transition">
      <div className="w-full items-center justify-center">
        <div className="border-admin-outline-2 flex h-11.75 w-full justify-between rounded-tr-[10px] border-b px-5 py-3.75">
          <div className="flex">
            <div className="text-admin-label truncate text-center text-sm font-medium">
              {application_id}
            </div>
            <div className="ml-2.5 truncate text-center text-sm font-medium text-white">
              {name}
            </div>
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(application_id);
              onOpenSetting?.();
            }}
          >
            <img src={TwoArrow} alt="arrow" className="h-2 w-3" />
            <div className="text-admin-blue ml-1.25 justify-start text-right text-xs font-medium">
              지원서 설정
            </div>
          </div>
        </div>

        <div className="flex h-55 w-full flex-col items-center justify-center px-6.5">
          <AdminRowMobileInfo label="학부" value={depart} />
          <AdminRowMobileInfo label="운영진 메모" value={memo || "미등록"} />

          <AdminRowMobileInfo
            label="최종 제출일"
            value={submit_at || "최종 제출되지 않음"}
          />
          <AdminRowMobileInfo
            label="운영진 검토"
            value={evaluation || "미등록"}
          />
          <AdminRowMobileInfo label="지원 상태" value={status} />
        </div>
        <div
          className="text-admin-blue cursor-pointer justify-start py-2.5 text-center text-[10px] font-medium"
          onClick={onRowClick}
        >
          상세정보 열람하기
        </div>
      </div>
    </div>
  );
};
