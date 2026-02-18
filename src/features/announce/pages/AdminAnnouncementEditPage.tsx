import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Footer, Header, Modal } from "@shared/components";
import { editRecruit, getRecruit } from "@announce/apis";
import WarningMessage from "../components/WarningMessage";
import RecruitInfoSection from "../components/RecruitInfoSection";
import RecruitQuestionSection from "../components/RecruitQuestionSection";
import { useRecruitForm } from "../hooks/useRecruitForm";

function AdminAnnouncementEditPage() {
  const { recruitId } = useParams<{ recruitId: string }>();
  const {
    recruitInfo,
    setRecruitInfo,
    handleAddQuestion,
    handleDeleteQuestion,
    handleTitleChange,
    handleDateChange,
    handleQuestionChange,
    handlePriorityChange,
  } = useRecruitForm();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleEdit = async () => {
    let msg = "";

    const id = Number(recruitId);

    if (!recruitId || isNaN(id) || id <= 0) return;

    try {
      const { data } = await editRecruit({
        recruitId: id,
        payload: recruitInfo,
      });

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
    let msg = "";
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
        msg = "서버와 연결할 수 없습니다.";

        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error?.message) {
            msg = error.response.data.error.message;
          } else if (error.response?.data?.message) {
            msg = error.response.data.message;
          }
        } else if (error instanceof Error) {
          msg = error.message;
        }
      } finally {
        setMessage(msg);
        setActiveModal(true);
      }
    };

    fetchRecruit();
  }, [recruitId, setRecruitInfo]);

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

          <RecruitInfoSection
            title={recruitInfo.title}
            startAt={recruitInfo.start_at}
            endAt={recruitInfo.end_at}
            onTitleChange={handleTitleChange}
            onDateChange={handleDateChange}
          />

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
