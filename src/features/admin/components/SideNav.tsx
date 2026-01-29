import { NavLink } from "react-router-dom";
import userImg from "../assets/user.png";
import docImg from "../assets/doc.png";

const baseClass =
  "flex w-full items-center rounded-[10px] border px-4 py-2 transition-all duration-200";
const inactiveClass =
  "border-transparent text-gray-300 hover:border-white hover:bg-neutral-900";
const activeClass = "border-white bg-neutral-900 text-white";

function SideNav() {
  return (
    <aside className="mt-36 flex min-h-screen w-60 flex-col bg-black px-6 py-10 text-white">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/user-dashboard"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <img className="mr-2" src={userImg} alt="user" />
          <span>유저 관리</span>
        </NavLink>

        <NavLink
          to="/admin/announcements"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <img className="mr-2" src={docImg} alt="doc" />
          <span>공고 관리</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default SideNav;
