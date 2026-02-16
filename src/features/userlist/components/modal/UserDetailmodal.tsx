import type { AdminUser } from "@userlist/types/userProps";
import { Field } from "./Field";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { useState } from "react";
import leftArrow from "@userlist/assets/left.png";
import rightArrow from "@userlist/assets/right.png";

interface Props {
  users: AdminUser[];
  currentUserId: number;
  onClose: () => void;
}

export default function UserDetailModal({
  users,
  currentUserId,
  onClose,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const index = users.findIndex((user) => user.id === currentUserId);
    return index >= 0 ? index : 0;
  });

  const currentUser = users[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/60">
      <Modal>
        <Modal.TextLayout>
          <div className="h-117 w-170.5">
            <Modal.Title onClick={onClose}>사용자 상세보기</Modal.Title>
            <div className="relative px-20 py-10">
              {/* 왼쪽 화살표 */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-6.25 -translate-y-1/2"
              >
                <img
                  src={leftArrow}
                  alt="prev"
                  className="hover:cursor-pointer"
                />
              </button>

              {/* 오른쪽 화살표 */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-6.25 -translate-y-1/2"
              >
                <img
                  src={rightArrow}
                  alt="next"
                  className="hover:cursor-pointer"
                />
              </button>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <Field label="이름" value={currentUser.name} />
                <Field label="이메일 주소" value={currentUser.email} />
                <Field
                  label="학적 상태"
                  value={currentUser.major ?? "미등록"}
                />
                <Field label="전화번호" value={currentUser.phone ?? "미등록"} />
                <Field label="학년" value={currentUser.grade ?? "미등록"} />
                <Field
                  label="학부"
                  value={currentUser.department ?? "미등록"}
                />
                <Field label="학번" value={currentUser.studentId ?? "미등록"} />
                <Field label="권한" value={currentUser.role} />
              </div>
            </div>
            <div onClick={onClose} className="flex w-full px-5">
              <Button>완료</Button>
            </div>
          </div>
        </Modal.TextLayout>
      </Modal>
    </div>
  );
}
