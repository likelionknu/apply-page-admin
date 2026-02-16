import type { AdminUser } from "@userlist/types/userProps";

export function UserDetailModal({
  user,
  onClose,
}: {
  user: AdminUser;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[500px] rounded-xl bg-[#1A1D21] p-6">
        <h2 className="mb-4 text-lg font-semibold">사용자 상세 정보</h2>

        <div className="space-y-2 text-sm text-gray-300">
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
          <p>학과: {user.major}</p>
          <p>권한: {user.role}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 rounded-lg bg-[#2A2F36] px-4 py-2 text-sm hover:bg-[#333840]"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
