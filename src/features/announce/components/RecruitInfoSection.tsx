import Input from "../../../shared/components/Input";
import CalendarIcon from "../assets/calendar.png";
import InputLayout from "./InputLayout";
import Label from "./Label";
import SectionHeadr from "./SectionHeader";

const formatDate = (date: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

const formatDisplayDate = (date: string | Date) => {
  const formatted = formatDate(date);
  return formatted ? formatted.replace(/-/g, ".") : "";
};

interface DateInputProps {
  value: string | Date;
  onChange: (value: string) => void;
}

function DateInput({ value, onChange }: DateInputProps) {
  return (
    <div className="relative">
      <div
        className="bg-admin-box text-gray2 flex w-full items-center justify-between rounded-[10px] px-7 py-4 text-left"
      >
        <span>{formatDisplayDate(value)}</span>
        <img src={CalendarIcon} alt="" className="h-4 w-4" />
      </div>
      <input
        type="date"
        value={formatDate(value)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
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
