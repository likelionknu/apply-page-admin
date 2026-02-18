import { useState } from "react";
import Vector2 from "@specific/assets/Vector2.png";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { api } from "@shared/apis";

interface AnnouncementReviewButtonProps {
  selectedId: number | null;
}

const AnnouncementReviewButton = ({
  selectedId,
}: AnnouncementReviewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reviewState, setReviewState] = useState("");

  const handleChangeReview = async () => {
    if (!selectedId) {
      alert("검토 변경할 지원서를 선택해주세요.");
      return;
    }

    try {
      await api.patch(`/v1/admin/applications/${selectedId}`, {
        evaluation: reviewState,
      });

      alert("검토가 변경되었습니다.");
      window.location.reload();
      setIsOpen(false);
    } catch (error) {
      console.error("검토 변경 실패:", error);
      alert("검토 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-admin-box flex h-9 w-28 cursor-pointer items-center justify-center rounded-[10px] text-sm font-medium text-white hover:opacity-70"
      >
        <div className="flex items-center gap-4.25">
          검토 변경
          <img
            className={`h-1.5 w-2.5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={Vector2}
            alt="Vector2"
          />
        </div>
      </div>

      {isOpen && (
        <div className="bg-admin-box text-admin-sub absolute top-11 z-50 flex h-20 w-28 flex-col items-center justify-around rounded-[10px] text-sm font-medium shadow-lg">
          <div
            className="hover:text-admin-blue w-19.75 cursor-pointer"
            onClick={() => {
              setIsOpenModal(true);
              setReviewState("PASS");
            }}
          >
            PASS
          </div>
          <div
            className="hover:text-admin-red w-19.75 cursor-pointer"
            onClick={() => {
              setIsOpenModal(true);
              setReviewState("FAIL");
            }}
          >
            FAIL
          </div>
          <div
            className="hover:text-admin-white w-19.75 cursor-pointer"
            onClick={() => {
              setIsOpenModal(true);
              setReviewState("HOLD");
            }}
          >
            HOLD
          </div>
        </div>
      )}
      {isOpenModal && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title>지원서 검토 변경</Modal.Title>
            <Modal.Description>
              {`지원서 상태를 변경할까요?\n지원서 상태를 변경하면 사용자에게 즉시 공개돼요`}
            </Modal.Description>
          </Modal.TextLayout>

          <Modal.ButtonLayout>
            <button
              onClick={() => setIsOpenModal(false)}
              className="flex w-full"
            >
              <Button>취소</Button>
            </button>

            <div onClick={handleChangeReview} className="flex w-full">
              <Button>확인</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </div>
  );
};

export default AnnouncementReviewButton;
