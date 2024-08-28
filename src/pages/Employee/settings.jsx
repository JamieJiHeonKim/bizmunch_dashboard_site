import {
  CancelOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import ManagerLayout from "../../layout/Manager";
import INPUT from "../../components/input";
import { useEffect, useState } from "react";
import { Update_Profile } from "../../services/api";
import toast from "react-hot-toast";
import EditPassword from "../../components/modals/manager/Edit_Password";
import ProfileButton from "../../components/Profile_Btn";
import EmployeeLayout from "../../layout/Employee";

function ManagerSettings() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [edit, setedit] = useState(false);

  useEffect(() => {
    setname(sessionStorage.getItem("user_name"));
    setemail(sessionStorage.getItem("email"));
    setphone(sessionStorage.getItem("phone"));
    setpassword(sessionStorage.getItem("password"));
  }, []);

  async function handlepost() {
    try {
      setloading(true);
      const data = { email, name, phone };
      const res = await Update_Profile(data);
      if (res.status === 200) {
        toast.success("Profile Updated Successfully");
        sessionStorage.setItem("user_name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("phone", phone);
        setedit(false);
      }
    } catch (e) {
      toast.success(e.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <EmployeeLayout>
      <EditPassword />
      <div>
        <div className="flex justify-end">
          <ProfileButton name="Employee" redir="/employee/signin" />
        </div>
        <div className="w-[380px]">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-[#F58549] text-2xl font-medium my-4 items-center justify-center flex gap-2">
                Settings
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </h1>
              {!edit ? (
                <button
                  disabled={loading}
                  onClick={() => {
                    setedit(true);
                  }}
                  className="btn btn-sm bg-white"
                >
                  <EditOutlined style={{ fontSize: "16px" }} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    disabled={loading}
                    onClick={() => {
                      setedit(false);
                      handlepost();
                    }}
                    className="btn btn-sm bg-white"
                  >
                    <SaveOutlined /> Save
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => {
                      setedit(false);
                    }}
                    className="btn btn-sm bg-white"
                  >
                    <CancelOutlined /> Cancle
                  </button>
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-col gap-2 my-4 m-2">
                <INPUT n="Name" v={name} f={setname} l={!edit || loading} />
                <INPUT
                  n="Phone Number"
                  v={phone}
                  f={setphone}
                  l={!edit || loading}
                />
                <INPUT n="Email" v={email} l={true} />
                <div>
                  <INPUT n="Password" v="asdsadsa" t="password" l={true} />
                  <h1
                    onClick={() => {
                      document.getElementById("Edit Password").showModal();
                    }}
                    className="text-[#F58549] cursor-pointer text-end"
                  >
                    Change password
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default ManagerSettings;
