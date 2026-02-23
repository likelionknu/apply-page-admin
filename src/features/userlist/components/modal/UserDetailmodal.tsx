import {
  formatAcademicStatus,
  formatGrade,
  formatRole,
  mapUserDetailResponseToAdminUser,
  type AdminUser,
  type UserDetailResponse,
} from "@userlist/types/userProps";
import { Field } from "./Field";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import { useState, useEffect } from "react";
import leftArrow from "@userlist/assets/left.png";
import rightArrow from "@userlist/assets/right.png";
import { getUserDetail } from "@userlist/apis";
import axios from "axios";

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
  const [detail, setDetail] = useState<AdminUser | null>(null);
  const currentUser = users[currentIndex];
  const formatValue = (value: unknown) =>
    value === null || value === undefined || value === ""
      ? "미등록"
      : String(value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getUserDetail(String(currentUser.id));
        const mapped = mapUserDetailResponseToAdminUser(
          res.data.data as UserDetailResponse,
          currentUser.id,
        );
        setDetail(mapped);
      } catch (error) {
        let msg = "서버와 연결할 수 없습니다.";
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error?.message) {
            msg = error.response.data.error.message;
          } else if (error.response?.data?.error?.code) {
            msg = error.response.data.error.code;
          } else if (error.response?.data?.message) {
            msg = error.response.data.message;
          }
        } else if (error instanceof Error) {
          msg = error.message;
        }
        console.error(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [currentIndex, currentUser.id]);

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

  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/60">
      <Modal>
        <Modal.TextLayout>
          <div className="h-117 w-170.5">
            <Modal.Title onClick={onClose}>사용자 상세보기</Modal.Title>
            <div className="relative px-20 py-10">
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
                {/* 페이지 넘길 때마다 정신 없어서 추후에 고려 */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-admin-background flex h-72 w-135 flex-col items-center justify-center rounded-[10px] opacity-75 backdrop-blur-xl">
                      <div className="bg-admin-white mb-3 h-6 w-6 animate-spin rounded-full" />
                      <div className="text-admin-white text-xs font-medium">
                        정보를 불러오는 중
                      </div>
                      <div className="text-admin-sub mt-1 text-[10px] font-medium">
                        잠시만 기다려 주세요
                      </div>
                    </div>
                  </div>
                )}
                <Field label="이름" value={formatValue(detail.name)} />
                <Field label="이메일 주소" value={formatValue(detail.email)} />
                <Field
                  label="학적 상태"
                  value={formatAcademicStatus(detail.status)}
                />
                <Field label="전화번호" value={formatValue(detail.phone)} />
                <Field label="학년" value={formatGrade(detail.grade)} />
                <Field label="학부" value={formatValue(detail.department)} />
                <Field label="학번" value={formatValue(detail.studentId)} />
                <Field label="권한" value={formatRole(detail.role)} />
              </div>
            </div>
            <Button onClick={onClose}>완료</Button>
          </div>
        </Modal.TextLayout>
      </Modal>
    </div>
  );
}
