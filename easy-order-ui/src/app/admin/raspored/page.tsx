"use client";

import React from "react";
import { Button, Checkbox, Col, Dropdown, Radio, Row } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAdmin } from "@/context/AdminProvider";
import DraggabileElement from "@/app/components/draggabile-components/table/DraggabileElement";
import DraggabileDivider from "@/app/components/draggabile-components/divider/DraggabileDivider";
import { draggAreaLookup } from "@/constants/lookups/admin";
import { useGlobal } from "@/context/GlobalProvider";

export default function Page() {
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
  } = useAdmin();

  const { contextHolder } = useGlobal();

  const listTable = tableList.map((table: any) => (
    <DraggabileElement
      key={table.id}
      id={table.id}
      position={table.position}
      size={table.size}
      handleDrag={handleDrag}
      customBounds={
        draggAreaLookup[
          globalTableOptions.draggArea as keyof typeof draggAreaLookup
        ].customBounds
      }
      isSquare={table.isSquare}
      isTwoChairs={table.isTwoChairs}
      showId={globalTableOptions.isShowId}
      noChair={globalTableOptions.noChair}
      grid={globalTableOptions.grid}
    />
  ));

  const listDivider = dividerList.map((divider: any) => (
    <DraggabileDivider
      key={divider.id}
      id={divider.id}
      position={divider.position}
      handleDrag={handleDragDivider}
      customBounds={
        draggAreaLookup[
          globalTableOptions.draggArea as keyof typeof draggAreaLookup
        ].customBoundsDivides
      }
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
      {contextHolder}
      <Row gutter={16} style={{ marginBottom: "8px" }}>
        <Col>Veličina objekta:</Col>
        <Col>
          <Radio.Group
            defaultValue={globalTableOptions.draggArea}
            size="small"
            onChange={onChangeDraggArea}
          >
            <Radio.Button value={1}>Mala</Radio.Button>
            <Radio.Button value={2}>Srednja</Radio.Button>
            <Radio.Button value={3}>Velika</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <div
        style={{
          height: "500px",
          width:
            draggAreaLookup[
              globalTableOptions.draggArea as keyof typeof draggAreaLookup
            ].width,
          position: "relative",
          overflow: "auto",
          padding: "0",
          border: "solid 1px",
        }}
      >
        {listTable}
        {listDivider}
      </div>
      <Row gutter={16} align="middle" style={{ marginTop: "7px" }}>
        <Col>
          <Dropdown menu={{ items }}>
            <Button>
              Dodaj stol
              <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Button onClick={addNewDivider}>Dodaj divider</Button>
        </Col>
        <Col>
          <Checkbox onChange={onChangeCheckbox}>Prikaži id stola</Checkbox>
        </Col>
        <Col>
          <Checkbox onChange={handleNoChair}>Sakrij stolice</Checkbox>
        </Col>
        <Col>
          <Checkbox onChange={handleGrid}>Veći grid</Checkbox>
        </Col>
      </Row>
    </>
  );
}
