import { NavLink } from "react-router-dom";
import logoImg from "../assets/logo.png";
import userImg from "../assets/user.png";

const baseClass = "flex items-center transition-all duration-200";
const inactiveClass = "text-gray4 hover:text-gray2";
const activeClass = "  text-white";

function Header() {
  return (
    <header className="text-white1 bg-black1 fixed z-100 flex h-20 w-full">
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-20">
        <div className="flex gap-14.5">
          <div className="flex cursor-pointer items-center gap-1">
            <img src={logoImg} alt="knu" className="w-9" />
            <p className="text-[21px] leading-140 font-bold">LIKELION KNU</p>
          </div>
          <div className="flex items-center gap-8 text-[16px]">
            <NavLink
              to="/admin/user-dashboard"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span>사용자 관리</span>
            </NavLink>

            <NavLink
              to="/admin/announcements"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span>공고 관리</span>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center">
          <img src={userImg} alt="google" className="w-6" />
          <p className="tracking-tight-custom ml-2.5 text-base leading-140 font-semibold">
            황현진
          </p>
        </div>
      </nav>
    </header>
  );
}

export default Header;
