"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { logIn } from "../redux/features/auth-slice";
import CircleTable from "../components/draggabile-components/table/CircleTable";
import { Button, Checkbox, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export default function Page() {
  const [isShowId, setIsShowId] = useState<boolean>(false);
  const [noChair, setNoChair] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });
  const [tableList, setTableList] = useState<any>([
    {
      id: "1",
      isSquare: false,
      isTwoChairs: false,
    },
    {
      id: "2",
      isSquare: false,
      isTwoChairs: false,
    },
    {
      id: "3",
      isSquare: true,
      isTwoChairs: true,
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(logIn(e.target.value));
  };

  const customBounds = {
    left: 0,
    top: 0,
    right: 705,
    bottom: 405,
  };
  const marko = () => {
    const newTable = {
      id: String(tableList.length + 1),
      customBounds: {
        left: 0,
        top: 0,
        right: 705,
        bottom: 405,
      },
      isSquare: false,
      isTwoChairs: false,
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
      customBounds={customBounds}
      isSquare={table.isSquare}
      isTwoChairs={table.isTwoChairs}
      showId={isShowId}
      noChair={noChair}
    />
  ));

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
        <Button onClick={() => marko()}>Dodaj stol</Button>
        <Checkbox onChange={onChangeCheckbox}>Prikaži id stola</Checkbox>
        <Checkbox onChange={handleNoChair}>Bez stolica</Checkbox>
      </Space>
    </>
  );
}
