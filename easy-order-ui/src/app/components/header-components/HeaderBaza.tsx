import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space } from "antd";
import { useState } from "react";
import ItemCard from "../item-card/ItemCard";

export default function HeaderBaza() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [marko, setMarko] = useState<any>([
    { id: "1", grupa: "", ime: "Kava s mlijekom" },
    { id: "2", grupa: "", ime: "Espresso" },
    { id: "3", grupa: "2", ime: "Coca-Cola" },
    { id: "4", grupa: "0", ime: "Fanta" },
    { id: "5", grupa: "0", ime: "Sprite" },
    { id: "6", grupa: "", ime: "Capuccino" },
    { id: "7", grupa: "", ime: "Produžena kava" },
    { id: "8", grupa: "", ime: "Kava s mlijekom" },
    { id: "9", grupa: "", ime: "Espresso" },
    { id: "10", grupa: "2", ime: "Coca-Cola" },
    { id: "11", grupa: "0", ime: "Fanta" },
    { id: "12", grupa: "0", ime: "Sprite" },
    { id: "13", grupa: "", ime: "Capuccino" },
    { id: "14", grupa: "", ime: "Produžena kava" },
    { id: "15", grupa: "0", ime: "Sprite" },
    { id: "16", grupa: "", ime: "Capuccino" },
    { id: "17", grupa: "", ime: "Produžena kava" },
    { id: "18", grupa: "0", ime: "Sprite" },
    { id: "19", grupa: "", ime: "Capuccino" },
    { id: "20", grupa: "", ime: "Produžena kava" },
    { id: "21", grupa: "0", ime: "Sprite" },
    { id: "22", grupa: "", ime: "Capuccino" },
    { id: "23", grupa: "", ime: "Produžena kava" },
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSearchValue("");
    setIsModalOpen(false);
  };

  const handleSerachInput = (e: any) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  const filteredItems = marko.filter((item: any) =>
    item.ime.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Novi proizvod
        </Button>
      </Space>
      <Modal
        title="Definirani proizvodi"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"83%"}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
        footer={null}
      >
        <Row
          style={{
            marginBottom: "10px",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
          align={"middle"}
          justify={"center"}
        >
          <Col span={8}>
            <Input
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={handleSerachInput}
              allowClear
            />
          </Col>
        </Row>

        <Row gutter={[8, 12]}>
          {filteredItems.map((item: any) => (
            <Col key={item.id}>
              <ItemCard key={item.id} title={item.ime} addButton={true} />
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
}
