import { useState } from "react";
import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import WarningMessage from "../components/WarningMessage";
import RecruitInfoSection from "../components/RecruitInfoSection";
import RecruitQuestionSection from "../components/RecruitQuestionSection";
import type { RecruitQuestions } from "../types/RecruitQuestion";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";

interface RecruitQuestion {
  title: string;
  start_at: string | Date;
  end_at: string | Date;
  questions: RecruitQuestions[];
}

function AdminAnnouncementCreatePage() {
  const [recruitInfo, setRecruitInfo] = useState<RecruitQuestion>({
    title: "",
    start_at: "",
    end_at: "",
    questions: [],
  });

  // 질문 추가
  const handleAddQuestion = () => {
    setRecruitInfo((prev) => {
      const nextPriority = prev.questions.length + 1;

      return {
        ...prev,
        questions: [
          ...prev.questions,
          {
            priority: nextPriority,
            question: "",
          },
        ],
      };
    });
  };

  // 질문 삭제
  const handleDeleteQuestion = (targetIndex: number) => {
    setRecruitInfo((prev) => {
      const filterdQuestions = prev.questions.filter(
        (_, index) => index !== targetIndex,
      );

      const newQuestions = filterdQuestions.map((item, index) => ({
        ...item,
        priority: index + 1,
      }));

      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  // 제목 변경
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecruitInfo((prev) => ({ ...prev, title: e.target.value }));
  };

  // 날짜 변경
  const handleDateChange = (key: "start_at" | "end_at", value: string) => {
    if (!value) return;

    const dateObj = new Date(value);
    setRecruitInfo((prev) => ({ ...prev, [key]: dateObj.toISOString() }));
  };

  // 질문 내용 변경
  const handleQuestionChange = (index: number, value: string) => {
    setRecruitInfo((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = { ...newQuestions[index], question: value };
      return { ...prev, questions: newQuestions };
    });
  };

  // 우선순위 변경 및 정렬
  const handlePriorityChange = (
    currentPriority: number,
    newPriority: number,
  ) => {
    if (currentPriority === newPriority) return;

    setRecruitInfo((prev) => {
      const questions = [...prev.questions];

      const targetIndex = questions.findIndex(
        (q) => q.priority === currentPriority,
      );
      const swapIndex = questions.findIndex((q) => q.priority === newPriority);

      if (targetIndex === -1 || swapIndex === -1) return prev;

      questions[targetIndex] = {
        ...questions[targetIndex],
        priority: newPriority,
      };
      questions[swapIndex] = {
        ...questions[swapIndex],
        priority: currentPriority,
      };

      questions.sort((a, b) => a.priority - b.priority);

      return { ...prev, questions };
    });
  };

  return (
    <div className="flex w-full flex-col bg-black text-white">
      <Header />

      {/* <Modal>
        <Modal.TextLayout>
          <Modal.Title>나는 모달</Modal.Title>
          <Modal.Description>
            이 공고에 지원한 사용자(임시저장 상태 포함)가 존재한다면 이 작업은
            거부될 수 있어요
          </Modal.Description>
        </Modal.TextLayout>
        <Modal.ButtonLayout>
          <Button>취소</Button>
          <Button>확인</Button>
        </Modal.ButtonLayout>
      </Modal> */}

      <main className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6">
        <div className="w-full pb-75 md:px-31">
          <div className="tracking-tight-custom font-medium md:text-[30px]">
            모집 공고 등록
          </div>

          <WarningMessage />

          {/* 공고 명, 시작 일 종료 일 */}
          <RecruitInfoSection
            title={recruitInfo.title}
            startAt={recruitInfo.start_at}
            endAt={recruitInfo.end_at}
            onTitleChange={handleTitleChange}
            onDateChange={handleDateChange}
          />

          {/* 공고 질문들 */}
          <RecruitQuestionSection
            questions={recruitInfo.questions}
            onAdd={handleAddQuestion}
            onDelete={handleDeleteQuestion}
            onQuestionChange={handleQuestionChange}
            onPriorityChange={handlePriorityChange}
          />

          <div className="mt-12 w-full text-right">
            <button
              type="button"
              className="text-gray2 bg-admin-box cursor-pointer rounded-[10px] px-8 py-2 text-[14px] font-medium contain-paint"
            >
              등록
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
export default AdminAnnouncementCreatePage;
