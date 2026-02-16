import { useMemo, useState } from "react";
import type { Filter, FilterOption } from "../types/AnnouncementManagement";

type DropdownSize = "web" | "mobile";

const DROPDOWN_TRIGGER_CLASS: Record<DropdownSize, string> = {
  web: "cursor-pointer flex h-9.25 w-26.75 items-center justify-between rounded-xl border border-admin-outline/10 bg-admin-outline/10 px-3 text-sm font-normal text-admin-white",
  mobile:
    "cursor-pointer flex h-9 w-22.75 items-center justify-between rounded-xl border border-admin-outline/10 bg-admin-outline/10 px-3 text-[13px] font-normal text-admin-white",
};

const DROPDOWN_MENU_CLASS: Record<DropdownSize, string> = {
  web: "absolute right-0 z-50 mt-2 w-26.75 overflow-hidden rounded-xl border border-admin-outline/10 bg-admin-box/90 shadow-2xl backdrop-blur-md",
  mobile:
    "absolute left-0 z-50 mt-2 w-28 overflow-hidden rounded-xl border border-admin-outline/10 bg-admin-box/90 shadow-2xl backdrop-blur-md",
};

interface AnnouncementFilterDropdownProps {
  value: Filter;
  options: FilterOption[];
  onChange: (value: Filter) => void;
  size?: DropdownSize;
}

function AnnouncementFilterDropdown({
  value,
  options,
  onChange,
  size = "web",
}: AnnouncementFilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label ?? value,
    [options, value],
  );

  const handleSelect = (nextValue: Filter) => {
    onChange(nextValue);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={DROPDOWN_TRIGGER_CLASS[size]}
      >
        <span>{selectedLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="opacity-80"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="close"
          />

          {/* 필터 옵션 목록 */}
          <div className={DROPDOWN_MENU_CLASS[size]}>
            {options.map((option) => {
              const active = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`hover:bg-admin-outline/5 w-full cursor-pointer px-3 py-2 text-left text-sm font-normal ${
                    active ? "text-admin-white" : "text-admin-sub"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default AnnouncementFilterDropdown;
