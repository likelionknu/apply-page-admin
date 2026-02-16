export interface AdminUser {
  id: number;
  name: string;
  email: string;
  major: string;
  createdAt: string;
  lastLogin: string;
  role: "관리자" | "사용자";
}
