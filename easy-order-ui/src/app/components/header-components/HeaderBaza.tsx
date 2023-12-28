import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space } from "antd";
import { useState } from "react";
import ItemCard from "../item-card/ItemCard";
import { sviProizvodi } from "@/constants/mocks/bazaProizvoda";

export default function HeaderBaza() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

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

  const filteredItems = sviProizvodi.filter((item: any) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
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
              <ItemCard id={item.id} title={item.name} addButton={true} />
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
}
