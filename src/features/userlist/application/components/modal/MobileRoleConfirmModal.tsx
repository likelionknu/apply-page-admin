// MobileRoleConfirmModal.tsx
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import MobileRoleDropdown from "@userlist/application/components/MobileRoleDropdown";
import { useEffect } from "react";

interface Props {
  selectedRole: "ADMIN" | "USER" | null;
  setSelectedRole: (role: "ADMIN" | "USER" | null) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function MobileRoleConfirmModal({
  selectedRole,
  setSelectedRole,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    setSelectedRole(null);
  }, [setSelectedRole]);
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" />
      <Modal>
        <Modal.TextLayout>
          <Modal.Title onClick={onCancel}>사용자 권한 변경</Modal.Title>
          <Modal.Description>
            <MobileRoleDropdown
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </Modal.Description>
        </Modal.TextLayout>

        <Modal.ButtonLayout>
          <Button onClick={onCancel}>취소</Button>
          <Button onClick={onConfirm}>확인</Button>
        </Modal.ButtonLayout>
      </Modal>
    </>
  );
}
