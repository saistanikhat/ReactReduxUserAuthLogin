import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token: string | null) => {
    try {
      const userData = await userService.fetchUser(token);
      return userData;
    } catch (error) {
      throw error;
    }
  }
);
