import Button from "@shared/components/Button";
import Modal from "@shared/components/Modal";
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
  const detailFields = [
    { label: "이름", value: currentApplication.name },
    { label: "이메일 주소", value: currentApplication.email ?? "미등록" },
    { label: "학적 상태", value: currentApplication.academicStatus ?? "미등록" },
    { label: "전화번호", value: currentApplication.phone ?? "미등록" },
    { label: "학년", value: currentApplication.grade ?? "미등록" },
    { label: "학부", value: currentApplication.department ?? "미등록" },
    { label: "학번", value: currentApplication.studentId ?? "미등록" },
    { label: "최종 제출일", value: currentApplication.finalSubmittedAt ?? "미등록" },
  ];

  return (
    <div
      className="bg-admin-background/60 fixed inset-0"
      style={{ zIndex: 200 }}
    >
      {/* 웹 */}
      <div className="hidden md:block">
        <Modal>
          {/* 모달 헤더 */}
          <Modal.TextLayout>
            <Modal.Title onClick={onClose}>
              <div>
                지원서 상세 보기
                <span className="text-admin-sub ml-6 text-sm font-medium">
                  {submissionStatus}
                </span>
              </div>
            </Modal.Title>
          </Modal.TextLayout>

          {/* 기본 정보 + 질문/답변 영역 */}
          <div
            className="overflow-y-scroll px-5 pt-6"
            style={{ maxHeight: "calc(100vh - 320px)" }}
          >
            {/* 지원자 기본 정보 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {detailFields.map((field) => (
                <SpecificDetailField
                  key={field.label}
                  label={field.label}
                  value={field.value}
                />
              ))}
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
          <div className="border-admin-outline-2 border-t px-5 py-4">
            <div className="flex">
              <Button onClick={onClose}>완료</Button>
            </div>
          </div>
        </Modal>
      </div>

      {/* 모바일 */}
      <div className="block h-full p-1 md:hidden">
        <div
          className="border-admin-outline-2 bg-admin-background mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-[10px] border text-admin-white"
          style={{ maxHeight: "calc(100vh - 8px)" }}
        >
          <div className="border-admin-outline-2 flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-[16px] leading-none font-medium">지원서 상세보기</h2>
            </div>
            <img
              src={closeIcon}
              alt="닫기"
              className="h-6 w-6 cursor-pointer"
              onClick={onClose}
            />
          </div>

          <div className="flex-1 overflow-y-scroll px-4 py-4">
            <div className="space-y-2.5">
              {detailFields.map((field) => (
                <div
                  key={field.label}
                  className="flex items-center justify-between gap-3 text-left"
                >
                  <span className="text-admin-label text-[13px] font-medium">
                    {field.label}
                  </span>
                  <span className="text-admin-white text-[14px] font-medium">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-5">
              {questions.map((item, index) => (
                <div key={`${item.question}-${index}`} className="space-y-2">
                  <div className="text-admin-sub flex items-center justify-between text-[12px] font-medium">
                    <span>{item.question}</span>
                    <span>
                      {item.submittedCount ?? item.answer.replace(/\s/g, "").length}
                      자 제출됨
                    </span>
                  </div>
                  <div className="bg-admin-box rounded-[10px] px-4 py-4 text-left text-[13px] leading-7 whitespace-pre-line text-admin-white">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-admin-outline-2 border-t px-4 py-3">
            <div className="flex">
              <Button onClick={onClose}>완료</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
