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
  name: "auth",
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
    updateTableSize: (
      state,
      action: PayloadAction<{ id: string; newSize: number }>
    ) => {
      const { id, newSize } = action.payload;
      const tableToUpdate = state.find((table) => table.id === id);
      if (tableToUpdate) {
        tableToUpdate.size = newSize;
      }
    },
    updateTableChair: (
      state,
      action: PayloadAction<{ id: string; changeChairs: boolean }>
    ) => {
      const { id, changeChairs } = action.payload;
      const tableToUpdate = state.find((table) => table.id === id);
      if (tableToUpdate) {
        tableToUpdate.isTwoChairs = changeChairs;
      }
    },
    updateTableForm: (
      state,
      action: PayloadAction<{ id: string; newForm: boolean }>
    ) => {
      const { id, newForm } = action.payload;
      const tableToUpdate = state.find((table) => table.id === id);
      if (tableToUpdate) {
        tableToUpdate.isSquare = newForm;
      }
    },
  },
});

export const {
  setNewTable,
  updateTablePosition,
  updateTableSize,
  updateTableChair,
  updateTableForm,
} = table.actions;
export default table.reducer;
