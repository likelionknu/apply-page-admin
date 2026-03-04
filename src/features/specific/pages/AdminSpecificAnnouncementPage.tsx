import Header from "../../../shared/components/Header";
import { useEffect, useState } from "react";
import { api } from "@shared/apis";
import { useNavigate, useParams } from "react-router-dom";

import UnCheckCircle from "../assets/UnCheckCircle.png";
import CheckedCircle1 from "../assets/CheckedCircle1.png";
import XIcon from "@specific/assets/XIcon.svg";
import { AdminRow } from "@specific/components/AdminRow";
import AnnouncementReviewButton from "@specific/components/AnnouncementReviewButton";
import AdminStateButton from "@specific/components/AdminStatusButton";
import AnnouncementButton from "@specific/components/AnnouncementCardButton";
import { AnnouncementDelete } from "@specific/components/AnnouncementDelete";
import { AnnouncementQuestion } from "@specific/components/AnnouncementQuestion";
import { formatDate } from "@specific/components/TimeChange";
import { AnnouncementDeleteButton } from "@specific/components/ApplicationDelete";
import { AnnouncementMemo } from "@specific/components/AnnouncementMemo";
import SpecificDetailModal from "@specific/components/modal/SpecificDetailmodal";

import { useMediaQuery } from "react-responsive";
import { AdminRowMobile } from "@specific/components/mobile/AdminRowMoblie";

const AdminSpecificAnnouncementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recruitId = Number(id);
  const hasValidRecruitId = Number.isFinite(recruitId) && recruitId > 0;
  const [isHidden, setIsHidden] = useState(false);
  const [detailApplicationId, setDetailApplicationId] = useState<number | null>(
    null,
  );
  const [isMobileSettingOpen, setIsMobileSettingOpen] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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

  useEffect(() => {
    if (!hasValidRecruitId) {
      return;
    }

    const specificAnnouncementInfoApi = async () => {
      try {
        const res = await api.get(`/v1/admin/recruits/${id}`);
        setAnnouncement(res.data.data);
      } catch (error) {
        console.error("에러:", error);
      }
    };
    specificAnnouncementInfoApi();
  }, [id, hasValidRecruitId]);

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
    if (!hasValidRecruitId) {
      return;
    }

    const fetchData = async () => {
      const res = await api.get(`/v1/admin/recruits/${recruitId}/applications`);
      setUsers(res.data.data);
    };

    fetchData();
  }, [recruitId, hasValidRecruitId]);

  // ----------------------------- 작성자 정보 부분 api 끝 -----------------------------
  // ----------------------------- 특정 지원서 부분 api -----------------------------

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // ----------------------------- 특정 지원서 부분 api 끝 -----------------------------
  // ----------------------------- 1차 결과 발표 부분 api  -----------------------------
  const firstPassApi = async () => {
    if (!hasValidRecruitId) {
      throw new Error("Invalid recruit id");
    }

    const res = await api.get(
      `/v1/admin/recruits/${recruitId}/notifications/document`,
    );
    return res.data;
  };
  // ----------------------------- 1차 결과 발표 부분 api 끝  -----------------------------
  // ----------------------------- 2차 결과 발표 부분 api  -------------------------------
  const secondPassApi = async () => {
    if (!hasValidRecruitId) {
      throw new Error("Invalid recruit id");
    }

    const res = await api.get(
      `/v1/admin/recruits/${recruitId}/notifications/final`,
    );
    return res.data;
  };
  // ----------------------------- 2차 결과 발표 부분 api 끝  -----------------------------

  const filteredUsers = isHidden
    ? users.filter(
        (user) =>
          STATUS_KOR_MAP[user.status] !== "임시저장" &&
          STATUS_KOR_MAP[user.status] !== "회수",
      )
    : users;

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex justify-center bg-black">
      <Header />
      <div className="mb-10 flex h-full w-[calc(100vw-52px)] flex-col items-center bg-black lg:w-298.5">
        <div className="mt-24 flex w-full flex-col lg:mt-35.5 lg:flex-row lg:justify-between">
          <div className="justify-start text-2xl font-medium text-white lg:line-clamp-1 lg:text-3xl">
            {announcement.title}
          </div>
          {isMobile ? (
            <div
              className={`text-admin-sub mt-2.5 mb-5 line-clamp-1 w-full justify-start text-[15px] font-medium`}
            >
              {formatDate(announcement.start_at)} ~{" "}
              {formatDate(announcement.end_at)}
            </div>
          ) : (
            <></>
          )}
          <div className="flex gap-2.5 lg:gap-4">
            <AnnouncementDelete id={recruitId} />
            <div
              onClick={() => navigate(`/admin/announcements/edit/${recruitId}`)}
              className="bg-admin-box stext-center flex h-9 w-20.25 cursor-pointer items-center justify-center rounded-[10px] text-xs font-medium text-white hover:opacity-70 lg:w-24 lg:text-sm"
            >
              공고 수정
            </div>
          </div>
        </div>

        {isMobile ? (
          <></>
        ) : (
          <div
            className={`text-admin-sub mt-5 line-clamp-1 w-full justify-start text-[15px] font-medium`}
          >
            {formatDate(announcement.start_at)} ~{" "}
            {formatDate(announcement.end_at)}
          </div>
        )}

        <div className="mt-10.25 flex w-full flex-col lg:mt-12">
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

          {isMobile ? (
            <></>
          ) : (
            <div
              className={`text-admin-sub mt-2.5 line-clamp-1 w-full justify-start text-[15px] font-medium`}
            >
              지원서를 탭하면 자세히 볼 수 있어요
            </div>
          )}

          <div className="mt-3.5 flex w-full justify-between">
            <div
              onClick={() => setIsHidden((prev) => !prev)}
              className="mb-2.5 flex w-full cursor-pointer items-center gap-2.5 lg:mb-0"
            >
              <img
                src={isHidden ? CheckedCircle1 : UnCheckCircle}
                className="h-3.5 w-3.5"
              />
              <div className="justify-start text-sm font-medium text-white">
                임시저장, 회수한 지원서 숨기기
              </div>
            </div>
            {isMobile ? (
              <></>
            ) : (
              <div className="flex w-full items-center gap-2.5">
                <AnnouncementDeleteButton selectedId={selectedId} />
                <AnnouncementMemo selectedId={selectedId} />
                <AnnouncementReviewButton selectedId={selectedId} />
                <AdminStateButton selectedId={selectedId} />
                <AnnouncementButton
                  text="서류 결과 발송"
                  modalTitle="서류(1차) 결과 이메일 발송"
                  modalDescription="모든 지원서에 대한 서류 결과를 발송할까요?"
                  onConfirm={firstPassApi}
                />

                <AnnouncementButton
                  text="최종 결과 발송"
                  modalTitle="최종(2차) 결과 이메일 발송"
                  modalDescription="모든 지원서에 대한 최종 결과를 발송할까요? 
              대상: 지원 상태가 최종 불합격 또는 최종 합격인 사용자"
                  onConfirm={secondPassApi}
                />
              </div>
            )}
          </div>
          {isMobile ? (
            <></>
          ) : (
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
          )}

          <div className="mt-2.5 flex w-full flex-col items-center gap-2.5">
            {isMobile ? (
              <>
                {filteredUsers.map((user) => (
                  <AdminRowMobile
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
                    onRowClick={() =>
                      setDetailApplicationId(user.application_id)
                    }
                    onOpenSetting={() => {
                      setSelectedId(user.application_id);
                      setIsMobileSettingOpen(true);
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                {filteredUsers.map((user) => (
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
                    onRowClick={() =>
                      setDetailApplicationId(user.application_id)
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {detailApplicationId !== null && (
        <SpecificDetailModal
          currentApplicationId={detailApplicationId}
          onClose={() => setDetailApplicationId(null)}
        />
      )}

      {isMobile && isMobileSettingOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsMobileSettingOpen(false)}
          />

          <div className="border-admin-outline-2 fixed top-1/3 left-1/2 flex h-67 w-[calc(100vw-52px)] -translate-x-1/2 flex-col items-center rounded-[10px] border bg-black">
            <div className="border-admin-outline-2 flex h-12 w-full items-center justify-center rounded-tl-[10px] rounded-tr-[10px] border-b">
              <div className="flex w-full items-center justify-between px-5 py-3.75">
                <div className="text-base font-medium text-white">
                  지원서 설정
                </div>
                <img
                  src={XIcon}
                  alt="XIcon"
                  className="h-2.5 w-2.5 cursor-pointer"
                  onClick={() => setIsMobileSettingOpen(false)}
                />
              </div>
            </div>

            <div className="flex h-54.5 w-full flex-col justify-between px-5 py-5">
              <AnnouncementDeleteButton selectedId={selectedId} />
              <AnnouncementMemo selectedId={selectedId} />
              <AdminStateButton selectedId={selectedId} />
              <AnnouncementReviewButton selectedId={selectedId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSpecificAnnouncementPage;
