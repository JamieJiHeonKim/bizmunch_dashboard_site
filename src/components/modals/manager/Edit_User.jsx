import { useState } from "react";
import MODAL_HEADER from "../../Modal_Header";
import INPUT from "../../input";
import toast from "react-hot-toast";
import { Manager_Edit_User } from "../../../services/api";

function Edit_USER(props) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [loading, setlaoding] = useState(false);

  async function handlepost() {
    try {
      setlaoding(true);
      const data = { email, name };
      const res = await Manager_Edit_User(data, props.user._id);

      if (res.status === 200) {
        document.getElementById("Edit_User").close();
        toast.success("User Updated Successfully");
        props.refresh();
        setemail("");
        setname("");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setlaoding(false);
    }
  }

  return (
    <dialog id="Edit_User" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={"Edit User info"} />
        <div className="grid gap-2 py-6">
          <INPUT
            n={"User Name"}
            p={props.user.name}
            v={name}
            f={setname}
            l={loading}
          />
          <INPUT
            n={"Email"}
            p={props.user.email}
            v={email}
            f={setemail}
            l={loading}
          />

          <button
            onClick={handlepost}
            disabled={loading || name === "" || email === ""}
            className="btn text-white bg-[#F58549]"
          >
            Update Info
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Edit_USER;
