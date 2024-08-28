import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PasswordReset() {
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
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

          <button
            onClick={handlesubmit}
            disabled={!email || loading}
            className="btn text-white bg-[#F58549] w-full"
          >
            Send Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
