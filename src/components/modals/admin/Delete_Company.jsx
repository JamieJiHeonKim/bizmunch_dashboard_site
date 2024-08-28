import { useState } from "react";
import MODAL_HEADER from "../../Modal_Header";
import { Admin_Delete_Company } from "../../../services/api";
import toast from "react-hot-toast";

function DELETE_COMPANY(props) {
  const [loading, setlaoding] = useState(false);

  async function handlepost() {
    try {
      setlaoding(true);
      const res = await Admin_Delete_Company(props.company._id);
      if (res.status === 200) {
        toast.success("Company deleted successfully");
        document.getElementById("Delete_Company").close();
        props.refresh();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setlaoding(false);
    }
  }

  return (
    <dialog id="Delete_Company" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={`Delete '${props.company.name}'`} />
        <h1 className="text-[#ADB1B2] text-xl font-medium my-10        ">
          Are you sure, you want to delete this company?{" "}
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={loading}
            onClick={() => {
              handlepost();
            }}
            className="btn btn-error text-white"
          >
            Delete
          </button>
          <button
            disabled={loading}
            onClick={() => {
              document.getElementById("Delete_Company").close();
            }}
            className="btn "
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DELETE_COMPANY;
