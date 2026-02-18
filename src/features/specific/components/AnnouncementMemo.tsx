import { useState } from "react";
import CloseImg from "@shared/assets/cancel.png";
import { api } from "@shared/apis";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";

interface Props {
  selectedId: number | null;
}

export const AnnouncementMemo = ({ selectedId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [memoSize, setMemoSize] = useState("");
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  const RegistrationCompletion = () => {
    setIsOpenSecond(false);

    window.location.reload();
  };

  const handleMemo = async () => {
    if (!selectedId) {
      alert("메모할 지원서를 선택해주세요.");
      return;
    }

    try {
      await api.post(`/v1/admin/applications/${selectedId}/memos`, {
        memo: memoSize,
      });
      setIsOpen(false);
      setIsOpenSecond(true);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("메모 작성 오류가 발생했습니다.");
    }
  };

  const openModal = () => {
    if (!selectedId) {
      alert("메모할 지원서를 선택해주세요.");
      return;
    } else {
      document.body.style.overflow = "hidden";
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsOpen(false);
  };

  const MAX_LENGTH = 100;

  return (
    <>
      <div
        className="bg-admin-box flex h-9 w-28 cursor-pointer items-center justify-center rounded-[10px] text-sm font-medium text-white hover:opacity-70"
        onClick={openModal}
      >
        메모 등록
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="border-admin-outline-2 fixed top-1/3 left-1/2 z-50 flex min-h-96 w-87 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[10px] border bg-black md:top-1/2 md:w-auto md:min-w-170.5">
            <div className="border-admin-outline-2 h-16 w-full rounded-tl-[10px] rounded-tr-[10px] border-b px-5 py-5">
              <div className="flex w-full justify-between">
                <div className="text-xl font-medium text-white">
                  운영진 메모 등록
                </div>
                <img
                  src={CloseImg}
                  alt="닫기"
                  className="h-6 w-6 cursor-pointer hover:opacity-70"
                  onClick={closeModal}
                />
              </div>
            </div>

            <div className="mt-3.25 w-full px-5 md:w-160.5">
              <div className="text-admin-sub text-base font-medium">
                운영진 메모를 입력하세요
              </div>

              <textarea
                value={memoSize}
                maxLength={MAX_LENGTH}
                onChange={(e) => setMemoSize(e.target.value)}
                className="bg-admin-box mt-2.5 h-44 w-full resize-none rounded-[10px] px-5 py-3.5 text-white outline-none"
              />

              <div
                className={`mb-3 flex w-full justify-end text-xs font-medium ${
                  MAX_LENGTH - memoSize.length === 0
                    ? "text-admin-red"
                    : "text-admin-disable"
                }`}
              >
                {MAX_LENGTH - memoSize.length}자 남음
              </div>

              <div className="flex w-full justify-between gap-4">
                <div
                  className="bg-admin-box flex h-11 w-full cursor-pointer items-center justify-center rounded-[10px] text-white hover:opacity-70"
                  onClick={closeModal}
                >
                  취소
                </div>

                <div
                  className="bg-admin-box flex h-11 w-full cursor-pointer items-center justify-center rounded-[10px] text-white hover:opacity-70"
                  onClick={handleMemo}
                >
                  등록
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isOpenSecond && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title>등록 완료</Modal.Title>
            <Modal.Description>{`사용자에 대한 메모를 등록했어요`}</Modal.Description>
          </Modal.TextLayout>

          <Modal.ButtonLayout>
            <div onClick={RegistrationCompletion} className="flex w-full">
              <Button>완료</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </>
  );
};
