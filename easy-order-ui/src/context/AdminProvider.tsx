import { useBazaProizvoda } from "@/app/hooks/admin/useBazaProizvoda";
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

  const {
    productList,
    handleAddProduct,
    activeKey,
    items,
    onChange,
    onEdit,
    checkGroup,
    isModalOpen,
    handleOk,
    handleCancel,
    newLabel,
    handleChange,
  } = useBazaProizvoda();

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
        productList,
        handleAddProduct,
        activeKey,
        items,
        onChange,
        onEdit,
        checkGroup,
        isModalOpen,
        handleOk,
        handleCancel,
        newLabel,
        handleChange,
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
