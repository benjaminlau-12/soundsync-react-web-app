import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading: false,
};

export const loadingSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    switchLoading: (loadingState) => {
        loadingState.isLoading = !loadingState.isLoading;
     }
  },
});

// Action creators are generated for each case reducer function
export const { switchLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
