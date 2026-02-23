import { formatRole, type AdminUser } from "@userlist/types/userProps";
import changeImg from "@userlist/assets/change.png";
import { formatDate } from "@userlist/components/TimeChange";
import { InfoRow } from "./InfoRow";

interface Props extends AdminUser {
  order: number;
  selected: boolean;
  onSelect: () => void;
  onRowClick?: () => void;
  onChangeRoleClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

function UserRowMobile({
  id,
  order,
  name,
  email,
  department,
  createdAt,
  lastLogin,
  role,
  onRowClick,
  onChangeRoleClick,
  onDeleteClick,
}: Props) {
  return (
    <div className="bg-admin-box w-87.5 rounded-[10px] p-4 pb-0">
      {/* 상단 */}
      <div className="border-admin-outline-2 -mx-4 flex items-center justify-between border-b pb-3">
        {/* 왼쪽 */}
        <div className="flex items-center gap-2 pl-5">
          <span className="text-admin-label text-sm">{order}</span>
          <span className="text-admin-white text-[14px] font-medium">
            {name}
          </span>
        </div>

        {/* 오른쪽 버튼 영역 */}
        <div
          className="flex items-center gap-4 pr-5 text-sm font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChangeRoleClick(id);
            }}
            className="text-admin-purple flex items-center gap-1"
          >
            <img src={changeImg} alt="setting" className="h-2 w-3" />
            <div className="text-admin-blue text-[12px]">권한 변경</div>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(id);
            }}
            className="text-admin-red text-[12px]"
          >
            ✕ 사용자 삭제
          </button>
        </div>
      </div>
      {/* 정보 */}
      <div className="space-y-3">
        <InfoRow label="이메일 주소" value={email ?? "-"} />
        <InfoRow label="학과" value={department ?? "미등록"} />
        <InfoRow
          label="회원 등록일"
          value={createdAt ? formatDate(createdAt) : "-"}
        />

        <InfoRow
          label="최근 접속일"
          value={lastLogin ? formatDate(lastLogin) : "-"}
        />
        <InfoRow label="권한" value={formatRole(role)} />
      </div>
      <button
        type="button"
        onClick={onRowClick}
        className="text-admin-blue flex h-8.25 w-full items-center justify-center text-[10px] font-medium hover:cursor-pointer"
      >
        상세정보 열람하기
      </button>
    </div>
  );
}
export default UserRowMobile;
