import { useState } from "react";
import dropDown from "@userlist/assets/drop.png";
import checkIcon from "@userlist/assets/check.png";

import Header from "@shared/components/Header";
import Footer from "@shared/components/Footer";

import UserRow from "../components/UserRow";
import UserDetailModal from "@userlist/components/modal/UserDetailmodal";
import ConfirmModal from "@userlist/components/modal/ConfirmModal";
import type { AdminUser } from "@userlist/types/userProps";
import { useAdminUsers } from "@userlist/hooks/useAdminUsers";
import { useUserModal } from "@userlist/hooks/useUserModal";

function AdminUserListPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [detailUser, setDetailUser] = useState<AdminUser | null>(null);
  const [confirmRole, setConfirmRole] = useState<"사용자" | "관리자" | null>(
    null,
  );
  const {
    users,
    filteredUsers,
    selectedId,
    setSelectedId,
    hideAdmin,
    toggleHideAdmin,
    changeUserRole,
    removeUser,
  } = useAdminUsers();

  const openConfirmModal = (newRole: "사용자" | "관리자") => {
    if (!selectedId) return;
    setConfirmRole(newRole);
    setIsOpen(false);
    setModalType("roleConfirm");
  };

  const handleConfirm = async (type: "role" | "delete") => {
    if (!selectedId) return;

    try {
      if (type === "role" && confirmRole) {
        await changeUserRole(selectedId, confirmRole);
        setModalType("roleSuccess");
      }

      if (type === "delete") {
        await removeUser(selectedId);

        if (detailUser?.id === selectedId) {
          setDetailUser(null);
        }

        setModalType("deleteSuccess");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const { modalType, setModalType, modalConfig } = useUserModal({
    onRoleConfirm: () => handleConfirm("role"),
    onDeleteConfirm: () => handleConfirm("delete"),
  });

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
            {hideAdmin ? (
              <img src={checkIcon} alt="checked" className="h-4 w-4" />
            ) : (
              <div className="border-admin-white h-4 w-4 rounded-full border" />
            )}

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
        {/* 유저 테이블 베너 */}
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
          {/* 유저 행 */}
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
