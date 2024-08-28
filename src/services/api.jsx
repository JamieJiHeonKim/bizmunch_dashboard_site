import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export const get_image = (imageId) => {
  if (!imageId) {
    console.error("Invalid image ID");
    return Promise.resolve("/path/to/default/or/error/image.png"); // Resolve with a default or error image URL
  }
  console.log("imageId: ", imageId)

  const imageUrl = `${url}/users/dashboard/images/${imageId}`;
  const token = sessionStorage.getItem("Token"); // Retrieve the bearer token from sessionStorage

  return axios({
    method: 'get',
    url: imageUrl,
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}` // Set the Authorization header with the bearer token
    }
  })
  .then(response => URL.createObjectURL(response.data))
  .catch(error => {
    console.error("Failed to fetch image:", error);
    return "/path/to/default/or/error/image.png"; // Provide a default or error image URL in case of error
  });
}

const get_token = () => {
  return sessionStorage.getItem("Token") || null;
};

const authHeader = () => ({
  Authorization: `Bearer ${get_token()}`
});

const token = get_token();

export const login = async (email, password) => {
  const response = await axios.put(`${url}/users/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const Admin_Get_Companies = async () => {
  try {
    const response = await axios.get(`${url}/users/dashboard/companies`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch companies', error);
    throw error;
  }
};

export const Admin_Get_Restaurants = async () => {
  try {
    const response = await axios.get(`${url}/users/dashboard/restaurants`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch restaurants', error);
    throw error;
  }
};

export const Get_Restaurant_Details = async (restaurantId) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/restaurant/${restaurantId}/details`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${get_token()}`,
    },
  };

  const response = await axios.request(config);
  return response.data;
};

export const Admin_Create_Menu = async (formData) => {
  const config = {
    method: "post",
    url: `${url}/users/dashboard/menu/${formData.get('restaurantId')}`,
    headers: {
      Authorization: `Bearer ${get_token()}`,
      "Content-Type": "application/json",
    },
    data: {
      restaurantId: formData.get('restaurantId'),
      restaurantName: formData.get('restaurantName'),
      type: formData.get('type'),
      name: formData.get('name'),
      price: formData.get('price'),
      calories: formData.get('calories'),
      ingredients: formData.get('ingredients'),
    },
  };
  return axios(config);
};

export const Admin_Edit_Menu = async (restaurantId, menuId, menuItem) => {
  try {
    const response = await axios.put(`${url}/users/dashboard/restaurant/menu/${restaurantId}/${menuId}`, menuItem);
    return response.data;
  } catch (error) {
    console.error('Error editing menu:', error);
    throw error;
  }
};

export const Admin_Delete_Menu = async (restaurantId, menuId) => {
  try {
    const response = await axios.delete(`${url}/users/dashboard/restaurant/menu/${restaurantId}/${menuId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting menu:', error);
    throw error;
  }
};

export const Admin_Create_Company = async (formData) => {
  let config = {
    method: "post",
    url: `${url}/users/dashboard/companies`,
    headers: {
      Authorization: `Bearer ${get_token()}`,
    },
    data: formData
  };

  return axios(config)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating company:', error);
      throw error;
    });
};

export const Admin_Create_Restaurant = async (formData) => {
  let config = {
    method: "post",
    url: `${url}/users/dashboard/restaurants`,
    headers: {
      Authorization: `Bearer ${get_token()}`,
    },
    data: formData
  };

  return axios(config)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating restaurant:', error);
      throw error;
    });
};

export const Admin_Delete_Company = async (id) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/companies/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Admin_Delete_Restaurant = async (id) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/restaurants/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Admin_Edit_Company = async (id, formData) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/companies/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const response = await axios.request(config);
  return response;
};

export const Admin_Edit_Restaurant = async (id, formData) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/restaurants/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const response = await axios.request(config);
  return response;
};

export const Admin_Create_Manager = async (DATA) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/managers`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: DATA,
  };
  const response = await axios.request(config);
  return response;
};

export const Admin_Get_Users = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/users`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Admin_Get_All_Notifications = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/notifications`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Admin_Create_Notification = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/notifications`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    data: data,
  };
  const response = await axios.request(config);
  return response;
};

export const Manager_Get_All_Employees = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/employees`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Edit_User = async (Data, id) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/user/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    data: Data,
  };
  const response = await axios.request(config);
  return response;
};

export const Manager_Edit_User = async (Data, id) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/employees/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    data: Data,
  };
  const response = await axios.request(config);
  return response;
};

export const Manager_Get_User = async (id) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/employees/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Manager_Delete_User = async (id) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/employees/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Manager_Get_Notifications = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}/users/dashboard/companyNotifications`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    return response;
  } catch (err) {
    return { data: [] };
  }
};

export const Manager_Create_Transaction = async (Data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/transactions`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    data: Data,
  };
  const response = await axios.request(config);
  return response;
};

export const Manager_Get_Transactions = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/transactions`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Manager_Get_Popularproducts = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/popularproducts`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};

export const Get_Companies = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/companyNames`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);

  return response;
};

export const Register_User = async (Data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/users/auth/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: Data,
  };
  const response = await axios.request(config);
  return response;
};

export const Update_Profile = async (Data) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${url}/users/auth/profile/update`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    data: Data,
  };
  const response = await axios.request(config);
  return response;
};

export const Update_Password = async (Data) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${url}/users/auth/password/change`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    data: Data,
  };
  const response = await axios.request(config);
  return response;
};

export const Get_Company_Details = async (_id) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/users/dashboard/dashboardCompanyDetails/${_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.request(config);
  return response;
};
