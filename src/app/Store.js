import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";

const store = configureStore({
  reducer: {
    email: AuthReducer,
  },
});

export default store;