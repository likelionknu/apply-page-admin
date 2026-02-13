import RecruitQuestionItem from "./RecruitQuestionItem";
import type { RecruitQuestions } from "../types/RecruitQuestion";
import AddQuestion from "./AddQuestion";
import SectionHeadr from "./SectionHeader";

interface RecruitQuestionSectionProps {
  questions: RecruitQuestions[];
  onAdd: () => void;
  onDelete: (targetIndex: number) => void;
  onQuestionChange: (index: number, value: string) => void;
  onPriorityChange: (currentPriority: number, newPriority: number) => void;
}

function RecruitQuestionSection({
  questions,
  onAdd,
  onDelete,
  onQuestionChange,
  onPriorityChange,
}: RecruitQuestionSectionProps) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <SectionHeadr>공고 입력 질문 설정</SectionHeadr>
        <AddQuestion onAdd={onAdd} />
      </div>
      <div className="mt-7 flex flex-col gap-7">
        {questions.map((item, index) => (
          <RecruitQuestionItem
            key={item.priority}
            priority={item.priority}
            question={item.question}
            totalCount={questions.length}
            onPriorityChange={(newPriority) =>
              onPriorityChange(item.priority, newPriority)
            }
            onQuestionChange={(val) => onQuestionChange(index, val)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecruitQuestionSection;
