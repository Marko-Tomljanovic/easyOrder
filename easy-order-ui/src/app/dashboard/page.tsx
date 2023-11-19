"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { logIn } from "../redux/features/auth-slice";
import CircleTable from "../components/draggabile-components/table/CircleTable";
import { Button, Checkbox, Dropdown, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { DownOutlined } from "@ant-design/icons";

export default function Page() {
  const [isShowId, setIsShowId] = useState<boolean>(false);
  const [noChair, setNoChair] = useState<boolean>(false);
  const [grid, setGrid] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });
  const [tableList, setTableList] = useState<any>([]);

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
      setTableList((prevList: any) => {
        return prevList.map((table: any) => {
          if (table.id === id) {
            return { ...table, position: newPosition };
          }
          return table;
        });
      });
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
        newPosition.x += 100;
        isCollision();
      }
    };

    if (!isCollision()) {
      return newPosition;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(logIn(e.target.value));
  };

  const customBounds = {
    left: 0,
    top: 0,
    right: 705,
    bottom: 405,
  };
  const addNewTable = (shape: boolean, chairNumber: boolean) => {
    const newTable = {
      id: String(tableList.length + 1),
      position: startPosition(),
      isSquare: shape,
      isTwoChairs: chairNumber,
    };
    setTableList([...tableList, newTable]);
  };

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setIsShowId(e.target.checked);
  };

  const handleNoChair = (e: CheckboxChangeEvent) => {
    setNoChair(e.target.checked);
  };

  const handleGrid = (e: CheckboxChangeEvent) => {
    setGrid(e.target.checked);
  };

  const listItems = tableList.map((table: any) => (
    <CircleTable
      key={table.id}
      id={table.id}
      position={table.position}
      handleDrag={handleDrag}
      customBounds={customBounds}
      isSquare={table.isSquare}
      isTwoChairs={table.isTwoChairs}
      showId={isShowId}
      noChair={noChair}
      grid={grid}
    />
  ));

  const items = [
    {
      label: "Okrugli",
      key: "100",
      children: [
        {
          key: "1",
          label: <a onClick={() => addNewTable(false, true)}>Dvije stolice</a>,
        },
        {
          key: "2",
          label: (
            <a onClick={() => addNewTable(false, false)}>Četiri stolice</a>
          ),
        },
      ],
    },
    {
      label: "Četvrtasti",
      key: "200",
      children: [
        {
          key: "3",
          label: <a onClick={() => addNewTable(true, true)}>Dvije stolice</a>,
        },
        {
          key: "4",
          label: <a onClick={() => addNewTable(true, false)}>Četiri stolice</a>,
        },
      ],
    },
  ];

  return (
    <>
      <div
        style={{
          height: "500px",
          width: "800px",
          position: "relative",
          overflow: "auto",
          padding: "0",
          border: "solid 1px",
        }}
      >
        {listItems}
      </div>
      <br />
      <Space>
        <Dropdown menu={{ items }}>
          <Button>
            <Space>
              Dodaj stol
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        {/* <Button onClick={() => marko()}>Dodaj stol</Button> */}
        <Checkbox onChange={onChangeCheckbox}>Prikaži id stola</Checkbox>
        <Checkbox onChange={handleNoChair}>Bez stolica</Checkbox>
        <Checkbox onChange={handleGrid}>Veći grid</Checkbox>
      </Space>
    </>
  );
}
