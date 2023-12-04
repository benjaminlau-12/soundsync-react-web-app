import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (loginState, action) => {
      loginState.userId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser } = loginSlice.actions;

export default loginSlice.reducer;
