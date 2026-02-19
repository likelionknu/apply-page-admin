import { useState } from "react";
import axios from "axios";
import { Button, Footer, Header, Modal } from "@shared/components";
import { createRecruit } from "@announce/apis";
import RecruitInfoSection from "../components/RecruitInfoSection";
import RecruitQuestionSection from "../components/RecruitQuestionSection";
import { useRecruitForm } from "../hooks/useRecruitForm";

function AdminAnnouncementCreatePage() {
  const {
    recruitInfo,
    handleAddQuestion,
    handleDeleteQuestion,
    handleTitleChange,
    handleDateChange,
    handleQuestionChange,
    handlePriorityChange,
  } = useRecruitForm();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAdd = async () => {
    let msg = "";

    try {
      const { data } = await createRecruit(recruitInfo);
      const apiError = data?.error;

      msg =
        apiError?.code === null
          ? `모집 공고를 성공적으로 등록했어요.\n모집 시작일이 미래라면 자동으로 공고가 공개돼요.`
          : `요청한 공고를 등록할 수 없어요.\n입력한 내용을 다시 확인해주세요.`;
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
            <Modal.Description>{message}</Modal.Description>
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
