import { useState } from "react";
import { login } from "../../services/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { set_user } from "../../redux/states/user";
import { Toaster } from "react-hot-toast";

function MANAGERSIGNIN() {
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handlesubmit() {
    try {
      setloading(true);
      const response = await login(email, password);
      setloading(false);
      if (response.status === 200) {
        const token = response.accessToken;
        const role = response.updateUser.status;
        if (role !== "manager") {
          return toast.error("User Not Registered as Manager");
        }
        sessionStorage.setItem("Token", token);
        sessionStorage.setItem("Manager", true);
        sessionStorage.setItem("companyid", response.companyDetails._id);
        sessionStorage.setItem("company", response.companyDetails.name);
        sessionStorage.setItem("user_name", response.updateUser.name);
        sessionStorage.setItem("user_id", response.updateUser._id);
        sessionStorage.setItem("email", response.updateUser.email);
        sessionStorage.setItem("phone", response.updateUser.phone || "#");
        sessionStorage.setItem("password", "####");

        dispatch(
          set_user({
            user_name: response.updateUser.name,
            user_id: response.updateUser._id,
            email: response.updateUser.email || "#",
            phone: response.updateUser.phone || "#",
            password: "####",
            company_name: response.companyDetails.name,
            company_id: response.companyDetails._id,
          })
        );
        window.location.href = "/manager/dashboard";
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="bg-[#FCDFCF] w-full h-screen flex items-center justify-center">
      <Toaster />
      <pre className="bg-white rounded-md shadow-md fixed top-0 left-0">
        {JSON.stringify(user, null, 2)}
      </pre>
      <div className="bg-white rounded-md shadow-md max-w-[778px] max-h-[750px] h-[60%] flex w-[80%] items-center justify-center">
        <div className=" flex flex-col gap-6 items-center">
          <h1 className="text-2xl font-semibold">Login to your Account</h1>
          <div className="max-w-[396px] w-full flex  flex-col gap-3">
            <h1>Email: </h1>
            <input
              disabled={loading}
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              className="w-full border rounded-md p-2 focus:outline-sky-200"
            />
          </div>
          <div className="w-[396px] flex  flex-col gap-3">
            <div className="flex justify-between">
              <h1>Password</h1>
              <a href="/passwordreset" className="text-[#F58549]">
                Forgot?
              </a>
            </div>
            <input
              disabled={loading}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              className="w-full border rounded-md p-2 focus:outline-sky-200"
            />
          </div>
          <button
            onClick={() => [handlesubmit()]}
            disabled={!password || !email || password === "" || loading}
            className="btn text-white bg-[#F58549] w-full"
          >
            Login now
          </button>
          <div className="flex flex-col gap-2 items-center">
            <p>
              <span className="text-[#98A2B3]">Are you an Employee</span>{" "}
              <a href="/employee/signin" className=" text-[#F58549]">
                Sign in as Employee
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MANAGERSIGNIN;
