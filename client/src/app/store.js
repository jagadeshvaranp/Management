// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"; // adjust path if needed

export const store = configureStore({
  reducer: {
    usersinfo: userReducer, // key used in useSelector() in your components
  },
});

export default store;
