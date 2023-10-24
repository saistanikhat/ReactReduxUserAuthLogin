import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/userActions";

interface UserState {
  data: any;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  data: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error.message || "Failed to fetch user data.";
    });
  },
});

export default userSlice.reducer;
