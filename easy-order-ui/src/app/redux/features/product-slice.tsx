import { TargetKey } from "@/types/admin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: string;
  typeOfProduct: null | string;
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
    deleteProduct: (state, action: PayloadAction<{ targetKey: TargetKey }>) => {
      const { targetKey } = action.payload;
      const newState = state.filter(
        (product) => product.typeOfProduct !== targetKey
      );
      return newState;
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
  },
});

export const { setNewProduct, deleteProduct } = product.actions;
export default product.reducer;
