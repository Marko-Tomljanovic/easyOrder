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
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
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
    const isCollision = Object.keys(positions).some((tableId) => {
      if (tableId !== id) {
        const otherTable = positions[tableId as keyof typeof positions];
        const distance = Math.sqrt(
          Math.pow(newPosition.x - otherTable.x, 2) +
            Math.pow(newPosition.y - otherTable.y, 2)
        );
        return distance < 60;
      }
      return false;
    });

    // ako postoji koalizija, spriječi update
    if (!isCollision) {
      setPositions((prevPositions) => ({
        ...prevPositions,
        [id]: newPosition,
      }));
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
  const marko = (shape: boolean, chairNumber: boolean) => {
    const newTable = {
      id: String(tableList.length + 1),
      customBounds: customBounds,
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

  const listItems = tableList.map((table: any) => (
    <CircleTable
      key={table.id}
      id={table.id}
      handleDrag={handleDrag}
      customBounds={customBounds}
      isSquare={table.isSquare}
      isTwoChairs={table.isTwoChairs}
      showId={isShowId}
      noChair={noChair}
      positions={positions}
    />
  ));

  const items = [
    {
      label: "Okrugli",
      key: "100",
      children: [
        {
          key: "1",
          label: <a onClick={() => marko(false, true)}>Dvije stolice</a>,
        },
        {
          key: "2",
          label: <a onClick={() => marko(false, false)}>Četiri stolice</a>,
        },
      ],
    },
    {
      label: "Četvrtasti",
      key: "200",
      children: [
        {
          key: "3",
          label: <a onClick={() => marko(true, true)}>Dvije stolice</a>,
        },
        {
          key: "4",
          label: <a onClick={() => marko(true, false)}>Četiri stolice</a>,
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
      </Space>
    </>
  );
}
