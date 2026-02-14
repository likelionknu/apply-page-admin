import CloseImg from "../assets/cancel.png";

// 최상위 모달 인터페이스
interface ModalMainProps {
  children: React.ReactNode;
}

// 하위 모달 텍스트 인터페이스(혹시 모르니)
interface ModalTextProps {
  children: React.ReactNode;
}

function ModalTitle({ children }: ModalTextProps) {
  return (
    <div className="tracking-tight-custom border-admin-outline-2 flex items-center justify-between border-b px-5 py-5 text-[20px] font-medium">
      {children}
      <img src={CloseImg} alt="닫기" className="h-6 w-6" />
    </div>
  );
}

function ModalDescription({ children }: ModalTextProps) {
  return (
    <div className="tracking-tight-custom text-admin-sub flex max-w-90 flex-col gap-4 pt-3 pl-5 text-left text-[15px] font-medium">
      {children}
    </div>
  );
}

function ModalButtonLayout({ children }: ModalTextProps) {
  return <div className="flex w-full gap-4 px-5 pb-4">{children}</div>;
}

function ModalTextLayout({ children }: ModalTextProps) {
  return <div>{children}</div>;
}

function ModalMain({ children }: ModalMainProps) {
  return (
    <div className="absolute top-1/3 left-1/2 z-100 flex min-h-67 min-w-107 -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-black md:top-1/2">
      <div className="flex w-full flex-col justify-between text-center text-white">
        {children}
      </div>
    </div>
  );
}

const Modal = Object.assign(ModalMain, {
  TextLayout: ModalTextLayout,
  Title: ModalTitle,
  Description: ModalDescription,
  ButtonLayout: ModalButtonLayout,
});

export default Modal;
