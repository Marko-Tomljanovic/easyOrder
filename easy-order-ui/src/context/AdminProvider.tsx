import { useBazaArtikala } from "@/app/hooks/admin/useBazaArtiklala";
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
  } = useRaspored();

  const {} = useBazaArtikala();

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
