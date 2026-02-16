import { useState } from "react";
import Header from "@shared/components/Header";
import UserRow from "../components/UserRow";
import type { AdminUser } from "@userlist/types/userProps";
import Footer from "@shared/components/Footer";
import dropDown from "@userlist/assets/drop.png";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { MOCK_USERS } from "@userlist/mock/mockuser";

function AdminUserListPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hideAdmin, setHideAdmin] = useState(false);

  const [confirmRole, setConfirmRole] = useState<"사용자" | "관리자" | null>(
    null,
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = () => {
    if (!selectedId) return;

    setUsers((prev) => prev.filter((user) => user.id !== selectedId));
    setSelectedId(null);
    setIsOpen(false);
  };
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
  };
  const handleConfirmChange = () => {
    if (!selectedId || !confirmRole) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedId ? { ...user, role: confirmRole } : user,
      ),
    );

    setConfirmRole(null);
    setShowSuccess(true);
  };

  return (
    <div className="bg-admin-background min-h-screen text-white">
      <Header />

      <div className="mx-auto w-[1194px] space-y-6 pt-[123px]">
        {/* 타이틀 */}
        <h1 className="text-3xl font-medium">사용자 관리</h1>

        {/* 버튼 영역 */}
        <div className="flex items-center justify-between">
          <div
            onClick={toggleHideAdmin}
            className="flex cursor-pointer items-center gap-2 select-none"
          >
            <div
              className={`h-4 w-4 rounded-full border transition ${
                hideAdmin ? "border-white bg-white" : "border-white"
              }`}
            />
            <span className="text-sm">관리자 숨기기</span>
          </div>

          <div className="flex gap-3">
            {/*  권한 변경 */}
            <div className="relative">
              <button
                disabled={!selectedId}
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex h-9 w-28 items-center justify-center gap-2 rounded-lg text-sm transition ${
                  selectedId
                    ? "bg-[#1F2329] hover:bg-[#2A2F36]"
                    : "cursor-not-allowed bg-gray-700"
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
                <div className="bg-admin-box absolute right-0 mt-2 w-28 overflow-hidden rounded-lg border border-gray-700 shadow-lg">
                  <button
                    onClick={() => openConfirmModal("사용자")}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#2A2F36]"
                  >
                    사용자
                  </button>

                  <button
                    onClick={() => openConfirmModal("관리자")}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#2A2F36]"
                  >
                    관리자
                  </button>
                </div>
              )}
            </div>

            {/* 🗑 사용자 삭제 */}
            <button
              disabled={!selectedId}
              onClick={handleDelete}
              className={`h-9 w-28 rounded-lg text-sm transition ${
                selectedId
                  ? "bg-[#1F2329] hover:bg-red-600"
                  : "cursor-not-allowed bg-gray-700"
              }`}
            >
              사용자 삭제
            </button>
          </div>
        </div>

        {/* 테이블 */}
        <div className="space-y-2.5">
          {/* 헤더 */}
          <div className="bg-admin-box grid h-9 grid-cols-[40px_60px_100px_240px_120px_220px_220px_80px] items-center rounded-[10px] px-4 text-sm text-gray-400">
            <span></span>
            <span className="text-center">순번</span>
            <span className="text-center">이름</span>
            <span className="text-center">이메일 주소</span>
            <span className="text-center">학과</span>
            <span className="text-center">회원 등록일</span>
            <span className="text-center">최근 접속일</span>
            <span className="text-center">권한</span>
          </div>

          {/* 목록 */}
          {filteredUsers.map((user, index) => (
            <UserRow
              key={user.id}
              {...user}
              order={index + 1}
              selected={selectedId === user.id}
              onSelect={() => setSelectedId(user.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-75">
        <Footer />
      </div>
      {/* 모달 */}
      {confirmRole && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" />

          <Modal>
            <Modal.Title>사용자 권한 변경</Modal.Title>

            <Modal.TextLayout>
              <div>
                사용자의 권한을 변경할까요?
                <br />이 작업은 즉시 적용되며, 되돌릴 수 없어요.
              </div>
            </Modal.TextLayout>

            <Modal.ButtonLayout>
              <div onClick={() => setConfirmRole(null)} className="flex w-full">
                <Button>취소</Button>
              </div>

              <div onClick={handleConfirmChange} className="flex w-full">
                <Button>확인</Button>
              </div>
            </Modal.ButtonLayout>
          </Modal>
        </>
      )}
      {showSuccess && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" />

          <Modal>
            <Modal.Title>변경 완료</Modal.Title>

            <Modal.Description>
              <div>사용자의 권한을 변경했어요.</div>
            </Modal.Description>

            <Modal.ButtonLayout>
              <div onClick={() => setShowSuccess(false)} className="flex-1">
                <Button>확인</Button>
              </div>
            </Modal.ButtonLayout>
          </Modal>
        </>
      )}
    </div>
  );
}

export default AdminUserListPage;
