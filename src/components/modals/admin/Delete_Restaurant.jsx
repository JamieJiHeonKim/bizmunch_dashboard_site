import { useState } from "react";
import MODAL_HEADER from "../../Modal_Header";
import { Admin_Delete_Restaurant } from "../../../services/api";
import toast from "react-hot-toast";

function DELETE_RESTAURANT(props) {
  const [loading, setLoading] = useState(false);

  async function handlepost() {
    try {
      setLoading(true);
      const res = await Admin_Delete_Restaurant(props.restaurant._id);
      if (res.status === 200) {
        toast.success("Restaurant deleted successfully");
        document.getElementById("Delete_Restaurant").close();
        props.refresh();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog id="Delete_Restaurant" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={`Delete '${props.restaurant.name}'`} />
        <h1 className="text-[#ADB1B2] text-xl font-medium my-10        ">
          Are you sure, you want to delete this restaurant?{" "}
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
              document.getElementById("Delete_Restaurant").close();
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

export default DELETE_RESTAURANT;
