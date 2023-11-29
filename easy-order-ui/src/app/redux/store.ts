import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import loadingReducer from "./features/loading-slice";
import tableReducer from "./features/table-slice";
import dividerReducer from "./features/divider-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authReducer,
    loadingReducer,
    tableReducer,
    dividerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
