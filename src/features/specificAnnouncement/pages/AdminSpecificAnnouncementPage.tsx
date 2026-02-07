import Header from "../../../shared/components/Header";
import Vector from "../assets/Vector.png";
import UnCheckCircle from "../assets/UnCheckCircle.png";
import UnCheckCircle2 from "../assets/UnCheckCircle2.png";

const AnnouncementQuestion = () => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="bg-black3 flex h-9 w-28 cursor-pointer items-center justify-between rounded-[10px] px-3.5 py-2.5">
        <div className="justify-start text-sm font-medium text-[#5A5A5A]">
          순서 1
        </div>
        <img src={Vector} className="h-1.5 w-2.5" />
      </div>
      <div className="bg-black3 h-9 w-full rounded-[10px] px-7.5 py-2.5 text-base font-medium text-white">
        멋쟁이사자처럼 강남대학교에 어떤 계기로 지원하게 되었나요?
      </div>
    </div>
  );
};

interface AnnouncementButtonProps {
  text: string;
}

const AnnouncementButton = ({ text }: AnnouncementButtonProps) => {
  return (
    <div className="bg-black3 flex h-9 w-28 items-center justify-center rounded-[10px] text-sm font-medium text-white">
      {text}
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

interface DescriptionTextProps {
  text: string;
  mt: number;
}

const AnnouncementSubText = ({ text, mt }: DescriptionTextProps) => {
  return (
    <div
      className={`text-gray7 line-clamp-1 w-full justify-start text-lg font-medium mt-${mt}`}
    >
      {text}
    </div>
  );
};

const AdminSpecificAnnouncementPage = () => (
  <div className="flex justify-center bg-black">
    <Header />
    <div className="flex h-full w-298.5 flex-col items-center bg-black">
      <div className="mt-35.5 flex w-full justify-between">
        <div className="line-clamp-1 justify-start text-3xl font-medium text-white">
          14기 강남대학교 멋쟁이사자처럼 아기사자 모집 - 백엔드 파트
        </div>
        <div className="flex gap-4">
          <div className="bg-black3 flex h-9 w-24 cursor-pointer items-center justify-center rounded-[10px] text-center text-sm font-medium text-white">
            공고 삭제
          </div>
          <div className="bg-black3 flex h-9 w-24 cursor-pointer items-center justify-center rounded-[10px] text-center text-sm font-medium text-white">
            공고 수정
          </div>
        </div>
      </div>
      <AnnouncementSubText text="2025.00.00 00:00 ~ 2026.00.00 00:00" mt={5} />

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
        <AnnouncementSubText
          text="지원서를 탭하면 자세히 볼 수 있어요"
          mt={2.5}
        />
        <div className="mt-3.5 flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-2.5">
            <img src={UnCheckCircle} className="h-3.5 w-3.5" />
            <div className="justify-start text-sm font-medium text-white">
              임시저장, 회수한 지원서 숨기기
            </div>
          </div>
          <div className="flex w-full items-center gap-2.5">
            <AnnouncementButton text="지원서 삭제" />
            <AnnouncementButton text="지원서 삭제" />
            <AnnouncementButton text="지원서 삭제" />
            <AnnouncementButton text="지원서 삭제" />
            <AnnouncementButton text="지원서 삭제" />
            <AnnouncementButton text="지원서 삭제" />
          </div>
        </div>
        <div className="bg-black3 text-gray7 mt-3 grid h-9 w-[1194px] grid-cols-[118px_111px_154px_257px_262px_170px_94px] items-center rounded-[10px] text-sm font-medium">
          <div className="pr-0 text-right">순번</div>
          <div className="pr-0 text-right">이름</div>
          <div className="pr-0 text-right">학부</div>
          <div className="pr-0 text-right">운영진 메모</div>
          <div className="pr-0 text-right">최종 제출일</div>
          <div className="pr-0 text-right">운영진 검토</div>
          <div className="pr-0 text-right">지원 상태</div>
        </div>
        <div className="mt-2.5 flex w-full flex-col">
          <div className="bg-black3 text-gray7 mt-3 grid h-9 w-[1194px] grid-cols-[48px_70px_111px_154px_257px_262px_170px_94px] items-center rounded-[10px] text-sm font-medium">
            {/* 1. 아이콘 영역: 왼쪽 마진 28px 적용 */}
            <div className="flex justify-start pl-[28px]">
              <img src={UnCheckCircle2} className="h-5 w-5" alt="checkbox" />
            </div>

            {/* 2. 순번: 기존 위치 유지를 위해 70px 영역에서 오른쪽 정렬 */}
            <div className="text-right">1</div>

            {/* 나머지 아이템: 기존 위치 동일 */}
            <div className="text-right">김찬주</div>
            <div className="text-right">ict융합공학부</div>
            <div className="text-right">운영진 메모</div>
            <div className="text-right">최종 제출일</div>
            <div className="text-right">운영진 검토</div>
            <div className="text-right">지원 상태</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminSpecificAnnouncementPage;
