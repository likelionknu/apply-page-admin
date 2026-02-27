import { useState, useRef, useEffect } from "react";
import Vector2 from "@specific/assets/Vector2.png";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { api } from "@shared/apis";
import { useMediaQuery } from "react-responsive";
import MobileArrow from "@specific/assets/MobileArrow.png";

interface AdminStatusButtonProps {
  selectedId: number | null;
}

const AdminStatusButton = ({ selectedId }: AdminStatusButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusOption, setStatusOption] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ChangeCompletion = () => {
    setIsOpenSecond(false);

    window.location.reload();
  };

  const STATUS_MAP: Record<string, string> = {
    임시저장: "DRAFT",
    최종제출: "SUBMITTED",
    "서류 검토 중": "UNDER_DOCUMENT_REVIEW",
    "서류 합격": "DOCUMENT_PASSED",
    "서류 불합격": "DOCUMENT_FAILED",
    "면접 대기": "WAITING_INTERVIEW",
    "면접 완료": "DONE_INTERVIEW",
    "면접 검토 중": "UNDER_INTERVIEW_REVIEW",
    "최종 불합격": "FAIL_INTERVIEW",
    "최종 합격": "FINAL_PASSED",
    회수: "CANCELED",
  };

  const handleChangeStatus = async () => {
    try {
      await api.patch(`/v1/admin/applications/${selectedId}`, {
        status: statusOption,
      });

      setIsOpenSecond(true);
      setIsOpen(false);
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div ref={dropdownRef} className="relative flex flex-col items-center">
      {isMobile ? (
        <div
          className="bg-admin-box flex h-9 w-full cursor-pointer items-center justify-center rounded-[10px]"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex w-full items-center justify-between px-5">
            <div className="text-admin-sub text-sm font-medium">
              지원서 상태 변경
            </div>
            <img src={MobileArrow} alt="MobileArrow" className="h-2 w-3" />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-admin-box flex h-9 w-28 cursor-pointer items-center justify-center rounded-[10px] text-sm font-medium text-white hover:opacity-70"
        >
          <div className="flex items-center gap-4.25">
            상태 변경
            <img
              className={`h-1.5 w-2.5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              src={Vector2}
              alt="Vector2"
            />
          </div>
        </div>
      )}

      {isMobile ? (
        <>
          {isOpen && (
            <div className="bg-admin-box text-admin-sub scrollbar-hide absolute top-11 z-50 flex h-72 w-full flex-col overflow-y-auto rounded-[10px] p-2 text-sm font-medium shadow-lg hover:text-white">
              {Object.entries(STATUS_MAP).map(([korean, english]) => (
                <div
                  key={english}
                  className="hover:text-admin-white flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors hover:bg-white/10"
                  onClick={() => {
                    if (!selectedId) {
                      alert("상태 변경할 지원서를 선택해주세요.");
                      return;
                    } else {
                      setStatusOption(english);
                      setIsOpenModal(true);
                      console.log("API로 보낼 값:", english);
                    }
                  }}
                >
                  {korean}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {isOpen && (
            <div className="bg-admin-box text-admin-sub scrollbar-hide absolute top-11 z-50 flex h-72 w-32 flex-col overflow-y-auto rounded-[10px] p-2 text-sm font-medium shadow-lg">
              {Object.entries(STATUS_MAP).map(([korean, english]) => (
                <div
                  key={english}
                  className="hover:text-admin-white flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors hover:bg-white/10"
                  onClick={() => {
                    if (!selectedId) {
                      alert("상태 변경할 지원서를 선택해주세요.");
                      return;
                    } else {
                      setStatusOption(english);
                      setIsOpenModal(true);
                      console.log("API로 보낼 값:", english);
                    }
                  }}
                >
                  {korean}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 🔽 드롭다운 (absolute로 띄움) */}

      {isOpenModal && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title onClick={() => setIsOpenModal(false)}>
              지원서 상태 변경
            </Modal.Title>
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

            <div onClick={handleChangeStatus} className="flex w-full">
              <Button>확인</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}

      {isOpenSecond && (
        <Modal>
          <Modal.TextLayout>
            <Modal.Title onClick={ChangeCompletion}>변경 완료</Modal.Title>
            <Modal.Description>{`사용자에 상태 변경를 등록했어요`}</Modal.Description>
          </Modal.TextLayout>

          <Modal.ButtonLayout>
            <div onClick={ChangeCompletion} className="flex w-full">
              <Button>완료</Button>
            </div>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </div>
  );
};

export default AdminStatusButton;
