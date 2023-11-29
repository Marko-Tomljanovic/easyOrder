import { useRaspored } from "@/app/hooks/admin/useRaspored";
import React, { ReactNode, createContext } from "react";

const AdminContext = createContext<any>(undefined);

export default function AdminProvider({ children }: { children: ReactNode }) {
  const {
    tableList,
    dividerList,
    globalTableOptions,
    handleDrag,
    handleDragDivider,
    addNewTable,
    addNewDivider,
    onChangeDraggArea,
    onChangeCheckbox,
    handleNoChair,
    handleGrid,
    contextHolder,
  } = useRaspored();

  return (
    <AdminContext.Provider
      value={{
        tableList,
        dividerList,
        globalTableOptions,
        handleDrag,
        handleDragDivider,
        addNewTable,
        addNewDivider,
        onChangeDraggArea,
        onChangeCheckbox,
        handleNoChair,
        handleGrid,
        contextHolder,
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
