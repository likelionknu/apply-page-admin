import { useState } from "react";
import Header from "../../../shared/components/Header";
import Modal from "../../../shared/components/Modal";
import SideNav from "../components/SideNav";

export interface User {
  id: number;
  apply: "지원" | "미지원";
  name: string;
  subject: string;
  email: string;
  num: string; // 학번
  phone: string;
  grade: string; // ex) "4학년"
  status: "재학" | "휴학" | "졸업";
}

const USERS: User[] = [
  {
    id: 1,
    apply: "미지원",
    name: "황현진",
    subject: "ICT융합공학부 소프트웨어전공",
    email: "brotherhwang97@gmail.com",
    num: "202104389",
    phone: "010-3036-9968",
    grade: "4학년",
    status: "재학",
  },
  {
    id: 2,
    apply: "지원",
    name: "김관리",
    subject: "컴퓨터공학과",
    email: "admin@test.com",
    num: "2018000000",
    phone: "010-1234-5678",
    grade: "졸업",
    status: "졸업",
  },
];

function AdminUserDashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    console.log("삭제할 유저:", selectedUser.id);
    // TODO: API 연동
    closeModal();
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <Header />

      <div className="flex">
        <SideNav />

        {/* 메인 콘텐츠 */}
        <div className="mt-36 flex w-360 flex-col gap-6 p-10 text-white">
          <div className="between flex items-center justify-between">
            <h1 className="text-[30px] font-bold">유저 리스트</h1>
            <h1 className="text-[30px] font-bold">
              총 : {USERS.length}명 | 지원자 :{" "}
              {USERS.filter((user) => user.apply === "지원").length}명
            </h1>
          </div>
          {/* 유저 리스트 */}
          <div className="flex flex-col gap-3">
            {USERS.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer rounded-lg border border-transparent p-4 transition hover:border-white hover:bg-neutral-900"
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{user.name}</p>
                  <span
                    className={`text-sm ${
                      user.apply === "지원" ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {user.apply}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 유저 상세 모달 */}
      {selectedUser && (
        <Modal>
          <Modal.Description>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-left text-sm">
              <div className="between flex justify-between">
                <p>{selectedUser.id}</p>
                <p
                  className={`font-semibold ${
                    selectedUser.apply === "지원"
                      ? "text-blue-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedUser.apply}
                </p>
              </div>
              <div></div>
              <p>{selectedUser.email}</p>
              <p>{selectedUser.phone}</p>
              <p>{selectedUser.num}</p>
              <p>{selectedUser.grade}</p>
              <p className="col-span-2">{selectedUser.subject}</p>
              <p>{selectedUser.status}</p>
            </div>
          </Modal.Description>

          <Modal.ButtonLayout>
            <button
              onClick={handleDeleteUser}
              className="rounded-lg border border-gray-400 px-6 py-2"
            >
              유저 삭제
            </button>
            <button
              onClick={closeModal}
              className="rounded-lg border border-gray-400 px-6 py-2"
            >
              닫기
            </button>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </div>
  );
}

export default AdminUserDashboardPage;
