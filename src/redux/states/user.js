import { createSlice } from "@reduxjs/toolkit";

// const initialstate = {
//   user_name: "~",
//   email: "~",
//   phone: "~",
//   password: "~",
//   company_name: "~",
//   company_id: "~",
//   user_id: "~",
// };

const User_Slice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    set_user: (state, action) => {
      state.userData = action.payload;
    },
    clear_user: (state) => {
      state.userData = null;
    }
  },
});

export const { set_user, clear_user } = User_Slice.actions;

export const selectUser = (state) => state.user.userData;

export default User_Slice.reducer;
