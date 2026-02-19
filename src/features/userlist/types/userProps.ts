export interface AdminUser {
  id: number;
  name: string;
  email: string;
  major?: string;
  createdAt?: string;
  lastLogin?: string;
  role: "사용자" | "관리자";
  phone?: string;
  grade?: string;
  department?: string;
  studentId?: string;
}

export interface UserModalProps {
  onRoleConfirm: () => Promise<void>;
  onDeleteConfirm: () => Promise<void>;
}

export interface UserResponse {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  depart: string;
  user_id: number;
  created_at: string;
  last_accessed_at: string;
}

export interface UserDetail {
  name: string;
  email: string;
  phone?: string;
  student_id?: string;
  depart?: string;
  grade?: number;
  status?: string;
  role: string;
}
