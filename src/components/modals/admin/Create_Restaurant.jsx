import React, { useState, useCallback } from 'react';
import MODAL_HEADER from '../../Modal_Header';
import { Admin_Create_Restaurant } from '../../../services/api';
import toast from 'react-hot-toast';

function CREATE_RESTAURANT({ refresh }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [category, setCategory] = useState('');
  const [logo, setLogo] = useState(null);
  const [barcode, setBarcode] = useState(null);

  const resetForm = () => {
    setName('');
    setLocation('');
    setManagerName('');
    setManagerEmail('');
    setCategory('');
    setLogo(null);
    setBarcode(null);
  };

  const handlePost = useCallback(async () => {
    if (!logo) {
      toast.error('Please upload a logo.');
      return;
    }
    if (!barcode) {
      toast.error('Please upload a coupon barcode.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('managerName', managerName);
    formData.append('managerEmail', managerEmail);
    formData.append('category', category);
    formData.append('logo', logo);
    formData.append('barcode', barcode);

    setLoading(true);
    try {
      const response = await Admin_Create_Restaurant(formData);
      if (response) {
        document.getElementById('Create_Restaurant').close();
        toast.success('Restaurant Created Successfully');
        refresh();
        resetForm();
      } else {
        toast.error('Creating a Restaurant Failed.');
      }
    } catch (error) {
      console.error('Network or server error', error);
      toast.error('Network or server error');
    } finally {
      setLoading(false);
    }
  }, [name, location, managerName, managerEmail, category, logo, barcode, refresh]);

  function handleLogoChange(event) {
    setLogo(event.target.files[0]);
  }

  function handleBarcodeChange(event) {
    setBarcode(event.target.files[0]);
  }

  const categories = ['Asian', 'Fastfood', 'Café', 'Grill', 'Vegetarian', 'Spicy', 'American', 'Pizza', 'Dessert'];

  return (
    <dialog id="Create_Restaurant" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading="Restaurant Info" />
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <h1>Restaurant Name</h1>
            <input
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Restaurant Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Location</h1>
            <input
              disabled={loading}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Address"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Manager Name</h1>
            <input
              disabled={loading}
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Manager Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Manager Email</h1>
            <input
              disabled={loading}
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)}
              type="email"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Manager Email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Category</h1>
            <select
              disabled={loading}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md p-2 outline-sky-200"
            >
              <option value="" disabled>Please select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Restaurant Logo</h1>
            <input
              type="file"
              name="logo"
              onChange={handleLogoChange}
              className="w-full border rounded-md p-2 file:bg-violet-50 file:border-none"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Coupon Barcode</h1>
            <input
              type="file"
              name="barcode"
              onChange={handleBarcodeChange}
              className="w-full border rounded-md p-2 file:bg-violet-50 file:border-none"
              accept="image/png, image/jpeg"
            />
          </div>

          <button
            onClick={handlePost}
            disabled={loading || !name || !location || !managerName || !managerEmail || !category || !logo || !barcode}
            className="btn text-white bg-[#F58549]"
          >
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CREATE_RESTAURANT;
