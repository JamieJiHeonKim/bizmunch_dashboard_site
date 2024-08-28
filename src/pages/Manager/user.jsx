import {
  Add,
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ManagerLayout from "../../layout/Manager";
import { Manager_Get_All_Employees } from "../../services/api";
import VIEW_USER from "../../components/modals/admin/View_User";
import EDIT_USER from "../../components/modals/manager/Edit_User";
import DELETE_EMPLOYEE from "../../components/modals/manager/Delete_User";
import ProfileButton from "../../components/Profile_Btn";

function ManagerUsers() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState({});

  async function fetchdata() {
    try {
      setLoading(true);
      const res = await Manager_Get_All_Employees();
      setusers(res.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <ManagerLayout>
      <VIEW_USER user={user} />
      <EDIT_USER user={user} refresh={fetchdata} />
      <DELETE_EMPLOYEE user={user} refresh={fetchdata} />

      <div>
        <div className="flex justify-end">
          <ProfileButton name="Manager" redir="/manager/signin" />
        </div>

        <div className="flex justify-between my-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-[#F58549] text-2xl font-medium ">Users</h1>

            {loading && (
              <span className="loading loading-spinner loading-sm text-[#F58549]"></span>
            )}
          </div>
        </div>

        <div>
          <Header />
          {users.map((item, index) => (
            <Item
              key={index}
              username={item.name}
              companyname={item?.companyDetails?.name}
              userrole={item.status}
              useremail={item.email}
              password={item.password}
              set={() => setuser(item)}
            />
          ))}
        </div>
      </div>
    </ManagerLayout>
  );
}

function Header() {
  return (
    <div className="grid grid-cols-4 bg-[#FDECE2] text-[#667085] px-4 p-2 font-medium text-xs">
      <h1>User Name</h1>
      <h1>User Email</h1>
      <h1>Password</h1>
      <h1>Actions</h1>
    </div>
  );
}

function Item(props) {
  return (
    <div
      onClick={() => {
        props.set();
      }}
      className="grid grid-cols-4 border-b text-[#667085] px-4 p-2 font-medium text-xs"
    >
      <h1 className=" text-[#101828]">{props.username}</h1>
      <h1>{props.useremail}</h1>
      <input
        value={props.password}
        type="password"
        disabled
        className="disabled:bg-white text-ellipsis w-[60%]"
      ></input>

      <div className="text-xs text-[#F58549] flex gap-4">
        <button
          className="outline-none"
          onClick={() => document.getElementById("View_User").showModal()}
        >
          <VisibilityOutlined style={{ fontSize: "20px" }} />
        </button>{" "}
        <button
          className="outline-none"
          onClick={() => document.getElementById("Edit_User").showModal()}
        >
          <EditOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          className="outline-none"
          onClick={() => document.getElementById("Delete_Manager").showModal()}
        >
          <DeleteOutline style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
}

export default ManagerUsers;
