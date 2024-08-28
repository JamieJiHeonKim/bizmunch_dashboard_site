import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import INPUT from "../../components/input";
import { login } from "../../services/api";
import { Toaster } from "react-hot-toast";
import siteLogo from "../../assets/bizmunch-icon-grey.png";

function Signin() {
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
        if (role !== "employee") {
          return toast.error("User Not Registered as an Employee");
        }

        sessionStorage.setItem("Token", token);
        sessionStorage.setItem("Employee", true);
        sessionStorage.setItem("companyid", response.companyDetails._id);
        sessionStorage.setItem("company", response.companyDetails.name);
        sessionStorage.setItem("user_name", response.updateUser.name);
        sessionStorage.setItem("user_id", response.updateUser._id);
        sessionStorage.setItem("email", response.updateUser.email);
        sessionStorage.setItem("phone", response.updateUser.phone || "#");
        sessionStorage.setItem("password", "####");

        window.location.href = "/employee/dashboard";
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
      <div className="bg-white rounded-md shadow-md max-w-[778px] max-h-[750px] h-[70%] flex w-[80%] items-center justify-center">
        <div className=" flex flex-col gap-6 items-center">
          <img src={siteLogo} alt="Website Logo" style={{ marginTop: '-70px', marginBottom: '-20px', maxWidth: '240px', alignSelf: 'center' }} />
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Login to your account</h1>
          </div>
          <div className="w-[396px] ">
            <INPUT
              n={"Email"}
              l={loading}
              v={email}
              f={setemail}
              t="email"
              p="Enter Your email"
            />{" "}
            <INPUT
              n={"Password"}
              l={loading}
              v={password}
              f={setpassword}
              t="password"
              p="Enter Your Password"
            />
            <a href="/passwordreset" className="text-[#F58549]">
              Forgot Password?
            </a>
          </div>
          <button
            onClick={handlesubmit}
            disabled={!email || !password || loading}
            className="btn text-white bg-[#F58549] w-full"
          >
            Login Now
          </button>
          <div className="flex flex-col gap-2 items-center">
            <p>
              <span className="text-[#98A2B3]">Don't have an account?</span>{" "}
              <a href="/employee/signup" className=" text-[#F58549]">
                Sign up
              </a>
            </p>
            <p>
              <span className="text-[#98A2B3]">Are you an Admin?</span>{" "}
              <a href="/" className="text-[#F58549]">
                Sign in as Admin
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
