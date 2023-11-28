import {
  setNewTable,
  updateTablePosition,
} from "@/app/redux/features/table-slice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { draggAreaLookup } from "@/constants/lookups/admin";
import { RadioChangeEvent } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useRaspored = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [globalTableOptions, setGlobalTableOptions] = useState<any>({
    isShowId: false,
    noChair: false,
    grid: false,
    draggArea: 2,
  });

  const tableList = useAppSelector((state) => {
    return state.tableReducer;
  });

  const handleDrag = (e: any, ui: any, id: string) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };

    // provjera koalizije
    const isCollision = tableList.some((table: any) => {
      if (table.id !== id) {
        const otherTable = table.position;
        const distance = Math.sqrt(
          Math.pow(newPosition.x - otherTable.x, 2) +
            Math.pow(newPosition.y - otherTable.y, 2)
        );
        return distance < 60;
      }
      return false;
    });

    if (!isCollision) {
      dispatch(updateTablePosition({ id, newPosition }));
    }
  };

  const startPosition = () => {
    let newPosition = {
      x: 0,
      y: 0,
    };
    const isCollision = () => {
      const tableCollision = tableList.some((table: any) => {
        const otherTable = table.position;
        const distance = Math.sqrt(
          Math.pow(newPosition.x - otherTable.x, 2) +
            Math.pow(newPosition.y - otherTable.y, 2)
        );
        return distance < 60;
      });
      if (!tableCollision) {
        return false;
      } else {
        if (
          draggAreaLookup[
            globalTableOptions.draggArea as keyof typeof draggAreaLookup
          ].customBounds.right -
            50 <
          newPosition.x
        ) {
          newPosition.x = 0;
          newPosition.y += 100;
        } else {
          newPosition.x += 100;
        }
        isCollision();
      }
    };

    if (!isCollision()) {
      return newPosition;
    }
  };

  const addNewTable = (shape: boolean, chairNumber: boolean) => {
    const newTable = {
      id: String(tableList.length + 1),
      size: 1,
      position: startPosition(),
      isSquare: shape,
      isTwoChairs: chairNumber,
    };
    dispatch(setNewTable(newTable));
  };

  const onChangeDraggArea = ({ target: { value } }: RadioChangeEvent) => {
    console.log(value);
    setGlobalTableOptions((prevState: any) => ({
      ...prevState,
      draggArea: value,
    }));
  };

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setGlobalTableOptions({
      ...globalTableOptions,
      isShowId: e.target.checked,
    });
  };

  const handleNoChair = (e: CheckboxChangeEvent) => {
    setGlobalTableOptions({ ...globalTableOptions, noChair: e.target.checked });
  };

  const handleGrid = (e: CheckboxChangeEvent) => {
    setGlobalTableOptions({ ...globalTableOptions, grid: e.target.checked });
  };

  return {
    tableList,
    globalTableOptions,
    handleDrag,
    addNewTable,
    onChangeDraggArea,
    onChangeCheckbox,
    handleNoChair,
    handleGrid,
  };
};
