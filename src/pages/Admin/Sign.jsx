import { useState } from "react";
import { login } from "../../services/api";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import siteLogo from "../../assets/bizmunch-icon-grey.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { set_user } from "../../redux/states/user";

function AdminSignin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handlesubmit() {
    try {
      setloading(true);
      const response = await login(email, password);
      setloading(false);
      if (response.status === 200) {
        const token = response.accessToken;
        const role = response.updateUser.status;
        if (role !== "admin") {
          return toast.error("User Not Registered as Admin");
        }
        sessionStorage.setItem("Token", token);
        sessionStorage.setItem("Admin", true);
        console.log("Dispatching user data:", { email, role: response.updateUser.status, token: response.accessToken });
        dispatch(set_user({
          email: email,
          name: response.updateUser.name,
          companyId: response.updateUser.companyId,
          role: response.updateUser.status,
          token: response.accessToken,
        }));
        window.location.href = "/admin/companies";
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="bg-[#FCDFCF] w-full h-screen flex flex-col items-center justify-center">
      <Toaster />
      <div className="bg-white rounded-md shadow-md max-w-[778px] max-h-[750px] h-[70%] flex w-[80%] items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          <div className="cursor-pointer hover:cursor-pointer">
            <img 
              src={siteLogo} 
              alt="Website Logo" 
              style={{ marginTop: '-70px', marginBottom: '-20px', maxWidth: '180px', alignSelf: 'center' }} 
              onClick={() => navigate('/home')} 
            />
          </div>
          <h1 className="text-2xl font-semibold">Login to Admin Dashboard</h1>
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
            </div>
            <input
              disabled={loading}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              className="w-full border rounded-md p-2 focus:outline-sky-200"
            />
            <a href="/passwordreset" className="text-[#F58549]">
              Forgot Password?
            </a>
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
              {/* <span className="text-[#98A2B3]">Are you a Company Staff?</span>{" "} */}
              <a href="/manager/signin" className="text-[#F58549]">
                Sign in Manager
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignin;
