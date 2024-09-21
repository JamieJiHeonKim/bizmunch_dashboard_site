import React, { useState, useCallback } from 'react';
import MODAL_HEADER from '../../Modal_Header';
import { Admin_Create_Menu } from '../../../services/api';
import toast from 'react-hot-toast';

function CREATE_MENU({ restaurant }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [calories, setCalories] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState(null);
  const [discount, setDiscount] = useState(false);
  const [image, setImage] = useState(null);

  const types = ['Starters', 'Mains', 'Desserts', 'Drinks'];
  const discounts = [true, false];

  const handlePost = useCallback(async (event) => {
    event.preventDefault();

    if (discount && !barcode) {
      toast.error('Please upload a barcode as discount is selected.');
      return;
    }

    const formData = new FormData();
    formData.append('restaurantName', restaurant.name);
    formData.append('restaurantId', restaurant._id);
    formData.append('type', type);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('calories', calories);
    formData.append('description', description);
    formData.append('discount', discount);

    if (barcode) {
      formData.append('barcode', barcode);
    }

    if (image) {
      formData.append('image', image);
    }

    setLoading(true);
    try {
      const response = await Admin_Create_Menu(formData);
      if (response) {
        document.getElementById('Create_Menu').close();
        toast.success('Menu Created Successfully');
      } else {
        toast.error('Failed to create menu.');
      }
    } catch (error) {
      console.error('Error occurred during menu creation:', error);
      toast.error('Network or server error');
    } finally {
      setLoading(false);
    }
  }, [restaurant.name, restaurant._id, name, type, price, calories, description, discount, barcode, image]);

  return (
    <dialog id="Create_Menu" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading="Menu Info" />
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <h1>Menu Name</h1>
            <input
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Menu Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Type of Menu</h1>
            <select
              disabled={loading}
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-md p-2 outline-sky-200"
            >
              <option value="" disabled>Please select a type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Price</h1>
            <input
              disabled={loading}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Price"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Calories</h1>
            <input
              disabled={loading}
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Calories"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Description</h1>
            <textarea
              disabled={loading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Description"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Discount Status</h1>
            <select
              disabled={loading}
              value={discount}
              onChange={(e) => setDiscount(e.target.value === 'true')}
              className="w-full border rounded-md p-2 outline-sky-200"
            >
              <option value="" disabled>Please select discount status</option>
              {discounts.map((cat) => (
                <option key={cat} value={cat}>
                  {cat ? 'Yes' : 'No'}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Menu Discount Barcode</h1>
            <input
              type="file"
              name="barcode"
              onChange={(e) => setBarcode(e.target.files[0])}
              className="w-full border rounded-md p-2 file:bg-violet-50 file:border-none"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Menu Image</h1>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-md p-2 file:bg-violet-50 file:border-none"
              accept="image/png, image/jpeg"
            />
          </div>

          <button
            onClick={handlePost}
            disabled={loading || !name || !price || !calories || !description}
            className="btn text-white bg-[#F58549]"
          >
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CREATE_MENU;