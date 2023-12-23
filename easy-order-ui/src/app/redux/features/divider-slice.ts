import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DividerPosition = {
  x: number;
  y: number;
};

type Divider = {
  key: string;
  id: string;
  size: null | number;
  position: DividerPosition | undefined;
};
type InitialState = Divider[];

const initialState = [] as InitialState;

export const divider = createSlice({
  name: "divider",
  initialState,
  reducers: {
    setNewDivider: (state, action: PayloadAction<Divider>) => {
      state.push(action.payload);
    },
    updateDividerPosition: (
      state,
      action: PayloadAction<{ id: string; newPosition: DividerPosition }>
    ) => {
      const { id, newPosition } = action.payload;
      const tableToUpdate = state.find((table) => table.id === id);
      if (tableToUpdate) {
        tableToUpdate.position = newPosition;
      }
    },
    updateDividerSize: (
      state,
      action: PayloadAction<{ id: string; newSize: number }>
    ) => {
      const { id, newSize } = action.payload;
      const tableToUpdate = state.find((table) => table.id === id);
      if (tableToUpdate) {
        tableToUpdate.size = newSize;
      }
    },
  },
});

export const { setNewDivider, updateDividerPosition, updateDividerSize } =
  divider.actions;
export default divider.reducer;
