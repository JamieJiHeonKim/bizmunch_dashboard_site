import { ArrowDropDown, PowerOff } from "@mui/icons-material";
import { LOGOUT } from "../services/function";

function ProfileButton(props) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex justify-between items-center border-[#D9D9D9] border rounded-md w-[135px] p-2 text-[#F58549] font-medium outline-none"
      >
        <h1>{props.name}</h1>
        <ArrowDropDown />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <buttton
            onClick={() => {
              LOGOUT(props.redir);
            }}
            className="btn text-white bg-red-500 font-medium flex  justify-between items-center"
          >
            <h1>LOGOUT</h1>
            <PowerOff />
          </buttton>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
