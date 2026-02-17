import type { Recruit } from "@announce/types/RecruitQuestion";
import { api } from "@shared/apis";

interface editRecruitProps {
  recruitId: number;
  payload: Recruit;
}

export const createRecruit = async (payload: Recruit) => {
  const res = await api.post("/v1/admin/recruits", payload);

  return res;
};

export const editRecruit = async ({ recruitId, payload }: editRecruitProps) => {
  const res = await api.put(`/v1/admint//${recruitId}`, payload);

  return res;
};
