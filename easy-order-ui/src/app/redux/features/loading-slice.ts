import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isLoading: boolean;
};
const initialState = {
  isLoading: false,
} as InitialState;

export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { toggleIsLoading } = loading.actions;
export default loading.reducer;
