import type {
  Announcement,
  AnnouncementStatus,
} from "../types/AnnouncementManagement";

type CardVariant = "web" | "mobile";

const ANNOUNCEMENT_CARD_CLASS: Record<CardVariant, string> = {
  web: "cursor-pointer flex h-41.25 w-94.5 flex-col rounded-2xl bg-admin-box px-7 py-6 shadow-xl",
  mobile:
    "cursor-pointer flex h-37.75 w-87.5 items-center justify-center rounded-2xl bg-admin-box shadow-xl",
};

const STATUS_TEXT_CLASS: Record<AnnouncementStatus, string> = {
  예정: "text-admin-sub",
  "모집 중": "text-admin-blue",
  완료: "text-admin-red",
};

interface AnnouncementCardProps {
  announcement: Announcement;
  variant?: CardVariant;
}

function AnnouncementCard({
  announcement,
  variant = "web",
}: AnnouncementCardProps) {
  const isMobile = variant === "mobile";
  const statusTextClass = isMobile ? "text-[11px]" : "text-xs";
  const titleTextClass = isMobile ? "text-sm" : "text-sm";
  const periodTextClass = isMobile ? "text-xs" : "text-sm";
  const statsTextClass = isMobile ? "text-[11px]" : "text-xs";
  const contentWrapperClass = isMobile
    ? "flex h-28.5 w-77.5 flex-col gap-2.5"
    : "flex h-full flex-col";
  const titleSpacingClass = isMobile ? "" : "mt-2";
  const periodSpacingClass = isMobile ? "" : "mt-4";
  const statsSpacingClass = isMobile ? "" : "mt-auto";

  return (
    <article className={ANNOUNCEMENT_CARD_CLASS[variant]}>
      <div className={contentWrapperClass}>
        {/* 공고 상태 라벨 (예정/모집 중/완료) */}
        <div
          className={`${statusTextClass} font-normal ${STATUS_TEXT_CLASS[announcement.status]}`}
        >
          {announcement.status}
        </div>

        {/* 공고 제목 */}
        <div
          className={`${titleSpacingClass} ${titleTextClass} leading-snug font-normal`}
        >
          {announcement.title}
        </div>

        {/* 모집 기간 */}
        <div
          className={`${periodSpacingClass} ${periodTextClass} text-admin-sub font-normal`}
        >
          {announcement.period}
        </div>

        {/* 제출/임시저장 통계 */}
        <div
          className={`${statsSpacingClass} ${statsTextClass} text-admin-white/70 font-normal`}
        >
          {announcement.stats}
        </div>
      </div>
    </article>
  );
}

export default AnnouncementCard;
