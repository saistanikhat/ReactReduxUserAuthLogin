import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import userReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
