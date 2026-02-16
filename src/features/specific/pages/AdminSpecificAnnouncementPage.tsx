import Header from "../../../shared/components/Header";
// import { useState } from "react";

import UnCheckCircle from "../assets/UnCheckCircle.png";
import { AdminRow } from "@specific/components/AdminRow";
import AnnouncementReviewButton from "@specific/components/AnnouncementReviewButton";
import AdminStateButton from "@specific/components/AdminStatusButton";
import AnnouncementButton from "@specific/components/AnnouncementCardButton";
import AnnouncementDateText from "@specific/components/AnnouncementDateText";
import { AnnouncementDelete } from "@specific/components/AnnouncementDelete";

const AnnouncementQuestion = () => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="bg-admin-box flex h-9 w-28 items-center justify-between rounded-[10px] px-3.5 py-2.5">
        <div className="justify-start text-sm font-medium text-[#5A5A5A]">
          순서
        </div>
      </div>
      <div className="bg-admin-box flex h-9 w-full items-center rounded-[10px] px-7.5 py-2.5 text-base font-medium text-white">
        멋쟁이사자처럼 강남대학교에 어떤 계기로 지원하게 되었나요?
      </div>
    </div>
  );
};

interface AnnouncementTitleTextProps {
  text: string;
}

const AnnouncementTitleText = ({ text }: AnnouncementTitleTextProps) => {
  return (
    <div className="justify-start text-xl font-medium text-white">{text}</div>
  );
};

const AdminSpecificAnnouncementPage = () => (
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
      <AnnouncementDateText text="2025.00.00 00:00 ~ 2026.00.00 00:00" mt={5} />

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
          <AdminRow
            application_id={1}
            name="황형진"
            depart="ICT융합공학부"
            memo="안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
            submitted_at="최종 제출되지 않음"
            evaluation="미등록"
            status="임시저장"
          />
          <AdminRow
            application_id={7}
            name="황형진"
            depart="ICT융합공학부"
            memo="미등록"
            submitted_at="최종 제출되지 않음"
            evaluation="PASS"
            status="임시저장"
          />
          <AdminRow
            application_id={15}
            name="황형진"
            depart="ICT융합공학부"
            memo="미등록"
            submitted_at="최종 제출되지 않음"
            evaluation="미등록"
            status="임시저장"
          />
        </div>
      </div>
    </div>
  </div>
);

export default AdminSpecificAnnouncementPage;
