import React, { useState, useEffect } from 'react';
import MODAL_HEADER from '../../Modal_Header';
import { Admin_Edit_Menu, get_image } from '../../../services/api';
import toast from 'react-hot-toast';

function EDIT_MENU({ menu, refresh }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (menu) {
      setName(menu.name || '');
      setPrice(menu.price || '');
      setCalories(menu.calories || '');
      setIngredients(menu.ingredients || '');
      setImageUrl('');

      if (menu.image) {
        get_image(menu.image)
          .then(setImageUrl)
          .catch(() => setImageUrl('/path/to/default/or/error/image.png'));
      }
    }
  }, [menu]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('calories', calories);
      formData.append('ingredients', ingredients);
      if (image) formData.append('image', image);

      const response = await Admin_Edit_Menu(menu._id, formData);
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

  function handleImageChange(event) {
    setImage(event.target.files[0]);
  }

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
            <h1>Ingredients</h1>
            <input
              disabled={loading}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Ingredients"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Image</h1>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full border rounded-md p-2 file:bg-violet-50 file:border-none"
              accept="image/png, image/jpeg"
            />
            <img src={imageUrl} alt={name ? `Image of ${name}` : 'Menu Image'} className="mt-4" />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading || !name || !price || !calories || !ingredients}
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
