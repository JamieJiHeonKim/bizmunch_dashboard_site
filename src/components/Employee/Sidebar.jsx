import {
  BusinessCenterOutlined,
  MailOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import { NavLink, Link } from "react-router-dom";
import siteLogo from "../../assets/bizmunch-icon-grey.png";

function SideBar() {
  return (
    <div className="drawer drawer-open  w-[231px] ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side shadow-lg ">
        <ul className="menu p-4 w-[231px] min-h-full text-base-content bg-[#FFFFFF]">
          <a
            href="/admin/main"
            className="text-[#F58549] cursor-pointer text-4xl font-semibold text-center m-2 mb-10 "
          >
            <Link to="/">
              <img src={siteLogo} alt="Website Logo" />
            </Link>
          </a>
          <div className="flex flex-col gap-6 px-4 font-medium">
            <NavLink
              to={"/employee/Dashboard"}
              className={({ isActive }) =>
                ` ${isActive ? "text-[#F58549]" : " text-[#C5C5C5]"}`
              }
            >
              <BusinessCenterOutlined /> Dashboard
            </NavLink>
            <NavLink
              to={"/employee/Notifications"}
              className={({ isActive }) =>
                ` ${isActive ? "text-[#F58549]" : " text-[#C5C5C5]"}`
              }
            >
              <MailOutline /> Notifications
            </NavLink>

            <NavLink
              to={"/employee/Settings"}
              className={({ isActive }) =>
                ` ${isActive ? "text-[#F58549]" : " text-[#C5C5C5]"}`
              }
            >
              <SettingsOutlined /> Settings
            </NavLink>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
