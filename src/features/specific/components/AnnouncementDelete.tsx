import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { api } from "@shared/apis";

import { useState } from "react";

interface AnnouncementDeleteProps {
  id: number;
}

export const AnnouncementDelete = ({ id }: AnnouncementDeleteProps) => {
  const deleteAnnouncement = async () => {
    const res = await api.delete(`/v1/admin/recruits/${id}`);
    return res.data;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-admin-box flex h-9 w-20.25 cursor-pointer items-center justify-center rounded-[10px] text-center text-xs font-medium text-white hover:opacity-70 lg:w-24 lg:text-sm"
      >
        공고 삭제
      </div>

      {isOpen && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title>공고 삭제</Modal.Title>
            <Modal.Description>
              이 공고에 지원한 사용자(임시저장 상태 포함)가 존재한다면 이 작업은
              거부될 수 있어요
            </Modal.Description>
          </Modal.TextLayout>

          <Modal.ButtonLayout>
            <button onClick={() => setIsOpen(false)} className="flex w-full">
              <Button>취소</Button>
            </button>

            <div
              onClick={async () => {
                try {
                  await deleteAnnouncement();
                  setIsOpen(false);
                  setIsOpenSecond(true);
                } catch (error) {
                  console.error("삭제 실패:", error);
                  alert("삭제에 실패했습니다.");
                }
              }}
              className="flex w-full"
            >
              <Button>확인</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}

      {isOpenSecond && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title>공고 삭제</Modal.Title>
            <Modal.Description>{`요청한 공고를 삭제했어요`}</Modal.Description>
          </Modal.TextLayout>

          <Modal.ButtonLayout>
            <div onClick={() => setIsOpenSecond(false)} className="flex w-full">
              <Button>완료</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </>
  );
};
