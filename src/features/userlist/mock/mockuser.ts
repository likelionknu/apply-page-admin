import type { AdminUser } from "@userlist/types/userProps";

export const MOCK_USERS: AdminUser[] = [
  {
    id: 1,
    name: "황형진",
    email: "hwang@gmail.com",
    major: "미등록",
    createdAt: "2026년 1월 8일 오후 4시 2분",
    lastLogin: "2026년 1월 9일 오후 10시 20분",
    role: "관리자",
  },
  {
    id: 2,
    name: "홍길동",
    email: "hong@test.com",
    major: "컴퓨터공학과",
    createdAt: "2026년 1월 7일 오후 3시 10분",
    lastLogin: "2026년 1월 9일 오후 9시 02분",
    role: "사용자",
  },
];
