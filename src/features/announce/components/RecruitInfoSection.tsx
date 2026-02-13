import Input from "../../../shared/components/Input";
import InputLayout from "./InputLayout";
import Label from "./Label";
import SectionHeadr from "./SectionHeader";

const formatDate = (date: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

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
        <div className="mt-7 flex gap-7">
          <InputLayout>
            <Label>모집 시작일을 선택해주세요.</Label>
            <Input
              type="date"
              placeholder="2025.01.03"
              value={formatDate(startAt)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onDateChange("start_at", e.target.value)
              }
            />
          </InputLayout>
          <InputLayout>
            <Label>모집 종료일을 선택해주세요.</Label>
            <Input
              type="date"
              placeholder="2025.01.03"
              value={formatDate(endAt)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onDateChange("end_at", e.target.value)
              }
            />
          </InputLayout>
        </div>
      </div>
    </div>
  );
}

export default RecruitInfoSection;
