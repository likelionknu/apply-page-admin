// 목록 응답
export interface UserListResponse {
  name: string;
  email: string;
  role: string;
  depart: string;
  user_id: number;
  created_at: string;
  last_accessed_at: string;
}
// 상세 응답
export interface UserDetailResponse {
  name: string;
  email: string;
  phone?: string;
  depart?: string;
  grade?: number;
  status?: string;
  role: string;
  student_id?: string;
}
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  department?: string;
  phone?: string;
  grade?: number;
  status?: string;
  studentId?: string;
  createdAt?: string;
  lastLogin?: string;
  role: "ADMIN" | "USER";
}

export const formatRole = (role: "ADMIN" | "USER") =>
  role === "ADMIN" ? "관리자" : "사용자";

export const formatAcademicStatus = (status?: string) => {
  if (!status) return "미등록";

  const normalized = status.trim().toUpperCase();
  const statusMap: Record<string, string> = {
    ATTENDING: "재학",
    LEAVE_OF_ABSENCE: "휴학",
    GRADUATION_DEFERRAL: "졸업 유예",
  };
  if (status === "재학" || status === "휴학" || status === "졸업 유예") {
    return status;
  }
  return statusMap[normalized] ?? status;
};
export const formatGrade = (grade?: number) =>
  grade ? `${grade}학년` : "미등록";
export interface UserModalProps {
  onRoleConfirm: () => Promise<void>;
  onDeleteConfirm: () => Promise<void>;
}
export const mapUserDetailResponseToAdminUser = (
  data: UserDetailResponse,
  id: number,
): AdminUser => {
  return {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    department: data.depart,
    grade: data.grade,
    status: data.status,
    studentId: data.student_id,
    role: data.role as "ADMIN" | "USER",
  };
};
