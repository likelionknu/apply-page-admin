import axios from "axios";
import { api } from "@shared/apis";
import type { Announcement, AnnouncementStatus } from "../types/AnnouncementManagement";

interface RecruitOverviewDto {
  recruit_id: number;
  title: string;
  start_at: string;
  end_at: string;
  submit: number;
  draft: number;
}

interface RecruitOverviewResponse {
  data: RecruitOverviewDto[] | null;
  error: {
    code: string | null;
    message: string | null;
  };
}

const DEFAULT_ERROR_MESSAGE = "공고 목록을 불러오지 못했어요.";

function toDateOrNull(value: string): Date | null {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateTime(value: string): string {
  const date = toDateOrNull(value);
  if (!date) return value;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}`;
}

function resolveStatus(startAt: string, endAt: string): AnnouncementStatus {
  const now = new Date();
  const startDate = toDateOrNull(startAt);
  const endDate = toDateOrNull(endAt);

  if (!startDate || !endDate) return "모집 중";
  if (now < startDate) return "예정";
  if (now > endDate) return "완료";
  return "모집 중";
}

function toAnnouncement(dto: RecruitOverviewDto): Announcement {
  return {
    id: String(dto.recruit_id),
    status: resolveStatus(dto.start_at, dto.end_at),
    title: dto.title,
    period: `${formatDateTime(dto.start_at)} ~ ${formatDateTime(dto.end_at)}`,
    stats: `제출 ${dto.submit} · 임시저장 ${dto.draft}`,
  };
}

export async function getRecruitAnnouncements(): Promise<Announcement[]> {
  try {
    const { data } = await api.get<RecruitOverviewResponse>("/v1/admin/recruits");

    if (data.error?.code) {
      throw new Error(data.error.message ?? DEFAULT_ERROR_MESSAGE);
    }

    if (!Array.isArray(data.data)) {
      return [];
    }

    return data.data.map(toAnnouncement);
  } catch (error) {
    if (axios.isAxiosError<RecruitOverviewResponse>(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
}
