import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TablePosition = {
  x: number;
  y: number;
};

type Table = {
  id: string;
  size: null | number;
  position: TablePosition;
  isSquare: boolean;
  isTwoChairs: boolean;
};
type InitialState = Table[];

const initialState = [] as InitialState;

export const table = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchItems: (state, action) => {
      state = action.payload;
    },
  },
});

export const { fetchItems } = table.actions;
export default table.reducer;
