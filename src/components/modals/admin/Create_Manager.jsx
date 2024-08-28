import { useEffect, useState } from "react";
import MODAL_HEADER from "../../Modal_Header";
import {
  Admin_Create_Manager,
  Admin_Get_Companies,
} from "../../../services/api";
import INPUT from "../../input";
import toast from "react-hot-toast";

function CREATE_MANAGER(props) {
  const [loading, setloading] = useState(false);
  const [companies, setcompanies] = useState([]);

  const [pwd, setpwd] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [company, setcompany] = useState("");

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
      const res = await Admin_Create_Manager({
        email: email,
        name: name,
        password: pwd,
        companyId: company,
      });
      if (res.status === 201) {
        document.getElementById("Create_Manager").close();
        toast.success("Manager created successfully");
        props.refresh();
        setemail("");
        setpwd("");
        setname("");
        setcompany("");
      }
    } catch (e) {
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchcompanies();
  }, []);

  return (
    <dialog id="Create_Manager" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading="Adding New Manager" />
        <div className="my-6 grid gap-4">
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
              <option value>none</option>
              {companies.map((company, index) => (
                <option key={index} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <INPUT
            p="Enter Manager Name"
            n="Manager Name"
            t="text"
            l={loading}
            v={name}
            f={setname}
          />

          <INPUT
            p="Enter Email Address"
            n="Email"
            t="email"
            l={loading}
            v={email}
            f={setemail}
          />
          <INPUT
            p="Enter Password"
            n="Password"
            t="password"
            l={loading}
            v={pwd}
            f={setpwd}
          />

          <button
            onClick={() => {
              handlepost();
            }}
            disabled={
              loading ||
              pwd === "" ||
              !pwd ||
              email === "" ||
              !email ||
              name === "" ||
              !name
            }
            className="btn text-white bg-[#F58549]"
          >
            Add Manager
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CREATE_MANAGER;
