import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userRoleId: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  userRoleId: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Omit<AuthState, "token">>) => {
      state.userRoleId = action.payload.userRoleId;
      state.userId = action.payload.userId;
    },
    clearAuthData: (state) => initialState,
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
