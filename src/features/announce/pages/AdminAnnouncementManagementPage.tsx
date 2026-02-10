import { useMemo, useState } from "react";
import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";

type Filter = "전체" | "예정" | "모집 중" | "완료";

type Announcement = {
  id: string;
  status: "모집 중" | "완료";
  title: string;
  period: string;
  stats: string; 
};

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "전체", label: "전체" },
  { value: "예정", label: "예정" },
  { value: "모집 중", label: "모집 중" },
  { value: "완료", label: "종료" },
];

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
  title: "13기 강남대학교 멋쟁이사자처럼 아기사자 모집 - 프론트엔드 파트",
  period: "2024.00.00 00:00 ~ 2025.00.00 00:00",
  stats: "제출 32 · 임시저장 3",
}));

function AdminAnnouncementManagementPage() {
  const [filter, setFilter] = useState<Filter>("전체");
  const [open, setOpen] = useState(false);

  const filterLabel = useMemo(() => {
    return FILTER_OPTIONS.find((x) => x.value === filter)?.label ?? filter;
  }, [filter]);

  const filtered = useMemo(() => {
    if (filter === "전체") return MOCK_OPEN;
    if (filter === "모집 중") return MOCK_OPEN;
    if (filter === "완료") return MOCK_ENDED;
    return MOCK_OPEN;
  }, [filter]);

  return (
    <div className="bg-black1 text-white1 flex w-full flex-col">
      <Header />

      <main className="w-full grow">
        <div className="mx-auto w-full max-w-[1440px] px-12 pt-24 pb-16">
          <div className="flex justify-center">
            <div className="flex w-[1194px] items-start justify-between">
              <h1 className="text-[30px] font-normal tracking-[-0.02em]">
                공고 관리
              </h1>

              <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className={[
                    "h-[37px] w-[107px] rounded-[12px]",
                    "bg-white/10 text-white",
                    "px-3 text-[14px] font-normal",
                    "flex items-center justify-between",
                    "border border-white/10",
                  ].join(" ")}
                >
                  <span>{filterLabel}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="opacity-80"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M7 10l5 5 5-5H7z"
                    />
                  </svg>
                </button>

                {open && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setOpen(false)}
                      aria-label="close"
                    />
                    <div
                      className={[
                        "absolute right-0 mt-2 z-50",
                        "w-[107px] rounded-[12px]",
                        "bg-[#1d1d1d]/90 backdrop-blur-md",
                        "border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
                        "overflow-hidden",
                      ].join(" ")}
                    >
                      {FILTER_OPTIONS.map((option) => {
                          const active = option.value === filter;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setFilter(option.value);
                                setOpen(false);
                              }}
                              className={[
                                "w-full px-3 py-2 text-left text-[14px] font-normal",
                                active ? "text-white" : "text-white/60",
                                "hover:bg-white/5",
                              ].join(" ")}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                className={[
                  "h-[37px] w-[90px] rounded-[12px]",
                  "bg-white/10 text-white",
                  "text-[14px] font-normal",
                  "border border-white/10",
                ].join(" ")}
              >
                새 공고 등록
              </button>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <section
              className="w-[1194px] h-[535px]"
              aria-label="공고 목록"
            >
              <div
                className={[
                  "grid",
                  "grid-cols-3",
                  "gap-x-[30px] gap-y-[20px]", 
                ].join(" ")}
              >
                {filtered.slice(0, 9).map((item) => (
                  <article
                    key={item.id}
                    className={[
                      "w-[378px] h-[165px] rounded-[20px]",
                      "bg-white/10",
                      "border border-white/10",
                      "shadow-[0_10px_30px_rgba(0,0,0,0.55)]",
                      "px-7 py-6",
                      "flex flex-col",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "text-[11px] font-normal",
                        item.status === "완료"
                          ? "text-red-500"
                          : "text-[#8B5CF6]",
                      ].join(" ")}
                    >
                      {item.status}
                    </div>

                    <div className="mt-2 text-[15px] font-normal leading-snug">
                      {item.title}
                    </div>

                    <div className="mt-4 text-[14px] font-normal text-white/50">
                      {item.period}
                    </div>

                    <div className="mt-auto text-[11px] font-normal text-white/70">
                      {item.stats}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminAnnouncementManagementPage;
