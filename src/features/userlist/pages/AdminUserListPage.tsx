import { useState } from "react";
import dropDown from "@userlist/assets/drop.png";

import Header from "@shared/components/Header";
import Footer from "@shared/components/Footer";

import UserRow from "../components/UserRow";
import UserDetailModal from "@userlist/components/modal/UserDetailmodal";
import ConfirmModal from "@userlist/components/modal/ConfirmModal";
import type { AdminUser } from "@userlist/types/userProps";
import { MOCK_USERS } from "@userlist/mock/mockuser";

type ModalType =
  | null
  | "roleConfirm"
  | "roleSuccess"
  | "deleteConfirm"
  | "deleteSuccess";

function AdminUserListPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hideAdmin, setHideAdmin] = useState(false);
  const [detailUser, setDetailUser] = useState<AdminUser | null>(null);
  const [confirmRole, setConfirmRole] = useState<"사용자" | "관리자" | null>(
    null,
  );
  const [modalType, setModalType] = useState<ModalType>(null);

  const filteredUsers = hideAdmin
    ? users.filter((user) => user.role !== "관리자")
    : users;

  const toggleHideAdmin = () => {
    setHideAdmin((prev) => {
      const next = !prev;
      if (next && selectedId) {
        const selectedUser = users.find((u) => u.id === selectedId);
        if (selectedUser?.role === "관리자") {
          setSelectedId(null);
        }
      }
      return next;
    });
  };

  const openConfirmModal = (newRole: "사용자" | "관리자") => {
    if (!selectedId) return;
    setConfirmRole(newRole);
    setIsOpen(false);
    setModalType("roleConfirm");
  };

  const handleConfirmChange = () => {
    if (!selectedId || !confirmRole) return;
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedId ? { ...user, role: confirmRole } : user,
      ),
    );
    setModalType("roleSuccess");
  };

  const handleDeleteConfirm = () => {
    if (!selectedId) return;
    setUsers((prev) => prev.filter((user) => user.id !== selectedId));
    setSelectedId(null);
    if (detailUser?.id === selectedId) {
      setDetailUser(null);
    }
    setModalType("deleteSuccess");
  };

  const modalConfig = {
    roleConfirm: {
      title: "사용자 권한 변경",
      description: `사용자의 권한을 변경할까요?\n이 작업은 즉시 적용되며, 되돌릴 수 없어요`,
      onConfirm: handleConfirmChange,
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
      onConfirm: handleDeleteConfirm,
      onCancel: () => setModalType(null),
    },
    deleteSuccess: {
      title: "사용자 강제 삭제",
      description: "사용자를 서비스에서 강제 삭제했어요.",
      onConfirm: () => setModalType(null),
    },
  };

  return (
    <div className="bg-admin-background text-admin-white min-h-screen">
      <Header />

      <div className="mx-auto w-298.5 space-y-6 pt-30.75">
        <h1 className="text-[30px] font-medium">사용자 관리</h1>

        <div className="flex items-center justify-between">
          <div
            onClick={toggleHideAdmin}
            className="flex cursor-pointer items-center gap-2 select-none"
          >
            <div
              className={`h-4 w-4 rounded-full border transition ${
                hideAdmin
                  ? "border-admin-white bg-admin-white"
                  : "border-admin-white"
              }`}
            />
            <span className="text-[14px] font-medium">관리자 숨기기</span>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <button
                disabled={!selectedId}
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex h-9 w-28 items-center justify-center gap-4.25 rounded-lg text-sm transition hover:cursor-pointer ${
                  selectedId
                    ? "bg-admin-box hover:bg-admin-hover"
                    : "bg-admin-disable cursor-not-allowed"
                }`}
              >
                <span>권한 변경</span>
                <img
                  src={dropDown}
                  alt="dropdown"
                  className={`h-1.5 w-2.5 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="bg-admin-box text-admin-disable absolute right-0 mt-2 w-28 overflow-hidden rounded-lg shadow-lg">
                  <button
                    onClick={() => openConfirmModal("사용자")}
                    className="hover:text-admin-white w-full px-4 py-2 text-left text-sm hover:cursor-pointer"
                  >
                    사용자
                  </button>
                  <button
                    onClick={() => openConfirmModal("관리자")}
                    className="hover:text-admin-white w-full px-4 py-2 text-left text-sm hover:cursor-pointer"
                  >
                    관리자
                  </button>
                </div>
              )}
            </div>

            <button
              disabled={!selectedId}
              onClick={() => setModalType("deleteConfirm")}
              className={`h-9 w-28 rounded-lg text-sm transition hover:cursor-pointer ${
                selectedId
                  ? "bg-admin-box hover:bg-admin-red"
                  : "bg-admin-disable cursor-not-allowed"
              }`}
            >
              사용자 삭제
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="bg-admin-box text-admin-sub text-md grid h-9 grid-cols-[40px_60px_100px_240px_140px_250px_240px_80px] items-center rounded-[10px] px-4">
            <span></span>
            <span className="text-center">순번</span>
            <span className="text-center">이름</span>
            <span className="text-center">이메일 주소</span>
            <span className="text-center">학과</span>
            <span className="text-center">회원 등록일</span>
            <span className="text-center">최근 접속일</span>
            <span className="text-center">권한</span>
          </div>

          {filteredUsers.map((user, index) => (
            <UserRow
              key={user.id}
              {...user}
              order={index + 1}
              selected={selectedId === user.id}
              onSelect={() => setSelectedId(user.id)}
              onRowClick={() => setDetailUser(user)}
            />
          ))}
        </div>
      </div>

      <div className="mt-75">
        <Footer />
      </div>

      {/* 모달 */}
      {detailUser && (
        <UserDetailModal
          users={users}
          currentUserId={detailUser.id}
          onClose={() => setDetailUser(null)}
        />
      )}

      {modalType && <ConfirmModal {...modalConfig[modalType]} />}
    </div>
  );
}

export default AdminUserListPage;
