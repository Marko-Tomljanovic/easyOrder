import { useTable } from "./useTable";
import { useDivider } from "./useDivider";

export const useRaspored = () => {
  const {
    tableList,
    handleDrag,
    globalTableOptions,
    addNewTable,
    onChangeDraggArea,
    onChangeCheckbox,
    handleNoChair,
    handleGrid,
  } = useTable();

  const { dividerList, handleDragDivider, addNewDivider } = useDivider();

  return {
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
  };
};
