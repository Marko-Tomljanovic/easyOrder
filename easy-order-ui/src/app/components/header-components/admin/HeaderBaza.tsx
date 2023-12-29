import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space } from "antd";
import { useEffect, useState } from "react";
import ProductCard from "../../item-card/ProductCard";
import { sviProizvodi } from "@/constants/mocks/bazaProizvoda";
import { useAdmin } from "@/context/AdminProvider";

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
  const { productList } = useAdmin();
  useEffect(() => {
    console.log("productList", productList);
  }, [productList]);

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
        style={{ top: 30 }}
        footer={null}
      >
        <Row
          style={{
            marginBottom: "10px",
            position: "sticky",
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

        <Row gutter={[8, 12]} style={{ maxHeight: "75vh", overflowY: "auto" }}>
          {filteredItems.map((item: any) => (
            <Col key={item.id}>
              <ProductCard
                id={item.id}
                title={item.name}
                showAddButton={true}
              />
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
}
