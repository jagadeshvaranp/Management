// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("loggedUser"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: savedUser || null, // logged-in user
    users: [],                      // all registered users
  },
  reducers: {
    // add a user to the users array (for registration)
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    // login: set currentUser and persist to localStorage
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },

    // logout: clear currentUser and localStorage
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("loggedUser");
    },
  },
});

export const { addUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
