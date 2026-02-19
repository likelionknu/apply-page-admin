import Input from "../../../shared/components/Input";
import { useEffect, useRef } from "react";
import PriorityDropdown from "./PriorityDropdown";

interface RecruitQuestionItemProps {
  question: string;
  priority: number;
  totalCount: number;
  onPriorityChange: (newPriority: number) => void;
  onQuestionChange: (value: string) => void;
  onDelete: () => void;
}

const CancelIcon = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <div
      onClick={onDelete}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] bg-[#E55336] px-2 py-4"
    >
      <div className="bg-admin-white h-1 w-5"></div>
    </div>
  );
};

function RecruitQuestionItem({
  question,
  priority,
  totalCount,
  onPriorityChange,
  onQuestionChange,
  onDelete,
}: RecruitQuestionItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [question]);

  return (
    <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
      <PriorityDropdown
        currentPriority={priority}
        totalCount={totalCount}
        onPriorityChange={onPriorityChange}
      />
      <div className="flex w-full items-start gap-5 md:items-center">
        <div className="hidden w-full md:block">
          <Input
            type="text"
            placeholder="질문 입력"
            value={question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onQuestionChange(e.target.value)
            }
          />
        </div>
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="질문 입력"
          value={question}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onQuestionChange(e.target.value)
          }
          className="bg-admin-box w-full resize-none overflow-hidden rounded-[10px] px-7 py-4 md:hidden"
        />
        <CancelIcon onDelete={onDelete} />
      </div>
    </div>
  );
}

export default RecruitQuestionItem;
