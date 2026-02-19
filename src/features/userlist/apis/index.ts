import { api } from "@shared/apis";

export const getUserList = async () => {
  return api.get("/v1/admin/users");
};

export const getUserDetail = async (id: string) => {
  return api.get(`/v1/admin/users/${id}`);
};

export const deleteUser = async (id: number) => {
  return api.delete(`/v1/admin/users/${id}`);
};

export const updateUserRole = async (id: number, role: "USER" | "ADMIN") => {
  return api.patch(`/v1/admin/users/${id}/role`, { role });
};
