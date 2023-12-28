import { setNewProduct } from "@/app/redux/features/product-slice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";

export const useBazaArtikala = () => {
  const dispatch = useDispatch<AppDispatch>();

  const productList = useAppSelector((state) => {
    return state.productReducer;
  });

  const handleAddProduct = (id: string, title: string) => {
    const newProduct = {
      id: id,
      typeOfProduct: "",
      name: title,
      price: "",
    };
    dispatch(setNewProduct(newProduct));
  };
  return { productList, handleAddProduct };
};
