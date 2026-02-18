import { useState } from "react";
import Header from "../../../shared/components/Header";

import UnCheckCircle from "../assets/UnCheckCircle.png";
import { AdminRow } from "@specific/components/AdminRow";
import AnnouncementTitleText from "@specific/components/AnnouncementTitleText";
import ApplicationTableHeader from "@specific/components/ApplicationTableHeader";
import AnnouncementReviewButton from "@specific/components/AnnouncementReviewButton";
import AdminStateButton from "@specific/components/AdminStatusButton";
import AnnouncementButton from "@specific/components/AnnouncementCardButton";
import AnnouncementDateText from "@specific/components/AnnouncementDateText";
import { AnnouncementDelete } from "@specific/components/AnnouncementDelete";
import { AnnouncementQuestion } from "@specific/components/AnnouncementQuestion";
import SpecificDetailModal from "@specific/components/modal/SpecificDetailmodal";
import { APPLICATIONS } from "@specific/mock/mockApplications";

const AdminSpecificAnnouncementPage = () => {
  const [detailApplicationId, setDetailApplicationId] = useState<number | null>(
    null,
  );

  return (
    <div className="flex justify-center bg-black">
      <Header />
      <div className="flex h-500 w-298.5 flex-col items-center bg-black">
        <div className="mt-35.5 flex w-full justify-between">
          <div className="line-clamp-1 justify-start text-3xl font-medium text-white">
            14기 강남대학교 멋쟁이사자처럼 아기사자 모집 - 백엔드 파트
          </div>
          <div className="flex gap-4">
            <AnnouncementDelete />
            <div className="bg-admin-box flex h-9 w-24 cursor-pointer items-center justify-center rounded-[10px] text-center text-sm font-medium text-white hover:opacity-70">
              공고 수정
            </div>
          </div>
        </div>
        <AnnouncementDateText
          text="2025.00.00 00:00 ~ 2026.00.00 00:00"
          mt={5}
        />

        <div className="mt-12 flex w-full flex-col">
          <AnnouncementTitleText text="이 공고에 등록된 질문" />
          <div className="mt-4 flex flex-col gap-2.5">
            <AnnouncementQuestion />
            <AnnouncementQuestion />
            <AnnouncementQuestion />
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col">
          <AnnouncementTitleText text="이 공고에 지원한 사용자" />
          <AnnouncementDateText
            text="지원서를 탭하면 자세히 볼 수 있어요"
            mt={2.5}
          />
          <div className="mt-3.5 flex h-9 w-full justify-between">
            <div className="flex w-full items-center gap-2.5">
              <img src={UnCheckCircle} className="h-3.5 w-3.5" />
              <div className="justify-start text-sm font-medium text-white">
                임시저장, 회수한 지원서 숨기기
              </div>
            </div>
            <div className="flex w-full items-center gap-2.5">
              <AnnouncementButton
                text="지원서 삭제"
                modalTitle="지원서 삭제"
                modalDescription="이 사용자의 지원서를 삭제할까요? 
                이 작업은 되돌릴 수 없어요"
              />

              <AnnouncementButton
                text="메모 등록"
                modalTitle="공고 삭제"
                modalDescription="이 공고에 지원한 사용자(임시저장 상태 포함)가 
                존재한다면 이 작업은 거부될 수 있어요."
              />

              <AnnouncementReviewButton text="검토 변경" />
              <AdminStateButton text="상태 변경" />
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
          <ApplicationTableHeader />
          <div className="mt-2.5 flex w-298.5 flex-col items-center gap-2.5">
            {APPLICATIONS.map((application) => (
              <AdminRow
                key={application.application_id}
                application_id={application.application_id}
                name={application.name}
                depart={application.depart}
                memo={application.memo}
                submitted_at={application.submitted_at}
                evaluation={application.evaluation}
                status={application.status}
                onRowClick={() => setDetailApplicationId(application.application_id)}
              />
            ))}
          </div>
        </div>
      </div>

      {detailApplicationId !== null && (
        <SpecificDetailModal
          applications={APPLICATIONS}
          currentApplicationId={detailApplicationId}
          onClose={() => setDetailApplicationId(null)}
        />
      )}
    </div>
  );
};

export default AdminSpecificAnnouncementPage;
