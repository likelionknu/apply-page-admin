import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { useState } from "react";

interface AnnouncementButtonProps {
  text: string;
  modalTitle: string;
  modalDescription: string;
}

const AnnouncementButton = ({
  text,
  modalTitle,
  modalDescription,
}: AnnouncementButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="bg-admin-box flex h-9 w-28 cursor-pointer items-center justify-center rounded-[10px] text-sm font-medium text-white hover:opacity-70"
        onClick={() => setIsOpen(true)}
      >
        {text}
      </div>

      {isOpen && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title>{modalTitle}</Modal.Title>
            <Modal.Description>{modalDescription}</Modal.Description>
          </Modal.TextLayout>

          <Modal.ButtonLayout>
            <button onClick={() => setIsOpen(false)} className="flex w-full">
              <Button>취소</Button>
            </button>

            <div
              onClick={() => {
                setIsOpen(false);
              }}
              className="flex w-full"
            >
              <Button>확인</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </>
  );
};

export default AnnouncementButton;
