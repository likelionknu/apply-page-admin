import type { AdminUser } from "@userlist/types/userProps";

interface Props extends AdminUser {
  order: number;
  selected: boolean;
  onSelect: () => void;
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
}: Props) {
  return (
    <div
      className={`} bg-admin-box grid h-12 cursor-pointer grid-cols-[40px_60px_100px_240px_120px_220px_220px_80px] items-center rounded-[10px] px-4 transition`}
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
            selected ? "border-white bg-white" : "border-gray-500"
          }`}
        />
      </div>

      <span className="text-center text-sm">{order}</span>
      <span className="truncate text-center text-sm">{name}</span>
      <span className="truncate text-center text-sm">{email}</span>
      <span className="truncate text-center text-sm">
        {major === "미등록" ? (
          <span className="text-gray-500">{major}</span>
        ) : (
          major
        )}
      </span>
      <span className="truncate text-center text-sm">{createdAt}</span>
      <span className="truncate text-center text-sm">{lastLogin}</span>
      <span className="truncate text-center text-sm">{role}</span>
    </div>
  );
}

export default UserRow;
