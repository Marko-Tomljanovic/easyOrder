import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TablePosition = {
  x: number;
  y: number;
};

type Table = {
  id: string;
  size: null | number;
  position: TablePosition | undefined;
  isSquare: boolean;
  isTwoChairs: boolean;
};
type InitialState = Table[];

const initialState = [] as InitialState;

export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    setNewTable: (state, action: PayloadAction<Table>) => {
      state.push(action.payload);
    },
    updateTablePosition: (
      state,
      action: PayloadAction<{ id: string; newPosition: TablePosition }>
    ) => {
      const { id, newPosition } = action.payload;
      const tableToUpdate = state.find((table) => table.id === id);
      if (tableToUpdate) {
        tableToUpdate.position = newPosition;
      }
    },
    updateTableProps: (
      state,
      action: PayloadAction<{
        id: string;
        newId: string;
        newSize: number;
        changeChairs: boolean;
        newForm: boolean;
      }>
    ) => {
      const { id, newId, newSize, changeChairs, newForm } = action.payload;
      const tableToUpdate = state.find((table) => table.id === id);
      if (tableToUpdate) {
        tableToUpdate.size = newSize;
        tableToUpdate.isTwoChairs = changeChairs;
        tableToUpdate.isSquare = newForm;
        tableToUpdate.id = newId;
      }
    },
    deleteTable: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const newState = state.filter((table) => table.id !== id);
      return newState;
    },
  },
});

export const {
  setNewTable,
  updateTableProps,
  updateTablePosition,
  deleteTable,
} = table.actions;
export default table.reducer;
