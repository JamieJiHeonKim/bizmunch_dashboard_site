import { useEffect, useState, useRef } from "react";
import MODAL_HEADER from "../../Modal_Header";
import { Admin_Edit_Restaurant, get_image } from "../../../services/api";
import toast from "react-hot-toast";

function EDIT_RESTAURANT(props) {
  console.log("edit restaurant props:", props);
  const [restaurant, setRestaurant] = useState({
    name: "",
    managerName: "",
    managerEmail: "",
    location: "",
    category: ""
  });
  const [imageUrl, setImageUrl] = useState('');
  const [barcodeUrl, setBarcodeUrl] = useState('');
  const [fileLogo, setFileLogo] = useState(null);
  const [fileBarcode, setFileBarcode] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputLogoRef = useRef();
  const fileInputBarcodeRef = useRef();
  const categories = ['Diner', 'Sandwich', 'Pizza', 'Asian', 'Vegie', 'Café', 'Spicy', 'Drink'];

  useEffect(() => {
    if (props.restaurant) {
      setRestaurant(prev => ({
        ...prev,
        name: props.restaurant.name || "",
        managerName: props.restaurant.managerName || "",
        managerEmail: props.restaurant.managerEmail || "",
        location: props.restaurant.location || "",
        category: props.restaurant.category || ""
      }));

      setImageUrl('');
      setBarcodeUrl('');

      if (props.restaurant.logo) {
        get_image(props.restaurant.logo)
          .then(setImageUrl)
          .catch(() => setImageUrl("/path/to/default/or/error/image.png"));
      }

      if (props.restaurant.barcode) {
        get_image(props.restaurant.barcode)
          .then(setBarcodeUrl)
          .catch(() => setBarcodeUrl("/path/to/default/or/error/image.png"));
      }
    }
  }, [props.restaurant]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(restaurant).forEach(key => {
        if (key !== "logo" && key !== "barcode") formData.append(key, restaurant[key]);
      });
      if (fileLogo) formData.append('logo', fileLogo);
      if (fileBarcode) formData.append('barcode', fileBarcode);

      const res = await Admin_Edit_Restaurant(props.restaurant._id, formData);
      if (res.status === 200) {
        toast.success("Restaurant Updated Successfully");
        props.refresh();
        document.getElementById("Edit_Restaurant").close();
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="Edit_Restaurant" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading="Restaurant Info" />
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <h1>Restaurant Name</h1>
            <input
              disabled={loading}
              value={restaurant.name}
              onChange={(e) => setRestaurant(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Restaurant Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Location</h1>
            <input
              disabled={loading}
              value={restaurant.location}
              onChange={(e) => setRestaurant(prev => ({ ...prev, location: e.target.value }))}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Address"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Manager Name</h1>
            <input
              disabled={loading}
              value={restaurant.managerName}
              onChange={(e) => setRestaurant(prev => ({ ...prev, managerName: e.target.value }))}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Manager Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Manager Email</h1>
            <input
              disabled={loading}
              value={restaurant.managerEmail}
              onChange={(e) => setRestaurant(prev => ({ ...prev, managerEmail: e.target.value }))}
              type="email"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Manager Email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Category</h1>
            <select
              disabled={loading}
              value={restaurant.category}
              onChange={(e) => setRestaurant(prev => ({ ...prev, category: e.target.value }))}
              className="w-full border rounded-md p-2 outline-sky-200"
            >
              <option value="" disabled>Please select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Logo</h1>
            <input
              type="file"
              ref={fileInputLogoRef}
              onChange={(e) => setFileLogo(e.target.files[0])}
              className="w-full border rounded-md p-2 outline-sky-200"
            />
            {imageUrl && <img src={imageUrl} alt="Restaurant Logo" className="mt-4" />}
          </div>

          <div className="flex flex-col gap-2">
            <h1>Barcode</h1>
            <input
              type="file"
              ref={fileInputBarcodeRef}
              onChange={(e) => setFileBarcode(e.target.files[0])}
              className="w-full border rounded-md p-2 outline-sky-200"
            />
            {barcodeUrl && <img src={barcodeUrl} alt="Restaurant Barcode" className="mt-4" />}
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="btn text-white bg-[#F58549]"
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EDIT_RESTAURANT;
