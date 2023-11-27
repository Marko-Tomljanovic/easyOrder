"use client";

import React from "react";
import { Button, Checkbox, Col, Dropdown, Radio, Row, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAdmin } from "@/context/AdminProvider";
import CircleTable from "@/app/components/draggabile-components/table/DraggabileElement";
import { draggAreaLookup } from "@/constants/lookups/admin";

export default function Page() {
  const {
    tableList,
    globalTableOptions,
    handleDrag,
    addNewTable,
    onChangeDraggArea,
    onChangeCheckbox,
    handleNoChair,
    handleGrid,
  } = useAdmin();

  const listItems = tableList.map((table: any) => (
    <CircleTable
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
      <Row gutter={16} style={{ marginBottom: "10px" }}>
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
        {listItems}
      </div>

      <Space style={{ marginTop: "10px" }}>
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
