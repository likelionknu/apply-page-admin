import {
  formatAcademicStatus,
  formatGrade,
  formatRole,
  mapUserDetailResponseToAdminUser,
  type AdminUser,
  type UserDetailResponse,
} from "@userlist/types/userProps";
import { useState, useEffect } from "react";
import { getUserDetail } from "@userlist/apis";
import Modal from "@shared/components/Modal";
import { MobileField } from "./MobileField";
import Button from "@shared/components/Button";

interface Props {
  users: AdminUser[];
  currentUserId: number;
  onClose: () => void;
}

export default function MobileUserDetailModal({
  users,
  currentUserId,
  onClose,
}: Props) {
  const [detail, setDetail] = useState<AdminUser | null>(null);
  const currentUser = users.find((u) => u.id === currentUserId);
  const formatValue = (value: unknown) =>
    value === null || value === undefined || value === ""
      ? "미등록"
      : String(value);

  useEffect(() => {
    if (!currentUser) return;

    const fetchDetail = async () => {
      try {
        const res = await getUserDetail(String(currentUser.id));
        const mapped = mapUserDetailResponseToAdminUser(
          res.data.data as UserDetailResponse,
          currentUser.id,
        );
        setDetail(mapped);
      } catch (e) {
        console.error(e);
      }
    };

    fetchDetail();
  }, [currentUser]);

  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-40">
      <Modal>
        <Modal.TextLayout>
          <div className="h-91.5 w-87">
            <Modal.Title onClick={onClose}>사용자 상세보기</Modal.Title>
            {/* 내용 */}
            <div className="mx-auto mt-2 flex w-77 flex-col">
              <MobileField label="이름" value={formatValue(detail.name)} />
              <MobileField
                label="이메일 주소"
                value={formatValue(detail.email)}
              />
              <MobileField
                label="학적 상태"
                value={formatAcademicStatus(detail.status)}
              />
              <MobileField label="전화번호" value={formatValue(detail.phone)} />
              <MobileField label="학년" value={formatGrade(detail.grade)} />
              <MobileField
                label="학부"
                value={formatValue(detail.department)}
              />
              <MobileField label="학번" value={formatValue(detail.studentId)} />
              <MobileField label="권한" value={formatRole(detail.role)} />
              <div className="mt-4 flex w-77">
                <Button onClick={onClose}>완료</Button>
              </div>
            </div>
          </div>
        </Modal.TextLayout>
      </Modal>
    </div>
  );
}
