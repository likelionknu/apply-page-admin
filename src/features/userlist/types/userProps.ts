export interface AdminUser {
  id: number;
  name: string;
  email: string;
  major?: string;
  createdAt: string;
  lastLogin: string;
  role: "사용자" | "관리자";

  phone?: string;
  grade?: string;
  department?: string;
  studentId?: string;
}
