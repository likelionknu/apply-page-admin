import { useState } from "react";
import dropDown from "@userlist/assets/drop.png";
import { formatRole } from "@userlist/types/userProps";

interface Props {
  selectedRole: "ADMIN" | "USER" | null;
  setSelectedRole: (role: "ADMIN" | "USER") => void;
}

export default function MobileRoleDropdown({
  selectedRole,
  setSelectedRole,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 mb-4 space-y-3">
      <p>
        사용자의 권한을 변경할까요?
        <br />이 작업은 즉시 적용되며, 되돌릴 수 없어요
      </p>

      <div className="relative w-77.5">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-admin-box flex h-9 w-full items-center justify-between rounded-lg px-4 text-sm transition"
        >
          <span>{selectedRole ? formatRole(selectedRole) : "선택"}</span>
          <img
            src={dropDown}
            alt="dropdown"
            className={`h-1.5 w-2.5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="bg-admin-box text-admin-disable mt-1 rounded-lg shadow-lg">
            <button
              onClick={() => {
                setSelectedRole("USER");
                setIsOpen(false);
              }}
              className="hover:text-admin-white w-full px-4 py-2 text-left text-sm"
            >
              {formatRole("USER")}
            </button>
            <button
              onClick={() => {
                setSelectedRole("ADMIN");
                setIsOpen(false);
              }}
              className="hover:text-admin-white w-full px-4 py-2 text-left text-sm"
            >
              {formatRole("ADMIN")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
