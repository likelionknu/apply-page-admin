import { formatRole, type AdminUser } from "@userlist/types/userProps";
import checkIcon from "@userlist/assets/check.png";
import { formatDate } from "./TimeChange";

interface Props extends AdminUser {
  order: number;
  selected: boolean;
  onSelect: () => void;
  onRowClick?: () => void;
}
const renderValue = (value?: string) => {
  const hasValue = value?.trim();
  return {
    text: hasValue || "미등록",
    isEmpty: !hasValue,
  };
};

function UserRowDesktop({
  order,
  name,
  email,
  department,
  createdAt,
  lastLogin,
  role,
  selected,
  onSelect,
  onRowClick,
}: Props) {
  const dept = renderValue(department);

  return (
    <div
      onClick={onRowClick}
      className="bg-admin-box hover:bg-admin-outline-2 grid h-12 cursor-pointer grid-cols-[40px_60px_100px_240px_140px_250px_240px_80px] items-center rounded-[10px] px-4 transition"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="flex justify-center"
      >
        {selected ? (
          <img src={checkIcon} alt="selected" className="h-5 w-5" />
        ) : (
          <div className="border-admin-disable h-5 w-5 rounded-full border" />
        )}
      </div>

      <span className="text-center text-[14px]">{order}</span>
      <span className="truncate text-center text-[14px]">{name}</span>
      <span className="truncate text-center text-[14px]">{email}</span>
      <span
        className={`truncate text-center text-[14px] ${
          dept.isEmpty ? "text-admin-disable" : ""
        }`}
      >
        {dept.text}
      </span>
      <span className="truncate text-center text-[14px]">
        {formatDate(createdAt)}
      </span>
      <span className="truncate text-center text-[14px]">
        {formatDate(lastLogin)}
      </span>
      <span className="truncate text-center text-[14px]">
        {formatRole(role)}
      </span>
    </div>
  );
}

export default UserRowDesktop;
