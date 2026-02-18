import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { useState } from "react";
import { api } from "@shared/apis";

// @specific/components/ApplicationDelete.tsx (또는 해당 파일)

interface Props {
  selectedId: number | null;
}

export const AnnouncementDeleteButton = ({ selectedId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedId) {
      alert("삭제할 지원서를 선택해주세요.");
      return;
    }

    try {
      await api.delete(`/v1/admin/applications/${selectedId}`);
      window.location.reload();
      alert("삭제되었습니다.");
      setIsOpen(false);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div
        className="bg-admin-box flex h-9 w-28 cursor-pointer items-center justify-center rounded-[10px] text-sm font-medium text-white hover:opacity-70"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        지원서 삭제
      </div>

      {isOpen && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title>지원서 삭제</Modal.Title>
            <Modal.Description>
              {`선택한 지원서를 삭제할까요?\n이 작업은 되돌릴 수 없어요.`}
            </Modal.Description>
          </Modal.TextLayout>

          <Modal.ButtonLayout>
            <button onClick={() => setIsOpen(false)} className="flex w-full">
              <Button>취소</Button>
            </button>

            <div onClick={handleDelete} className="flex w-full">
              <Button>확인</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </>
  );
};
