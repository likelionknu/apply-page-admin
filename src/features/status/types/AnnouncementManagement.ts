export type Filter = "전체" | "예정" | "모집 중" | "완료";
export type AnnouncementStatus = Exclude<Filter, "전체">;

export interface Announcement {
  id: string;
  status: AnnouncementStatus;
  title: string;
  period: string;
  stats: string;
}

export interface FilterOption {
  value: Filter;
  label: string;
}
