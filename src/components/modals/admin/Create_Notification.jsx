import { useEffect, useState } from "react";
import MODAL_HEADER from "../../Modal_Header";
import {
  Admin_Create_Notification,
  Admin_Get_Companies,
} from "../../../services/api";
import toast from "react-hot-toast";

function CREATE_NOTIFICATION(props) {
  const [loading, setloading] = useState(false);
  const [companies, setcompanies] = useState([]);
  const [company, setcompany] = useState("");
  const [text, settext] = useState("");

  async function fetchcompanies() {
    try {
      setloading(true);
      const res = await Admin_Get_Companies();
      setcompanies(res);
    } catch (err) {
    } finally {
      setloading(false);
    }
  }

  async function handlepost() {
    try {
      setloading(true);
      const res = await Admin_Create_Notification({ company, text });
      if (res.status === 201) {
        document.getElementById("create notification").close();
        toast.success("Notification created successfully");
        setcompany("");
        settext("");
        props.refresh();
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchcompanies();
  }, []);
  return (
    <dialog id="create notification" className="modal">
      <div className="p-12 modal-box">
        <MODAL_HEADER heading="New Notification" />
        <div className="grid gap-2 my-4">
          <div className="grid">
            <h1>Comapny Name</h1>
            <select
              value={company}
              onChange={(e) => {
                setcompany(e.target.value);
              }}
              disabled={loading}
              className="p-2 border rounded-md my-2 outline-sky-200"
            >
              <option
                value
                onChange={(e) => {
                  setcompany(e.target.value);
                }}
              >
                none
              </option>
              {companies.map((company, index) => (
                <option key={index} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid">
            <h1>Notifiction Message</h1>
            <textarea
              onChange={(e) => {
                settext(e.target.value);
              }}
              placeholder="Write your notification message here"
              className="rounded-md border outline-sky-200 p-2 my-2 h-[150px] min-h-[150px] max-h-[150px]"
            />
          </div>
          <button
            onClick={() => {
              handlepost();
            }}
            disabled={text === "" || loading || company === ""}
            className="btn bg-[#F58549] text-white"
          >
            POST
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CREATE_NOTIFICATION;
