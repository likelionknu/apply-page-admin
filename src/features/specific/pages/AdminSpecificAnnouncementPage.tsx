import Header from "../../../shared/components/Header";
import { useEffect, useState } from "react";
import { api } from "@shared/apis";
import { useNavigate } from "react-router-dom";

import UnCheckCircle from "../assets/UnCheckCircle.png";
import { AdminRow } from "@specific/components/AdminRow";
import AnnouncementReviewButton from "@specific/components/AnnouncementReviewButton";
import AdminStateButton from "@specific/components/AdminStatusButton";
import AnnouncementButton from "@specific/components/AnnouncementCardButton";
import { AnnouncementDelete } from "@specific/components/AnnouncementDelete";
import { AnnouncementQuestion } from "@specific/components/AnnouncementQuestion";
import { formatDate } from "@specific/components/TimeChange";
import { AnnouncementDeleteButton } from "@specific/components/ApplicationDelete";
import { AnnouncementMemo } from "@specific/components/AnnouncementMemo";

const AdminSpecificAnnouncementPage = () => {
  const navigate = useNavigate();

  // ----------------------------- 제목 부분 api -----------------------------
  interface Announcement {
    title: string;
    start_at: string;
    end_at: string;
    questions: string[];
  }

  const [announcement, setAnnouncement] = useState<Announcement>({
    title: "",
    start_at: "",
    end_at: "",
    questions: [],
  });

  const getAnnouncementInfo = async () => {
    const res = await api.get("/v1/admin/recruits/2");
    return res.data;
  };

  useEffect(() => {
    const specificAnnouncementInfoApi = async () => {
      try {
        const data = await getAnnouncementInfo();
        setAnnouncement(data.data);
      } catch (error) {
        console.error("에러:", error);
      }
    };
    specificAnnouncementInfoApi();
  }, []);
  // ----------------------------- 제목 부분 api 끝 -----------------------------
  // ----------------------------- 작성자 정보 부분 api -----------------------------

  interface AdminRowApiProps {
    application_id: number;
    name: string;
    depart: string;
    memo: string;
    submit_at: string;
    evaluation: string;
    status: string;
  }

  const STATUS_KOR_MAP: Record<string, string> = {
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

  const [users, setUsers] = useState<AdminRowApiProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/v1/admin/recruits/2/applications");
      setUsers(res.data.data);
    };

    fetchData();
  }, []);

  // ----------------------------- 작성자 정보 부분 api 끝 -----------------------------
  // ----------------------------- 특정 지원서 부분 api -----------------------------

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // ----------------------------- 특정 지원서 부분 api 끝 -----------------------------

  return (
    <div className="flex justify-center bg-black">
      <Header />
      <div className="flex h-500 w-298.5 flex-col items-center bg-black">
        <div className="mt-35.5 flex w-full justify-between">
          <div className="line-clamp-1 justify-start text-3xl font-medium text-white">
            {announcement.title}
          </div>
          <div className="flex gap-4">
            <AnnouncementDelete />
            <div
              onClick={() => navigate("/admin/announcements/edit")}
              className="bg-admin-box flex h-9 w-24 cursor-pointer items-center justify-center rounded-[10px] text-center text-sm font-medium text-white hover:opacity-70"
            >
              공고 수정
            </div>
          </div>
        </div>

        <div
          className={`text-admin-sub mt-5 line-clamp-1 w-full justify-start text-[15px] font-medium`}
        >
          {formatDate(announcement.start_at)} ~{" "}
          {formatDate(announcement.end_at)}
        </div>

        <div className="mt-12 flex w-full flex-col">
          <div className="justify-start text-xl font-medium text-white">
            이 공고에 등록된 질문
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {announcement.questions.map((question, index) => (
              <AnnouncementQuestion
                key={index}
                order={index + 1}
                content={question}
              />
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col">
          <div className="justify-start text-xl font-medium text-white">
            이 공고에 지원한 사용자
          </div>

          <div
            className={`text-admin-sub mt-2.5 line-clamp-1 w-full justify-start text-[15px] font-medium`}
          >
            지원서를 탭하면 자세히 볼 수 있어요
          </div>
          <div className="mt-3.5 flex h-9 w-full justify-between">
            <div className="flex w-full items-center gap-2.5">
              <img src={UnCheckCircle} className="h-3.5 w-3.5" />
              <div className="justify-start text-sm font-medium text-white">
                임시저장, 회수한 지원서 숨기기
              </div>
            </div>
            <div className="flex w-full items-center gap-2.5">
              <AnnouncementDeleteButton selectedId={selectedId} />
              <AnnouncementMemo selectedId={selectedId} />
              <AnnouncementReviewButton selectedId={selectedId} />
              <AdminStateButton selectedId={selectedId} />
              <AnnouncementButton
                text="서류 결과 발송"
                modalTitle="서류(1차) 결과 이메일 발송"
                modalDescription="모든 지원서에 대한 서류 결과를 발송할까요? 
              대상: 지원 상태가 서류 합격 또는 서류 불합격인 사용자"
              />

              <AnnouncementButton
                text="최종 결과 발송"
                modalTitle="최종(2차) 결과 이메일 발송"
                modalDescription="모든 지원서에 대한 최종 결과를 발송할까요? 
              대상: 지원 상태가 최종 불합격 또는 최종 합격인 사용자"
              />
            </div>
          </div>
          <div className="bg-admin-box mt-3 flex h-9 w-298.5 items-center justify-center rounded-[10px]">
            <div className="flex w-284.5 items-center">
              <div className="text-admin-sub ml-13 w-12 truncate text-center text-sm font-medium">
                순번
              </div>
              <div className="text-admin-sub ml-13.25 w-16 truncate text-center text-sm font-medium">
                이름
              </div>
              <div className="text-admin-sub ml-12 w-40 truncate text-center text-sm font-medium">
                학부
              </div>
              <div className="text-admin-sub ml-10 w-56 truncate text-center text-sm font-medium">
                운영진 메모
              </div>
              <div className="text-admin-sub ml-9 w-48 truncate text-center text-sm font-medium">
                최종 제출일
              </div>
              <div className="text-admin-sub ml-11.25 w-17 text-center text-sm font-medium">
                운영진 검토
              </div>
              <div className="text-admin-sub ml-8.5 w-17 truncate text-center text-sm font-medium">
                지원상태
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex w-298.5 flex-col items-center gap-2.5">
            {users.map((user) => (
              <AdminRow
                key={user.application_id}
                application_id={user.application_id}
                name={user.name}
                depart={user.depart}
                memo={user.memo}
                submit_at={formatDate(user.submit_at)}
                evaluation={user.evaluation}
                status={STATUS_KOR_MAP[user.status] ?? user.status}
                isSelected={selectedId === user.application_id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSpecificAnnouncementPage;
