import { useState } from "react";
import MODAL_HEADER from "../../Modal_Header";
import INPUT from "../../input";
import toast from "react-hot-toast";
import { Update_Password } from "../../../services/api";

function EditPassword() {
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [loading, setloading] = useState(false);

  async function handlepost() {
    try {
      setloading(true);
      const data = { newPassword: password };
      const res = await Update_Password(data);
      if (res.status === 200) {
        toast.success("Password updated successfully");
        setpassword("");
        setpassword2("");
        document.getElementById("Edit Password").close();
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <dialog className="modal" id="Edit Password">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={"Change Password"} />
        <div className="flex gap-2 flex-col my-4">
          <INPUT
            n="New Password"
            p="Enter New Password"
            v={password}
            f={setpassword}
            t={"password"}
            l={loading}
          />
          <INPUT
            n="Confirm Password"
            p="Confirm New Password"
            v={password2}
            f={setpassword2}
            t={"password"}
            l={loading}
          />
        </div>
        <button
          onClick={handlepost}
          disabled={
            loading || !password || !password2 || password !== password2
          }
          className="btn text-white bg-[#F58549] w-full"
        >
          Confirm
        </button>
      </div>
    </dialog>
  );
}

export default EditPassword;
