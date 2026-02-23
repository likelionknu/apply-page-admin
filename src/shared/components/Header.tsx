import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoImg from "../assets/logo.png";
import userImg from "../assets/user.png";
import menuImg from "../assets/menu.png";

const baseClass = "flex items-center transition-all duration-200";
const inactiveClass = "text-admin-sub";
const activeClass = "text-white";

function Header() {
  const navigate = useNavigate();
  const name = sessionStorage.getItem("userName");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-100 w-full bg-[#131313] text-white">
      <div className="border-admin-outline/20 mx-auto flex h-14 w-full max-w-360 items-center justify-between border-b px-6 md:h-20 md:border-none md:px-30">
        <div className="flex gap-14.5">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate("/admin/user-list")}
          >
            <img
              src={logoImg}
              alt="knu"
              className="h-3.5 md:h-[19.25px] md:w-[13.76px]"
            />
            <p className="text-[18px] font-bold md:text-[21px]">LIKELION KNU</p>
          </div>

          {/* 데스크탑 메뉴 */}
          <div className="hidden items-center gap-8 md:flex md:text-[16px]">
            <NavLink
              to="/admin/user-list"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              사용자 관리
            </NavLink>

            <NavLink
              to="/admin/announcements/management"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              공고 관리
            </NavLink>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex md:text-[16px]">
          <img src={userImg} alt="유저" />
          <span className="text-[16px] font-medium">{name}</span>
        </div>
        {/* 모바일 햄버거 */}
        <div
          className="flex h-6 w-6 cursor-pointer flex-col justify-center gap-1 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={menuImg} alt="메뉴" className="h-3 w-3.5" />
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isOpen && (
        <div className="mx-auto w-full max-w-360 border-b border-none bg-neutral-900 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4 text-sm text-[14px] font-medium">
            <NavLink
              to="/admin/user-list"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-admin-disable"
              }
            >
              사용자 관리
            </NavLink>
            <NavLink
              to="/admin/announcements/management"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-admin-disable"
              }
            >
              공고 관리
            </NavLink>
            <div className="flex items-center gap-2">
              <img src={userImg} alt="유저" />
              <span className="text-[14px] text-white">{name}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
