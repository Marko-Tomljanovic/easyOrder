import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};
type AuthState = {
  isLoading: boolean;
};
const initialState = {
  value: {
    isLoading: false,
  } as AuthState,
} as InitialState;

export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleIsLoading: () => {
      return initialState;
    },
  },
});

export const { toggleIsLoading } = loading.actions;
export default loading.reducer;
