import React from 'react';
import MODAL_HEADER from '../../Modal_Header';
import { Admin_Delete_Menu } from '../../../services/api';
import toast from 'react-hot-toast';

function DELETE_MENU({ menu, refresh }) {
  const handleDelete = async () => {
    try {
      const response = await Admin_Delete_Menu(menu._id);
      if (response) {
        document.getElementById('Delete_Menu').close();
        toast.success('Menu Item Deleted Successfully');
        refresh();
      } else {
        toast.error('Deleting the Menu Item Failed.');
      }
    } catch (error) {
      console.error('Network or server error', error);
      toast.error('Network or server error');
    }
  };

  return (
    <dialog id="Delete_Menu" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading="Delete Menu Item" />
        <div className="flex flex-col gap-6 mt-8">
          <p>Are you sure you want to delete {menu?.name}?</p>
          <button onClick={handleDelete} className="btn text-white bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DELETE_MENU;
