import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/Admin";
import ProfileButton from "../../components/Profile_Btn";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/states/user";
import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material";
import CREATE_MENU from "../../components/modals/admin/Create_Menu";
import DELETE_MENU from "../../components/modals/admin/Delete_Menu";
import EDIT_MENU from "../../components/modals/admin/Edit_Menu";
import { useLocation } from "react-router-dom";
import { Get_Restaurant_Details } from "../../services/api";

function RestaurantDetails(props) {
  const [menuItems, setMenuItems] = useState([]); // Initialize as an empty array
  const user = useSelector(selectUser);
  const location = useLocation();
  const restaurantDetails = location.state?.restaurant;

  useEffect(() => {
    async function fetchMenuData() {
      try {
        const details = await Get_Restaurant_Details(restaurantDetails._id);

        // Flatten the menu structure
        const menuData = [];
        if (details.menu) {
          for (const type in details.menu) {
            if (details.menu.hasOwnProperty(type)) {
              for (const name in details.menu[type]) {
                if (details.menu[type].hasOwnProperty(name)) {
                  menuData.push({
                    name,
                    type,
                    ...details.menu[type][name]
                  });
                }
              }
            }
          }
        }

        setMenuItems(menuData);
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
        setMenuItems([]); // Ensure menuItems is always an array even on error
      }
    }

    if (restaurantDetails?._id) {
      fetchMenuData();
    }
  }, [restaurantDetails]);

  return (
    <AdminLayout>
      <CREATE_MENU restaurant={restaurantDetails} />
      <DELETE_MENU menu={menuItems} />
      <EDIT_MENU menu={menuItems} />
      <div className="w-full h-full">
        <div className="flex justify-end">
          <ProfileButton name={user?.name} redir="/admin/signin" />
        </div>
        <div className="flex justify-between my-4">
          <div className="flex gap-2 items-center justify-center">
            <h1 className="text-[#F58549] text-2xl font-medium ">
              {restaurantDetails?.name} Menu
            </h1>
          </div>
          <button
            onClick={() => document.getElementById("Create_Menu").showModal()}
            className="btn text-white bg-[#F58549]"
          >
            <Add /> Add Menu
          </button>
        </div>

        {/* Menu list header */}
        <Header />

        {/* List of menu items */}
        {menuItems.length > 0 ? (
          menuItems.map((menuItem, index) => (
            <Item
              setMenu={setMenuItems}
              menu={menuItem}
              key={index}
            />
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </AdminLayout>
  );
}

export default RestaurantDetails;

function Header() {
  return (
    <div className="grid grid-cols-6 bg-[#FDECE2] text-[#667085] px-4 p-2 font-medium text-xs">
      <h1>Menu Name</h1>
      <h1>Type</h1>
      <h1>Price</h1>
      <h1>Calories</h1>
      <h1>Ingredients</h1>
      <h1>Actions</h1>
    </div>
  );
}

function Item({ setMenu, menu }) {
  return (
    <div className="grid grid-cols-6 border-b text-[#667085] px-4 p-2 font-medium text-xs">
      <h1 className="text-[#101828] cursor-pointer">{menu.name}</h1>
      <h1>{menu.type}</h1>
      <h1>{menu.price}</h1>
      <h1>{menu.calories}</h1>
      <h1>{menu.ingredients.join(", ")}</h1>
      <div
        className="text-xs text-[#F58549] flex gap-4"
        onClick={() => setMenu(menu)}
      >
        <button
          className="outline-none"
          onClick={() => document.getElementById("Edit_Menu").showModal()}
        >
          <EditOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          className="outline-none"
          onClick={() => document.getElementById("Delete_Menu").showModal()}
        >
          <DeleteOutline style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
}
