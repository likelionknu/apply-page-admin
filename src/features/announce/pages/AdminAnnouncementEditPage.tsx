import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Footer, Header, Modal } from "@shared/components";
import WarningMessage from "../components/WarningMessage";
import RecruitInfoSection from "../components/RecruitInfoSection";
import RecruitQuestionSection from "../components/RecruitQuestionSection";
import { editRecruit, getRecruit } from "@announce/apis";
import type { Recruit } from "../types/RecruitQuestion";

function AdminAnnouncementEditPage() {
  const { recruitId } = useParams<{ recruitId: string }>();

  const [recruitInfo, setRecruitInfo] = useState<Recruit>({
    title: "",
    start_at: "",
    end_at: "",
    questions: [],
  });
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

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

  const handleEdit = async () => {
    let msg = "";

    const id = Number(recruitId);

    if (!recruitId || isNaN(id) || id <= 0) return;

    try {
      const payload = {
        recruitId: id,
        payload: recruitInfo,
      };

      const { data } = await editRecruit(payload);

      const apiError = data?.error;

      msg =
        apiError?.code === null
          ? `모집 공고를 성공적으로 수정했어요.\n수정한 공고는 즉시 사용자에게 공개돼요.`
          : `요청한 공고를 수정할 수 없어요.\n공고에 지원한 사용자가 있는지 다시 확인해주세요.`;
    } catch (error) {
      msg = "서버와 연결할 수 없습니다.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          msg = `서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.`;
        } else if (error.request) {
          msg = `서버와 연결할 수 없습니다.\n네트워크 상태를 확인해주세요.`;
        }
      }
    } finally {
      setMessage(msg);
      setActiveModal(true);
    }
  };

  const handleClose = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    const id = Number(recruitId);

    if (!recruitId || isNaN(id) || id <= 0) return;

    const fetchRecruit = async () => {
      try {
        const res = await getRecruit(id);
        const recruitData = res?.data?.data;

        if (!recruitData) return;

        const mappedQuestions = Array.isArray(recruitData.questions)
          ? recruitData.questions.map(
              (
                questionItem: string | { question?: string; priority?: number },
                index: number,
              ) => {
                if (typeof questionItem === "string") {
                  return {
                    question: questionItem,
                    priority: index + 1,
                  };
                }

                return {
                  question: questionItem.question ?? "",
                  priority: questionItem.priority ?? index + 1,
                };
              },
            )
          : [];

        setRecruitInfo({
          title: recruitData.title ?? "",
          start_at: recruitData.start_at ?? "",
          end_at: recruitData.end_at ?? "",
          questions: mappedQuestions,
        });
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

    fetchRecruit();
  }, [recruitId]);

  return (
    <div className="flex w-full flex-col bg-black text-white">
      <Header />

      {activeModal && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title onClick={handleClose}>모집 공고 수정</Modal.Title>
            <Modal.Description>{message}</Modal.Description>
          </Modal.TextLayout>
          <Modal.ButtonLayout>
            <Button onClick={handleClose}>완료</Button>
          </Modal.ButtonLayout>
        </Modal>
      )}

      <main className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6 px-6 md:px-31">
        <div className="w-full pb-75">
          <div className="tracking-tight-custom font-medium md:text-[30px]">
            모집 공고 수정
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
              onClick={handleEdit}
              className="text-gray2 bg-admin-box cursor-pointer rounded-[10px] px-8 py-2 text-[14px] font-medium contain-paint"
            >
              수정
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
export default AdminAnnouncementEditPage;
