interface SpecificQuestionCardProps {
  question: string;
  answer: string;
  submittedCount?: number;
}

export function SpecificQuestionCard({
  question,
  answer,
  submittedCount,
}: SpecificQuestionCardProps) {
  const count = submittedCount ?? answer.replace(/\s/g, "").length;

  return (
    <div className="space-y-2.5">
      <div className="text-admin-sub flex items-center justify-between text-sm font-medium">
        <span>{question}</span>
        <span>{count}자 제출됨</span>
      </div>
      <div className="bg-admin-box rounded-[10px] px-5 py-5 text-left text-[15px] leading-8 whitespace-pre-line text-admin-white">
        {answer}
      </div>
    </div>
  );
}
