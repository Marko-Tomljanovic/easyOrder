import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: string;
  typeOfProduct: null | number;
  name: string;
  price: string;
};
type InitialState = Product[];

const initialState = [] as InitialState;

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setNewProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
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
        // tableToUpdate.size = newSize;
        // tableToUpdate.isTwoChairs = changeChairs;
        // tableToUpdate.isSquare = newForm;
        // tableToUpdate.id = newId;
      }
    },
    deleteTable: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const newState = state.filter((table) => table.id !== id);
      return newState;
    },
  },
});

export const { setNewProduct } = product.actions;
export default product.reducer;
