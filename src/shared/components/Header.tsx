import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import userImg from "../assets/user.png";

const baseClass = "flex items-center  transition-all duration-200";
const inactiveClass = "text-admin-sub hover:text-gray2";
const activeClass = "  text-white";

function Header() {
  const navigate = useNavigate();
  const name = sessionStorage.getItem("userName");

  return (
    <header className="fixed z-100 flex h-20 w-full bg-[#131313] text-white">
      <nav className="mx-auto flex w-full max-w-360 items-center justify-between px-20">
        <div className="flex gap-14.5">
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={() => navigate("/admin/user-list")}
          >
            <img src={logoImg} alt="knu" className="h-[19.25px] w-[13.76px]" />
            <p className="p-2 text-[21px] font-bold">LIKELION KNU</p>
          </div>
          <div className="flex items-center gap-8 text-[16px]">
            <NavLink
              to="/admin/user-list"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span>사용자 관리</span>
            </NavLink>
            <NavLink
              to="/admin/announcements/management"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span>공고 관리</span>
            </NavLink>
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-2">
          <img
            src={userImg}
            alt="유저"
            className="bg-admin-box rounded-[50%] p-1.5"
          />
          <span className="text-[16px] leading-140 font-medium tracking-[-0.03em]">
            {name}
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
