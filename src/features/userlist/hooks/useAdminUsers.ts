import { useEffect, useState } from "react";
import type { AdminUser, UserResponse } from "@userlist/types/userProps";
import { getUserList, deleteUser, updateUserRole } from "@userlist/apis";
import axios from "axios";

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hideAdmin, setHideAdmin] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUserList();
        const mappedUsers: AdminUser[] = res.data.data.map(
          (user: UserResponse) => ({
            id: user.user_id,
            name: user.name,
            email: user.email,
            major: user.depart,
            createdAt: user.created_at,
            lastLogin: user.last_accessed_at,
            role: user.role === "ADMIN" ? "관리자" : "사용자",
          }),
        );
        setUsers(mappedUsers);
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
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = hideAdmin
    ? users.filter((user) => user.role !== "관리자")
    : users;

  const toggleHideAdmin = () => {
    setHideAdmin((prev) => {
      const next = !prev;
      if (next && selectedId) {
        const selectedUser = users.find((u) => u.id === selectedId);
        if (selectedUser?.role === "관리자") {
          setSelectedId(null);
        }
      }
      return next;
    });
  };

  const changeUserRole = async (
    userId: number,
    newRole: "사용자" | "관리자",
  ) => {
    const roleMap: Record<"사용자" | "관리자", "USER" | "ADMIN"> = {
      사용자: "USER",
      관리자: "ADMIN",
    };
    await updateUserRole(userId, roleMap[newRole]);
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
  };

  const removeUser = async (userId: number) => {
    await deleteUser(userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setSelectedId(null);
  };

  return {
    users,
    filteredUsers,
    selectedId,
    setSelectedId,
    hideAdmin,
    toggleHideAdmin,
    changeUserRole,
    removeUser,
  };
}
