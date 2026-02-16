import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";

interface Props {
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" />
      <Modal>
        <Modal.TextLayout>
          <Modal.Title onClick={onCancel}>{title}</Modal.Title>
          <Modal.Description>{description}</Modal.Description>
        </Modal.TextLayout>

        <Modal.ButtonLayout>
          {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}

          <Button onClick={onConfirm}>{confirmText}</Button>
        </Modal.ButtonLayout>
      </Modal>
    </>
  );
}
