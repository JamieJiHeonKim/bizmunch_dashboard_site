import React, { useState, useEffect, useRef } from 'react';
import MODAL_HEADER from '../../Modal_Header';
import { Admin_Edit_Menu, get_image } from '../../../services/api';
import toast from 'react-hot-toast';

function EDIT_MENU({ menu, restaurantDetails, refresh }) {
  console.log('menu.restaurantId:', menu.restaurantId);
  console.log('menu._id:', menu._id);
  console.log('restaurantDetails._id:', restaurantDetails._id);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [calories, setCalories] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState(null);
  const [discount, setDiscount] = useState(false);
  const fileInputBarcodeRef = useRef();
  const types = ['Starters', 'Mains', 'Desserts', 'Drinks'];
  const discounts = [true, false];
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (menu) {
      setName(menu.name || '');
      setType(menu.type || '');
      setPrice(menu.price || '');
      setCalories(menu.calories || '');
      setDescription(menu.description || '');
      setBarcode(menu.barcode || null);
      setDiscount(menu.discount || false);
      setImageUrl('');

      if (menu.barcode) {
        get_image(menu.barcode)
          .then(setImageUrl)
          .catch(() => console.log('there is no barcode iamge.'))
      }
    }
  }, [menu]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('calories', calories);
      formData.append('description', description);
      formData.append('barcode', barcode);
      formData.append('discount', discount);

      const response = await Admin_Edit_Menu(restaurantDetails._id, restaurantDetails._id, formData);
      if (response) {
        document.getElementById('Edit_Menu').close();
        toast.success('Menu Item Updated Successfully');
        refresh();
      } else {
        toast.error('Updating the Menu Item Failed.');
      }
    } catch (error) {
      console.error('Network or server error', error);
      toast.error('Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="Edit_Menu" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading="Edit Menu Item" />
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
            <input
              disabled={loading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
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
              ref={fileInputBarcodeRef}
              onChange={(e) => setBarcode(e.target.files[0])}
              className="w-full border rounded-md p-2 outline-sky-200"
            />
            {imageUrl && <img src={imageUrl} alt="Restaurant Logo" className="mt-4" />}
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading || !name || !price || !calories || !description}
            className="btn text-white bg-[#F58549]"
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EDIT_MENU;