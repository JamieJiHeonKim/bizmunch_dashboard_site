import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import INPUT from "../../components/input";
import CompanyPicker from "../../components/Company_Picker";
import { Register_User } from "../../services/api";

function Signup() {
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [company, setcompany] = useState("");

  async function handlesubmit() {
    try {
      setloading(true);

      const Data = {
        email: email,
        password: password,
        name: name,
        companyId: company,
        status: "employee",
      };
      const res = await Register_User(Data);
      if (res.status === 200) {
        toast.success("User Created Successfully");
        window.location.href = "/employee/signin";
      } else if (res.status === 400) {
        toast.error("Cannot Register User");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setloading(false);
    }
  }
  return (
    <div className="bg-[#FCDFCF] w-full h-screen flex items-center justify-center">
      <Toaster />
      <div className="bg-white rounded-md shadow-md max-w-[778px] max-h-[750px] h-[60%] flex w-[80%] items-center justify-center">
        <div className=" flex flex-col gap-6 items-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Sign up new employee</h1>
          </div>
          <div className="w-[396px] ">
            <CompanyPicker set={setcompany} company={company} />
            <INPUT
              n={"Email"}
              l={loading}
              v={email}
              f={setemail}
              t="email"
              p="Enter Your email"
            />
            <INPUT
              n={"Name"}
              l={loading}
              v={name}
              f={setname}
              t="text"
              p="Enter Your name"
            />
            <INPUT
              n={"Password"}
              l={loading}
              v={password}
              f={setpassword}
              t="password"
              p="Enter Your Password"
            />
          </div>
          <button
            onClick={handlesubmit}
            disabled={!email || loading || !name || !password || !company}
            className="btn text-white bg-[#F58549] w-full"
          >
            Sign up
          </button>
          <div className="flex flex-col gap-2 items-center">
            <p>
              <span className="text-[#98A2B3]">Already have an account?</span>{" "}
              <a href="/employee/signin" className=" text-[#F58549]">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
