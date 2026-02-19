import type { ModalType } from "@userlist/types/modalTypes";
import type { UserModalProps } from "@userlist/types/userProps";
import { useState } from "react";

export function useUserModal({
  onRoleConfirm,
  onDeleteConfirm,
}: UserModalProps) {
  const [modalType, setModalType] = useState<ModalType>(null);

  const modalConfig = {
    roleConfirm: {
      title: "사용자 권한 변경",
      description:
        "사용자의 권한을 변경할까요?\n이 작업은 즉시 적용되며, 되돌릴 수 없어요",
      onConfirm: async () => {
        await onRoleConfirm();
        setModalType("roleSuccess");
      },
      onCancel: () => setModalType(null),
    },
    roleSuccess: {
      title: "사용자 권한 변경",
      description: "사용자의 권한을 변경했어요.",
      onConfirm: () => setModalType(null),
    },
    deleteConfirm: {
      title: "사용자 강제 삭제",
      description:
        "선택한 사용자를 서비스에서 강제 삭제할까요?\n이 작업은 되돌릴 수 없어요",
      confirmText: "삭제",
      onConfirm: async () => {
        await onDeleteConfirm();
        setModalType("deleteSuccess");
      },
      onCancel: () => setModalType(null),
    },
    deleteSuccess: {
      title: "사용자 강제 삭제",
      description: "사용자를 서비스에서 강제 삭제했어요.",
      onConfirm: () => setModalType(null),
    },
  };

  return {
    modalType,
    setModalType,
    modalConfig,
  };
}
