import { useEffect, useMemo, useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import AnnouncementFilterDropdown from "../components/AnnouncementFilterDropdown";
import type {
  Announcement,
  Filter,
  FilterOption,
} from "../types/AnnouncementManagement";
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";
import { getRecruitAnnouncements } from "../apis/recruits";
import { useNavigate } from "react-router-dom";

const FILTER_OPTIONS: FilterOption[] = [
  { value: "전체", label: "전체" },
  { value: "예정", label: "예정" },
  { value: "모집 중", label: "모집 중" },
  { value: "완료", label: "종료" },
];

const WEB_NEW_ANNOUNCEMENT_BUTTON_CLASS =
  "cursor-pointer h-9.25 w-22.5 rounded-xl bg-admin-box text-sm font-normal text-admin-white";
const MOBILE_NEW_ANNOUNCEMENT_BUTTON_CLASS =
  "cursor-pointer h-9 w-23.75 rounded-xl bg-admin-box text-[13px] font-normal text-admin-white";

function AdminAnnouncementManagementPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("전체");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAnnouncements = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const list = await getRecruitAnnouncements();
        if (mounted) {
          setAnnouncements(list);
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "공고 목록을 불러오지 못했어요.",
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAnnouncements();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredAnnouncements = useMemo(() => {
    if (filter === "전체") return announcements;
    return announcements.filter(
      (announcement) => announcement.status === filter,
    );
  }, [announcements, filter]);

  return (
    <div className="bg-admin-background text-admin-white min-h-screen w-full">
      {/*모바일*/}
      <div className="flex min-h-screen flex-col pt-15 md:hidden">
        <Header />

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
                  onClick={() => navigate("/admin/announcements/create")}
                >
                  새 공고 등록
                </button>
              </div>

              <section
                className="mt-6 flex flex-col gap-3"
                aria-label="모바일 공고 목록"
              >
                {isLoading && (
                  <p className="text-admin-sub py-8 text-center text-sm">
                    공고 목록을 불러오는 중이에요.
                  </p>
                )}
                {!isLoading && errorMessage && (
                  <p className="text-admin-red py-8 text-center text-sm">
                    {errorMessage}
                  </p>
                )}
                {!isLoading &&
                  !errorMessage &&
                  filteredAnnouncements.length === 0 && (
                    <p className="text-admin-sub py-8 text-center text-sm">
                      등록된 공고가 없어요.
                    </p>
                  )}
                {!isLoading &&
                  !errorMessage &&
                  filteredAnnouncements
                    .slice(0, 9)
                    .map((announcement) => (
                      <AnnouncementCard
                        key={announcement.id}
                        announcement={announcement}
                        variant="mobile"
                        onClick={() =>
                          navigate(
                            `/admin/announcements/specific/${announcement.id}`,
                          )
                        }
                      />
                    ))}
              </section>
            </div>
          </div>
        </main>

        <Footer />
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
                    onClick={() => navigate("/admin/announcements/create")}
                  >
                    새 공고 등록
                  </button>
                </div>
              </div>
            </div>

            {/* 공고 카드 목록 영역 */}
            <div className="mt-12 flex justify-center">
              <section className="h-133.75 w-298.5" aria-label="웹 공고 목록">
                {isLoading && (
                  <p className="text-admin-sub py-20 text-center text-sm">
                    공고 목록을 불러오는 중이에요.
                  </p>
                )}
                {!isLoading && errorMessage && (
                  <p className="text-admin-red py-20 text-center text-sm">
                    {errorMessage}
                  </p>
                )}
                {!isLoading &&
                  !errorMessage &&
                  filteredAnnouncements.length === 0 && (
                    <p className="text-admin-sub py-20 text-center text-sm">
                      등록된 공고가 없어요.
                    </p>
                  )}
                {!isLoading && !errorMessage && (
                  <div className="grid grid-cols-3 gap-x-7.5 gap-y-5">
                    {filteredAnnouncements.slice(0, 9).map((announcement) => (
                      <AnnouncementCard
                        key={announcement.id}
                        announcement={announcement}
                        onClick={() =>
                          navigate(
                            `/admin/announcements/specific/${announcement.id}`,
                          )
                        }
                      />
                    ))}
                  </div>
                )}
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
