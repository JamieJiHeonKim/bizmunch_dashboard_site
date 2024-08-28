import { useSelector } from "react-redux";
import { selectUser } from "../../redux/states/user";
import { useNavigate } from "react-router-dom";
import {
  Add,
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import AdminLayout from "../../layout/Admin";
import CREATE_RESTAURANT from "../../components/modals/admin/Create_Restaurant";
import { useEffect, useState } from "react";
import { Admin_Get_Restaurants } from "../../services/api";
import DELETE_RESTAUDANT from "../../components/modals/admin/Delete_Restaurant";
import EDIT_RESTAURANT from "../../components/modals/admin/Edit_Restaurant";
import VIEW_RESTAURANT from "../../components/modals/admin/View_Restaurant";
import ProfileButton from "../../components/Profile_Btn";

function Restaurants() {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const user = useSelector(selectUser);

  async function fetchdata() {
    try {
      setLoading(true);
      const res = await Admin_Get_Restaurants();
      setRestaurants(res);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <AdminLayout>
      <VIEW_RESTAURANT restaurant={restaurant} />
      <CREATE_RESTAURANT refresh={() => fetchdata()} />
      <DELETE_RESTAUDANT refresh={() => fetchdata()} restaurant={restaurant} />
      <EDIT_RESTAURANT refresh={() => fetchdata()} restaurant={restaurant} />
      <div className=" w-full h-full ">
        <div className="flex justify-end">
          <ProfileButton name={user?.name} redir="/admin/signin" />
        </div>
        <div className="flex justify-between my-4">
          <div className="flex gap-2 items-center justify-center">
            <h1 className="text-[#F58549] text-2xl font-medium ">Restaurants</h1>
            {loading && (
              <span className="loading loading-spinner loading-sm text-[#F58549]"></span>
            )}
          </div>
          <button
            onClick={() =>
              document.getElementById("Create_Restaurant").showModal()
            }
            className="btn text-white bg-[#F58549] "
          >
            <Add />New Restaurant
          </button>
        </div>
      </div>

      <div>
        <Header />
        {restaurants.map((restaurant, index) => (
          <Item
            setRestaurant={setRestaurant}
            restaurant={restaurant}
            restaurantEmail={restaurant.email}
            restaurantName={restaurant.name}
            restaurantManagers={restaurant.managersCount || 0}
            restaurantEmployees={restaurant.employeesCount || 0}
            key={index}
          />
        ))}
      </div>
    </AdminLayout>
  );
}

export default Restaurants;

function Header() {
  return (
    <div className="grid grid-cols-6 bg-[#FDECE2] text-[#667085] px-4 p-2 font-medium text-xs">
      <h1>Restaurant Name</h1>
      <h1>Location</h1>
      <h1>Manager Name</h1>
      <h1>Manager Email</h1>
      <h1>Category</h1>
      <h1>Actions</h1>
    </div>
  );
}

function Item(props) {
  const navigate = useNavigate();

  const handleViewRestaurant = () => {
    navigate(`/admin/restaurant/${props.restaurant._id}/${props.restaurant.name}`, {
      state: { restaurant: props.restaurant },
    });
  };

  return (
    <div className="grid grid-cols-6 border-b text-[#667085] px-4 p-2 font-medium text-xs">
      <h1
        onClick={handleViewRestaurant}
        className=" text-[#101828] cursor-pointer"
      >
        {props.restaurantName}
      </h1>
      <h1>{props.restaurant.location}</h1>
      <h1>{props.restaurant.managerName}</h1>
      <h1>{props.restaurant.managerEmail}</h1>
      <h1>{props.restaurant.category}</h1>
      <div
        className="text-xs text-[#F58549] flex gap-4"
        onClick={() => {
          props.setRestaurant(props.restaurant);
        }}
      >
        <button
          className="outline-none"
          onClick={() => document.getElementById("View_Restaurant").showModal()}
        >
          <VisibilityOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          className="outline-none"
          onClick={() => document.getElementById("Edit_Restaurant").showModal()}
        >
          <EditOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          className="outline-none"
          onClick={() =>
            document.getElementById("Delete_Restaurant").showModal()
          }
        >
          <DeleteOutline style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
}