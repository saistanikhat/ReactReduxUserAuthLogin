import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";

interface AuthState {
  token: string | null;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.error.message || "Login failed.";
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
