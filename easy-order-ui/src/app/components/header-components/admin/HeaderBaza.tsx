import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space } from "antd";
import { useState } from "react";
import ProductCard from "../../product-card/ProductCard";
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
        title={`Definirani proizvodi - ${filteredItems.length}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"83%"}
        style={{ top: 30 }}
        footer={null}
      >
        <Row align={"middle"} justify={"center"}>
          <Col span={8}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Pretražite proizvod"
              value={searchValue}
              onChange={handleSerachInput}
              allowClear
            />
          </Col>
        </Row>

        <Row
          gutter={[10, 10]}
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            paddingBottom: "10px",
          }}
        >
          <Col span={24}></Col>
          <div style={{ marginTop: "10px" }}></div>
          {filteredItems.map((product: any) => (
            <Col key={product.id}>
              <ProductCard
                id={product.id}
                title={product.name}
                definedProductMode
              />
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
}
