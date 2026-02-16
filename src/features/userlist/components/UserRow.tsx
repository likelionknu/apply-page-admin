import type { AdminUser } from "@userlist/types/userProps";

interface Props extends AdminUser {
  order: number;
  selected: boolean;
  onSelect: () => void;
  onRowClick?: () => void;
}

function UserRow({
  order,
  name,
  email,
  major,
  createdAt,
  lastLogin,
  role,
  selected,
  onSelect,
  onRowClick,
}: Props) {
  return (
    <div
      onClick={onRowClick}
      className="bg-admin-box hover:bg-admin-outline-2 grid h-12 cursor-pointer grid-cols-[40px_60px_100px_240px_140px_250px_240px_80px] items-center rounded-[10px] px-4 transition"
    >
      {/* 라디오 버튼 */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="flex justify-center"
      >
        <div
          className={`h-5 w-5 rounded-full border ${
            selected
              ? "border-admin-white bg-admin-white"
              : "border-admin-disable"
          }`}
        />
      </div>

      <span className="text-center text-[14px]">{order}</span>
      <span className="truncate text-center text-[14px]">{name}</span>
      <span className="truncate text-center text-[14px]">{email}</span>
      <span className="truncate text-center text-[14px]">
        {major === "미등록" ? (
          <span className="text-admin-disable">{major}</span>
        ) : (
          major
        )}
      </span>
      <span className="truncate text-center text-[14px]">{createdAt}</span>
      <span className="truncate text-center text-[14px]">{lastLogin}</span>
      <span className="truncate text-center text-[14px]">{role}</span>
    </div>
  );
}

export default UserRow;
