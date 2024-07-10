import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  email: string;
  password: string;
};
type TAuthState = {
  user: null | TUser;
};

const initialState: TAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state;
