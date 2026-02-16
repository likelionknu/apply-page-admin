import { useMemo, useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import AnnouncementFilterDropdown from "../components/AnnouncementFilterDropdown";
import type {
  Announcement,
  AnnouncementStatus,
  Filter,
  FilterOption,
} from "../types/AnnouncementManagement";
import logoImg from "@shared/assets/logo.png";
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";

const FILTER_OPTIONS: FilterOption[] = [
  { value: "전체", label: "전체" },
  { value: "예정", label: "예정" },
  { value: "모집 중", label: "모집 중" },
  { value: "완료", label: "종료" },
];

const MOCK_UPCOMING: Announcement[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `a-upcoming-${i + 1}`,
  status: "예정",
  title: "14기 강남대학교 멋쟁이사자처럼 아기사자 모집 - 백엔드 파트",
  period: "2025.00.00 00:00 ~ 2026.00.00 00:00",
  stats: "제출 32 · 임시저장 3",
}));

const MOCK_OPEN: Announcement[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `a-open-${i + 1}`,
  status: "모집 중",
  title: "14기 강남대학교 멋쟁이사자처럼 아기사자 모집 - 백엔드 파트",
  period: "2025.00.00 00:00 ~ 2026.00.00 00:00",
  stats: "제출 32 · 임시저장 3",
}));

const MOCK_ENDED: Announcement[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `a-ended-${i + 1}`,
  status: "완료",
  title: "14기 강남대학교 멋쟁이사자처럼 아기사자 모집 - 백엔드 파트",
  period: "2025.00.00 00:00 ~ 2026.00.00 00:00",
  stats: "제출 32 · 임시저장 3",
}));

const MOCK_ALL: Announcement[] = [
  ...MOCK_UPCOMING.slice(0, 3),
  ...MOCK_OPEN.slice(0, 3),
  ...MOCK_ENDED.slice(0, 3),
];

const ANNOUNCEMENTS_BY_FILTER: Record<AnnouncementStatus, Announcement[]> = {
  예정: MOCK_UPCOMING,
  "모집 중": MOCK_OPEN,
  완료: MOCK_ENDED,
};

const WEB_NEW_ANNOUNCEMENT_BUTTON_CLASS =
  "cursor-pointer h-9.25 w-22.5 rounded-xl border border-admin-outline/10 bg-admin-outline/10 text-sm font-normal text-admin-white";
const MOBILE_NEW_ANNOUNCEMENT_BUTTON_CLASS =
  "cursor-pointer h-9 w-23.75 rounded-xl border border-admin-outline/10 bg-admin-outline/10 text-[13px] font-normal text-admin-white";

const MOBILE_FOOTER_DESCRIPTION = `실습실 : 경기도 용인시 기흥구 강남로 40 강남대학교 후생관 104호
동아리실 : 경기도 용인시 기흥구 강남로 40 강남대학교 후생관 멋쟁이사자처럼
프로젝트 개발 : 프로젝트 코어`;

function AdminAnnouncementManagementPage() {
  const [filter, setFilter] = useState<Filter>("전체");

  const filteredAnnouncements = useMemo(() => {
    if (filter === "전체") return MOCK_ALL;
    return ANNOUNCEMENTS_BY_FILTER[filter];
  }, [filter]);

  return (
    <div className="bg-admin-background text-admin-white min-h-screen w-full">
      {/*모바일*/}
      <div className="flex min-h-screen flex-col md:hidden">
        <header className="border-admin-outline/10 flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="LIKELION KNU" className="w-3.5" />
            <p className="text-lg font-bold tracking-tight">LIKELION KNU</p>
          </div>

          <button
            type="button"
            className="text-admin-white/90 flex h-8 w-8 items-center justify-center"
            aria-label="menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 7H19M5 12H19M5 17H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <main className="grow pt-10 pb-8">
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="w-87.5">
              <h1 className="text-2xl font-medium tracking-tight">공고 관리</h1>

              <div className="mt-6 flex items-center gap-3">
                <AnnouncementFilterDropdown
                  value={filter}
                  options={FILTER_OPTIONS}
                  onChange={setFilter}
                  size="mobile"
                />

                <button
                  type="button"
                  className={MOBILE_NEW_ANNOUNCEMENT_BUTTON_CLASS}
                >
                  새 공고 등록
                </button>
              </div>

              <section
                className="mt-6 flex flex-col gap-3"
                aria-label="모바일 공고 목록"
              >
                {filteredAnnouncements.slice(0, 9).map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    variant="mobile"
                  />
                ))}
              </section>
            </div>
          </div>
        </main>

        <footer className="border-admin-outline/10 bg-admin-box mt-auto border-t px-8 py-9">
          <div className="space-y-3 text-sm">
            <p>© 2026 LIKELION KNU. All rights reserved.</p>
            <p className="text-admin-sub leading-6 whitespace-pre-line">
              {MOBILE_FOOTER_DESCRIPTION}
            </p>
          </div>
        </footer>
      </div>

      {/*웹*/}
      <div className="hidden min-h-screen flex-col md:flex">
        <Header />

        {/* 페이지 본문 영역 */}
        <main className="w-full grow">
          <div className="mx-auto w-full max-w-360 px-12 pt-30 pb-16">
            <div className="flex justify-center">
              <div className="flex w-298.5 items-start justify-between">
                <h1 className="text-3xl font-normal tracking-tight">
                  공고 관리
                </h1>

                <div className="flex items-center gap-3">
                  {/* 공고 상태 필터 드롭다운 */}
                  <AnnouncementFilterDropdown
                    value={filter}
                    options={FILTER_OPTIONS}
                    onChange={setFilter}
                  />

                  {/* 새 공고 등록 버튼 */}
                  <button
                    type="button"
                    className={WEB_NEW_ANNOUNCEMENT_BUTTON_CLASS}
                  >
                    새 공고 등록
                  </button>
                </div>
              </div>
            </div>

            {/* 공고 카드 목록 영역 */}
            <div className="mt-12 flex justify-center">
              <section className="h-133.75 w-298.5" aria-label="웹 공고 목록">
                <div className="grid grid-cols-3 gap-x-7.5 gap-y-5">
                  {filteredAnnouncements.slice(0, 9).map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AdminAnnouncementManagementPage;
