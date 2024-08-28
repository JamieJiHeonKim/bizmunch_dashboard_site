import {
  Add,
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import AdminLayout from "../../layout/Admin";
import { useEffect, useState } from "react";
import CREATE_MANAGER from "../../components/modals/admin/Create_Manager";
import DELETE_MANAGER from "../../components/modals/admin/Delete_User";
import VIEW_USER from "../../components/modals/admin/View_User";
import EDIT_USER from "../../components/modals/admin/Edit_User";
import { Admin_Get_Users } from "../../services/api";
import toast from "react-hot-toast";
import ProfileButton from "../../components/Profile_Btn";

function Users() {
  const [users, setusers] = useState([]);
  const [filtered, setfiltered] = useState([]);
  const [filter, setfilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState({});

  async function fetchdata() {
    try {
      setLoading(true);
      const res = await Admin_Get_Users();
      setLoading(false);
      setusers(res.data);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      return setfiltered(users);
    }
    setfiltered(users.filter((user) => user.status === filter));
  }, [users, filter]);

  return (
    <AdminLayout>
      <CREATE_MANAGER refresh={fetchdata} />
      <DELETE_MANAGER manager={user} />
      <VIEW_USER user={user} />
      <EDIT_USER user={user} refresh={fetchdata} />
      <div>
        <div className="flex justify-end">
          <ProfileButton name="Admin" redir="/admin/signin" />
        </div>

        <div className="flex justify-between my-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-[#F58549] text-2xl font-medium ">Users</h1>

            {loading && (
              <span className="loading loading-spinner loading-sm text-[#F58549]"></span>
            )}
          </div>
          <div className=" flex gap-8">
            <select
              value={filter}
              onChange={(e) => {
                setfilter(e.target.value);
              }}
              className="border-[#D9D9D9] border rounded-md w-[135px]  p-2  font-medium outline-none"
            >
              <option value={"all"}>All</option>
              <option value={"manager"}>Managers</option>
              <option value={"employee"}>Employees</option>
            </select>
            <button
              onClick={() => {
                document.getElementById("Create_Manager").showModal();
              }}
              className="btn text-white bg-[#F58549] "
            >
              <Add /> Add Manager
            </button>
          </div>
        </div>

        <div>
          <Header />
          {filtered.map((item, index) => (
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
    </AdminLayout>
  );
}

export default Users;

function Header() {
  return (
    <div className="grid grid-cols-6 bg-[#FDECE2] text-[#667085] px-4 p-2 font-medium text-xs">
      <h1>User Name</h1>
      <h1>Company Name</h1>
      <h1>User Role</h1>
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
      className="grid grid-cols-6 border-b text-[#667085] px-4 p-2 font-medium text-xs"
    >
      <h1 className=" text-[#101828]">{props.username}</h1>
      <h1>{props.companyname}</h1>
      <h1>{props.userrole}</h1>
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
