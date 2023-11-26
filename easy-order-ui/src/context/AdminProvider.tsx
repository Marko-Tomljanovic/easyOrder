import { useRaspored } from "@/app/hooks/admin/useRaspored";
import React, { ReactNode, createContext } from "react";

const AdminContext = createContext<any>(undefined);

export default function AdminProvider({ children }: { children: ReactNode }) {
  const {
    tableList,
    globalTableOptions,
    customBounds,
    handleDrag,
    startPosition,
    addNewTable,
    onChangeCheckbox,
    handleNoChair,
    handleGrid,
  } = useRaspored();

  return (
    <AdminContext.Provider
      value={{
        tableList,
        globalTableOptions,
        customBounds,
        handleDrag,
        startPosition,
        addNewTable,
        onChangeCheckbox,
        handleNoChair,
        handleGrid,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminContext");
  }
  return context;
};
