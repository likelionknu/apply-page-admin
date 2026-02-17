import { useState } from "react";
import { Button, Footer, Header, Modal } from "@shared/components";
import RecruitInfoSection from "../components/RecruitInfoSection";
import RecruitQuestionSection from "../components/RecruitQuestionSection";
import type { Recruit } from "../types/RecruitQuestion";
import { createRecruit } from "@announce/apis";
import axios from "axios";

function AdminAnnouncementCreatePage() {
  const [recruitInfo, setRecruitInfo] = useState<Recruit>({
    title: "",
    start_at: "",
    end_at: "",
    questions: [],
  });
  const [activeModal, setActiveModal] = useState<boolean>(false);

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

  const handleAdd = async () => {
    try {
      const payload = recruitInfo;

      const { data } = await createRecruit(payload);

      const apiError = data.error;

      if (apiError.code === null) {
        setActiveModal(true);
      }
    } catch (error) {
      let msg = "서버와 연결할 수 없습니다.";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error?.message) {
          msg = error.response.data.error.message;
        } else if (error.response?.data?.message) {
          msg = error.response.data.message;
        }
      } else if (error instanceof Error) {
        msg = error.message;
      }

      console.log(msg);
    }
  };

  const handleClose = () => {
    setActiveModal(false);
  };

  return (
    <div className="flex w-full flex-col bg-black text-white">
      <Header />

      {activeModal && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title onClick={handleClose}>모집 공고 등록</Modal.Title>
            <Modal.Description>
              모집 공고를 성공적으로 등록했어요. {"\n"}
              모집 시작일이 도래하면 자동으로 공고가 공개돼요.
            </Modal.Description>
          </Modal.TextLayout>
          <Modal.ButtonLayout>
            <Button onClick={handleClose}>완료</Button>
          </Modal.ButtonLayout>
        </Modal>
      )}

      <main className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6 px-6 md:px-31">
        <div className="w-full pb-75">
          <div className="tracking-tight-custom text-[24px] font-medium md:text-[30px]">
            모집 공고 등록
          </div>

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
              onClick={handleAdd}
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
