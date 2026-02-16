import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";

const a = () => {
  return;
};

export const AnnouncementDelete = () => {
  return (
    <>
      <div className="bg-admin-box flex h-9 w-24 cursor-pointer items-center justify-center rounded-[10px] text-center text-sm font-medium text-white hover:opacity-70">
        공고 삭제
      </div>

      {/* <Modal>
        <Modal.TextLayout>
          <Modal.Title>사용자 권한 변경</Modal.Title>
          <Modal.Description>
            사용자의 권한을 변경할까요? {"1n"}이 작업은 즉시 적용되며, 되돌릴 수
            없어요.
          </Modal.Description>
        </Modal.TextLayout>

        <Modal.ButtonLayout>
          <button onClick={() => a()} className="flex w-full">
            <Button>취소</Button>
          </button>
          / flex.w-full
          <div onClick={() => a()} className="flex w-full">
            <Button>확인</Button>
          </div>
        </Modal.ButtonLayout>
      </Modal> */}
    </>
  );
};
