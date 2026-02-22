import { useEffect, useMemo, useRef, useState } from "react";
import Input from "../../../shared/components/Input";
import CalendarIcon from "../assets/calendar.png";
import InputLayout from "./InputLayout";
import Label from "./Label";
import SectionHeadr from "./SectionHeader";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (date: string | Date) => {
  if (!date) return "";

  if (typeof date === "string") {
    const matched = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (matched) {
      return `${matched[1]}-${matched[2]}-${matched[3]}`;
    }
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  return formatLocalDate(parsed);
};

const formatDisplayDate = (date: string | Date) => {
  const formatted = formatDate(date);

  return formatted ? formatted.replace(/-/g, ".") : "";
};

const parseDate = (date: string | Date) => {
  const normalized = formatDate(date);
  if (!normalized) return null;

  const [year, month, day] = normalized.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const toInputDate = (date: Date) => {
  return formatLocalDate(date);
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getMonthDays = (currentMonth: Date) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const startDate = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return date;
  });
};

interface DateInputProps {
  value: string | Date;
  onChange: (value: string) => void;
}

function DateInput({ value, onChange }: DateInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedDate = useMemo(() => parseDate(value), [value]);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => {
    const base = selectedDate ?? new Date();

    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const monthDays = useMemo(() => getMonthDays(viewDate), [viewDate]);
  const today = useMemo(() => new Date(), []);

  const handleSelectDate = (date: Date) => {
    onChange(toInputDate(date));
    setIsOpen(false);
  };

  const handleToggleCalendar = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    const base = selectedDate ?? new Date();
    setViewDate(new Date(base.getFullYear(), base.getMonth(), 1));
    setIsOpen(true);
  };

  const monthLabel = `${viewDate.getFullYear()}년 ${String(
    viewDate.getMonth() + 1,
  ).padStart(2, "0")}월`;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={handleToggleCalendar}
        className="bg-admin-box text-gray2 flex h-14 w-full cursor-pointer items-center justify-between rounded-[10px] px-7 text-left"
      >
        <span className="block min-h-6 leading-6">
          {formatDisplayDate(value)}
        </span>
        <img src={CalendarIcon} alt="" className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="bg-admin-box absolute z-30 mt-2 w-full min-w-[320px] rounded-xl border border-white/10 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[18px] font-semibold text-white">
              {monthLabel}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                  )
                }
                className="cursor-pointer rounded-md px-2 py-1 text-white/80 hover:bg-white/10"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                  )
                }
                className="cursor-pointer rounded-md px-2 py-1 text-white/80 hover:bg-white/10"
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 text-center text-[12px] text-white/60">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {monthDays.map((date) => {
              const isCurrentMonth = date.getMonth() === viewDate.getMonth();
              const isSelected = selectedDate
                ? isSameDay(date, selectedDate)
                : false;
              const isToday = isSameDay(date, today);

              return (
                <button
                  key={`${date.getTime()}-${isCurrentMonth ? "c" : "o"}`}
                  type="button"
                  onClick={() => handleSelectDate(date)}
                  className={[
                    "mx-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[14px] transition-colors",
                    isCurrentMonth ? "text-white" : "text-white/30",
                    isSelected
                      ? "bg-white text-black"
                      : "hover:bg-white/10 hover:text-white",
                    isToday && !isSelected ? "border border-white/40" : "",
                  ].join(" ")}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface RecruitInfoSectionProps {
  title: string;
  startAt: string | Date;
  endAt: string | Date;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (key: "start_at" | "end_at", value: string) => void;
}

function RecruitInfoSection({
  title,
  startAt,
  endAt,
  onTitleChange,
  onDateChange,
}: RecruitInfoSectionProps) {
  return (
    <div className="mt-10">
      <SectionHeadr>공고 기본 정보</SectionHeadr>
      <div className="mt-8">
        <InputLayout>
          <Label>모집 공고 명을 입력해주세요.</Label>
          <Input
            placeholder="모집 공고 명"
            value={title}
            onChange={onTitleChange}
          />
        </InputLayout>
        <div className="mt-7 flex flex-col gap-7 md:flex-row">
          <InputLayout>
            <Label>모집 시작일을 선택해주세요.</Label>
            <DateInput
              value={startAt}
              onChange={(value: string) => onDateChange("start_at", value)}
            />
          </InputLayout>
          <InputLayout>
            <Label>모집 종료일을 선택해주세요.</Label>
            <DateInput
              value={endAt}
              onChange={(value: string) => onDateChange("end_at", value)}
            />
          </InputLayout>
        </div>
      </div>
    </div>
  );
}

export default RecruitInfoSection;
