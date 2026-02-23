import { useEffect, useMemo, useState } from "react";
import Button from "@shared/components/Button";
import Modal from "@shared/components/Modal";
import closeIcon from "@shared/assets/cancel.png";
import { SpecificDetailField } from "./SpecificDetailField";
import { SpecificQuestionCard } from "./SpecificQuestionCard";
import { getApplicationDetail } from "@specific/apis/applicationDetail";

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
  currentApplicationId: number;
  onClose: () => void;
}

export default function SpecificDetailModal({
  currentApplicationId,
  onClose,
}: Props) {
  /*api*/
  const [currentApplication, setCurrentApplication] =
    useState<SpecificApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /*api*/
  useEffect(() => {
    let mounted = true;

    const fetchApplicationDetail = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      setCurrentApplication(null);

      try {
        const detail = await getApplicationDetail(currentApplicationId);
        if (mounted) {
          setCurrentApplication(detail);
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "지원서 상세 정보를 불러오지 못했어요.",
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchApplicationDetail();

    return () => {
      mounted = false;
    };
  }, [currentApplicationId]);

  const questions = currentApplication?.questions ?? [];
  const submissionStatus = currentApplication?.submissionStatus;
  const detailFields = useMemo(
    () => [
      { label: "이름", value: currentApplication?.name ?? "미등록" },
      { label: "이메일 주소", value: currentApplication?.email ?? "미등록" },
      {
        label: "학적 상태",
        value: currentApplication?.academicStatus ?? "미등록",
      },
      { label: "전화번호", value: currentApplication?.phone ?? "미등록" },
      { label: "학년", value: currentApplication?.grade ?? "미등록" },
      { label: "학부", value: currentApplication?.department ?? "미등록" },
      { label: "학번", value: currentApplication?.studentId ?? "미등록" },
      {
        label: "최종 제출일",
        value: currentApplication?.finalSubmittedAt ?? "미등록",
      },
    ],
    [currentApplication],
  );

  return (
    <div
      className="bg-admin-background/60 fixed inset-0"
      style={{ zIndex: 200 }}
    >
      {/* 웹 */}
      <div className="hidden md:block">
        <div
          className="border-admin-outline-2 bg-admin-background text-admin-white fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[10px] border"
          style={{ zIndex: 201, width: 682, height: "calc(100vh - 40px)" }}
        >
          {/* 모달 헤더 */}
          <Modal.TextLayout>
            <Modal.Title onClick={onClose}>
              <div>
                지원서 상세 보기
                {submissionStatus && (
                  <span className="text-admin-sub ml-6 text-sm font-medium">
                    {submissionStatus}
                  </span>
                )}
              </div>
            </Modal.Title>
          </Modal.TextLayout>

          {/* 기본 정보 + 질문/답변 영역 */}
          <div className="flex-1 overflow-y-auto px-5 pt-6">
            {/*api*/}
            {isLoading && (
              <p className="text-admin-sub py-16 text-center text-sm font-medium">
                지원서 상세 정보를 불러오는 중이에요.
              </p>
            )}
            {/*api*/}
            {!isLoading && errorMessage && (
              <p className="text-admin-red py-16 text-center text-sm font-medium">
                {errorMessage}
              </p>
            )}
            {!isLoading && !errorMessage && currentApplication && (
              <>
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
                <div className="mt-8 space-y-7 select-text">
                  {questions.length === 0 && (
                    <p className="text-admin-sub text-left text-sm font-medium">
                      등록된 답변이 없어요.
                    </p>
                  )}
                  {questions.map((item, index) => (
                    <SpecificQuestionCard
                      key={`${item.question}-${index}`}
                      question={item.question}
                      answer={item.answer}
                      submittedCount={item.submittedCount}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* 하단 완료 버튼 */}
          <div className="border-admin-outline-2 border-t px-5 py-4">
            <div className="flex">
              <Button onClick={onClose}>완료</Button>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className="block h-full p-1 md:hidden">
        <div
          className="border-admin-outline-2 bg-admin-background text-admin-white mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-[10px] border"
          style={{ maxHeight: "calc(100vh - 8px)" }}
        >
          <div className="border-admin-outline-2 flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-[16px] leading-none font-medium">
                지원서 상세보기
              </h2>
            </div>
            <img
              src={closeIcon}
              alt="닫기"
              className="h-6 w-6 cursor-pointer"
              onClick={onClose}
            />
          </div>

          <div className="flex-1 overflow-y-scroll px-4 py-4">
            {/*api*/}
            {isLoading && (
              <p className="text-admin-sub py-12 text-center text-[13px] font-medium">
                지원서 상세 정보를 불러오는 중이에요.
              </p>
            )}
            {/*api*/}
            {!isLoading && errorMessage && (
              <p className="text-admin-red py-12 text-center text-[13px] font-medium">
                {errorMessage}
              </p>
            )}
            {!isLoading && !errorMessage && currentApplication && (
              <>
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

                <div className="mt-6 space-y-5 select-text">
                  {questions.length === 0 && (
                    <p className="text-admin-sub text-left text-[13px] font-medium">
                      등록된 답변이 없어요.
                    </p>
                  )}
                  {questions.map((item, index) => (
                    <div
                      key={`${item.question}-${index}`}
                      className="space-y-2"
                    >
                      <div className="text-admin-sub flex items-center justify-between text-[12px] font-medium">
                        <span>{item.question}</span>
                        <span>
                          {item.submittedCount ?? item.answer.length}자 제출됨
                        </span>
                      </div>
                      <div className="bg-admin-box text-admin-white rounded-[10px] px-4 py-4 text-left text-[13px] leading-7 whitespace-pre-line">
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
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
