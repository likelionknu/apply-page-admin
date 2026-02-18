import closeIcon from "@shared/assets/cancel.png";
import { SpecificDetailField } from "./SpecificDetailField";
import { SpecificQuestionCard } from "./SpecificQuestionCard";

export interface SpecificApplication {
  application_id: number;
  name: string;
  email?: string;
  academicStatus?: string;
  phone?: string;
  grade?: string;
  department?: string;
  studentId?: string;
  finalSubmittedAt?: string;
  submissionStatus?: string;
  questions?: {
    question: string;
    answer: string;
    submittedCount?: number;
  }[];
}

interface Props {
  applications: SpecificApplication[];
  currentApplicationId: number;
  onClose: () => void;
}

export default function SpecificDetailModal({
  applications,
  currentApplicationId,
  onClose,
}: Props) {
  const currentApplication =
    applications.find(
      (application) => application.application_id === currentApplicationId,
    ) ?? null;

  if (!currentApplication) {
    return null;
  }

  const questions = currentApplication.questions ?? [];
  const submissionStatus = currentApplication.submissionStatus ?? "최종제출";

  return (
    <div
      className="fixed inset-0 bg-admin-background/60"
      style={{ zIndex: 200 }}
    >
      {/* 상세 모달 본문 */}
      <div
        className="border-admin-outline-2 fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[10px] border bg-admin-background text-admin-white"
        style={{ zIndex: 201, width: 682, height: "calc(100vh - 40px)" }}
      >
        {/* 모달 헤더 */}
        <div className="border-admin-outline-2 flex items-center justify-between border-b px-5 py-5">
          <div className="flex items-center gap-6">
            <h2 className="text-[30px] font-medium">지원서상세보기</h2>
            <span className="text-admin-sub text-sm font-medium">
              {submissionStatus}
            </span>
          </div>
          <img
            src={closeIcon}
            alt="닫기"
            className="h-6 w-6 cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* 기본 정보 + 질문/답변 영역 */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* 지원자 기본 정보 */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <SpecificDetailField label="이름" value={currentApplication.name} />
            <SpecificDetailField
              label="이메일 주소"
              value={currentApplication.email ?? "미등록"}
            />
            <SpecificDetailField
              label="학적 상태"
              value={currentApplication.academicStatus ?? "미등록"}
            />
            <SpecificDetailField
              label="전화번호"
              value={currentApplication.phone ?? "미등록"}
            />
            <SpecificDetailField
              label="학년"
              value={currentApplication.grade ?? "미등록"}
            />
            <SpecificDetailField
              label="학부"
              value={currentApplication.department ?? "미등록"}
            />
            <SpecificDetailField
              label="학번"
              value={currentApplication.studentId ?? "미등록"}
            />
            <SpecificDetailField
              label="최종 제출일"
              value={currentApplication.finalSubmittedAt ?? "미등록"}
            />
          </div>

          {/* 질문/답변 카드 목록 */}
          <div className="mt-8 space-y-7">
            {questions.map((item, index) => (
              <SpecificQuestionCard
                key={`${item.question}-${index}`}
                question={item.question}
                answer={item.answer}
                submittedCount={item.submittedCount}
              />
            ))}
          </div>
        </div>

        {/* 하단 완료 버튼 */}
        <div className="px-5 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-admin-box text-admin-white h-11 cursor-pointer rounded-[10px] text-sm font-medium"
            style={{ width: 642 }}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
