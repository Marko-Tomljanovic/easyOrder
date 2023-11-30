import {
  setNewDivider,
  updateDividerPosition,
} from "@/app/redux/features/divider-slice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useGlobal } from "@/context/GlobalProvider";
import { useDispatch } from "react-redux";

export const useDivider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messageApi } = useGlobal();
  const dividerList = useAppSelector((state) => {
    return state.dividerReducer;
  });

  const handleDragDivider = (e: any, ui: any, id: string) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };

    // provjera koalizije
    const isCollision = dividerList.some((table: any) => {
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
      dispatch(updateDividerPosition({ id, newPosition }));
    }
  };

  const startPosition = () => {
    let newPosition = {
      x: 40,
      y: 0,
    };
    const isCollision = () => {
      const tableCollision = dividerList.some((table: any) => {
        const otherTable = table.position;
        const distance = Math.sqrt(
          Math.pow(newPosition.x - otherTable.x, 2) +
            Math.pow(newPosition.y - otherTable.y, 2)
        );
        return distance < 50;
      });
      if (!tableCollision) {
        return false;
      } else {
        newPosition.x += 30;

        isCollision();
      }
    };

    if (!isCollision()) {
      return newPosition;
    }
  };

  const addNewDivider = () => {
    if (dividerList.length === 3) {
      messageApi.open({
        type: "warning",
        content: "Maksimalni broj dividera je tri.",
      });
      return;
    }
    const newDivider = {
      id: String(dividerList.length + 1),
      size: 1,
      position: startPosition(),
    };
    dispatch(setNewDivider(newDivider));
  };

  return {
    dividerList,
    handleDragDivider,
    addNewDivider,
  };
};
