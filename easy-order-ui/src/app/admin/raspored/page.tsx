"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAdmin } from "@/context/AdminProvider";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import CircleTable from "@/app/components/draggabile-components/table/CircleTable";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  const {
    tableList,
    globalTableOptions,
    customBounds,
    handleDrag,
    addNewTable,
    onChangeCheckbox,
    handleNoChair,
    handleGrid,
  } = useAdmin();

  const listItems = tableList.map((table: any) => (
    <CircleTable
      key={table.id}
      id={table.id}
      position={table.position}
      size={1}
      handleDrag={handleDrag}
      customBounds={customBounds}
      isSquare={table.isSquare}
      isTwoChairs={table.isTwoChairs}
      showId={globalTableOptions.isShowId}
      noChair={globalTableOptions.noChair}
      grid={globalTableOptions.grid}
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
        <Checkbox onChange={onChangeCheckbox}>Prikaži id stola</Checkbox>
        <Checkbox onChange={handleNoChair}>Bez stolica</Checkbox>
        <Checkbox onChange={handleGrid}>Veći grid</Checkbox>
      </Space>
    </>
  );
}
