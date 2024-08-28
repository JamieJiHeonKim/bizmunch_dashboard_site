import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import INPUT from "../../components/input";
function PasswordChange() {
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handlesubmit() {}

  return (
    <div className="bg-[#FCDFCF] w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow-md max-w-[778px] max-h-[750px] h-[60%] flex w-[80%] items-center justify-center">
        <div className=" flex flex-col gap-6 items-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Please enter your email</h1>
            <h1 className="text-[#98A2B3]">
              We will send you a password reset link
            </h1>
          </div>
          <div className="w-[396px] ">
            <INPUT
              n={"New Password"}
              l={loading}
              v={password}
              f={setpassword}
              t="password"
              p="Enter Your Password"
            />{" "}
            <INPUT
              n={"Confirm Password"}
              l={loading}
              v={password}
              f={setpassword}
              t="password"
              p="Enter Your Password"
            />
          </div>
          <button
            onClick={handlesubmit}
            disabled={!email || loading}
            className="btn text-white bg-[#F58549] w-full"
          >
            Send Link
          </button>
          <div className="flex flex-col gap-2 items-center">
            <p>
              <span className="text-[#98A2B3]">Don't have an account?</span>{" "}
              <span className=" text-[#F58549]">Sign up</span>
            </p>
            <p>
              <span className="text-[#98A2B3]">Already have an account?</span>{" "}
              <span className=" text-[#F58549]">Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
