import axios from "axios";
/*api*/
import { api } from "@shared/apis";
import type { SpecificApplication } from "@specific/components/modal/SpecificDetailmodal";

/*api*/
interface ApplicationAnswerDto {
  question: string;
  answer: string;
}

interface ApplicationDetailDto {
  name: string;
  email: string;
  depart: string;
  grade: number | string | null;
  status: string;
  phone: string;
  answers: ApplicationAnswerDto[];
  student_id: string;
  student_status: string;
  submitted_at: string;
}

interface ApplicationDetailResponse {
  data: ApplicationDetailDto | null;
  error: {
    code: string | null;
    message: string | null;
  };
}

const DEFAULT_ERROR_MESSAGE = "지원서 상세 정보를 불러오지 못했어요.";
const NOT_FOUND_ERROR_MESSAGE = "정보를 찾을 수 없습니다.";

/*api*/
const APPLICATION_STATUS_LABEL: Record<string, string> = {
  DRAFT: "임시저장",
  SUBMITTED: "최종제출",
  UNDER_DOCUMENT_REVIEW: "서류 검토 중",
  DOCUMENT_PASSED: "서류 합격",
  DOCUMENT_FAILED: "서류 불합격",
  WAITING_INTERVIEW: "면접 대기",
  DONE_INTERVIEW: "면접 완료",
  UNDER_INTERVIEW_REVIEW: "면접 검토 중",
  FAIL_INTERVIEW: "최종 불합격",
  FINAL_PASSED: "최종 합격",
  CANCELED: "회수",
};

function formatGrade(grade: number | string | null): string {
  if (grade === null || grade === undefined || grade === "") {
    return "미등록";
  }

  const gradeText = String(grade);
  if (gradeText.includes("학년")) {
    return gradeText;
  }

  return `${gradeText}학년`;
}

function formatSubmittedAt(value: string): string {
  if (!value) {
    return "미등록";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  const period = hour >= 12 ? "오후" : "오전";
  const hour12 = hour % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${hour12}시 ${minute}분`;
}

function toSpecificApplication(
  applicationId: number,
  dto: ApplicationDetailDto,
): SpecificApplication {
  return {
    application_id: applicationId,
    name: dto.name || "미등록",
    email: dto.email || "미등록",
    academicStatus: dto.student_status || "미등록",
    phone: dto.phone || "미등록",
    grade: formatGrade(dto.grade),
    department: dto.depart || "미등록",
    studentId: dto.student_id || "미등록",
    finalSubmittedAt: formatSubmittedAt(dto.submitted_at),
    submissionStatus: APPLICATION_STATUS_LABEL[dto.status] ?? dto.status ?? "미등록",
    questions: Array.isArray(dto.answers)
      ? dto.answers.map((item) => ({
          question: item.question || "질문 없음",
          answer: item.answer || "",
        }))
      : [],
  };
}

export async function getApplicationDetail(
  applicationId: number,
): Promise<SpecificApplication> {
  // /*local-test*/
  // return toSpecificApplication(applicationId, {
  //   name: "윤환",
  //   email: "yunsol267@gmail.com",
  //   depart: "ICT융합공학부",
  //   grade: 2,
  //   status: "SUBMITTED",
  //   phone: "010-9628-2267",
  //   answers: [
  //     { question: "지원 동기 및 포부", answer: "답변 1" },
  //     { question: "협업 중 갈등 해결 경험", answer: "답변 2" },
  //     { question: "기술적 도전과 해결 과정", answer: "답변 3" },
  //   ],
  //   student_id: "202304134",
  //   student_status: "재학",
  //   submitted_at: "2026-02-03T06:29:39.64511",
  // });

  try {
    /*api*/
    const { data } = await api.get<ApplicationDetailResponse>(
      `/v1/admin/applications/${applicationId}`,
    );

    if (data.error?.code) {
      throw new Error(data.error.message ?? DEFAULT_ERROR_MESSAGE);
    }

    if (!data.data) {
      throw new Error(NOT_FOUND_ERROR_MESSAGE);
    }

    return toSpecificApplication(applicationId, data.data);
  } catch (error) {
    if (axios.isAxiosError<ApplicationDetailResponse>(error)) {
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
