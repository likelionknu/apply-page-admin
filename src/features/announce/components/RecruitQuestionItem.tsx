import Input from "../../../shared/components/Input";
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
      className="flex cursor-pointer items-center justify-center rounded-[50%] bg-[#E55336] px-2 py-4"
    >
      <div className="bg-gray2 h-1 w-5"></div>
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
  return (
    <div className="flex items-center gap-5">
      <PriorityDropdown
        currentPriority={priority}
        totalCount={totalCount}
        onPriorityChange={onPriorityChange}
      />
      <Input
        type="text"
        placeholder="질문 입력"
        value={question}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onQuestionChange(e.target.value)
        }
      />
      <CancelIcon onDelete={onDelete} />
    </div>
  );
}

export default RecruitQuestionItem;
