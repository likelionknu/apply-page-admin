export default function ApplicationTableHeader() {
  return (
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
  );
}
