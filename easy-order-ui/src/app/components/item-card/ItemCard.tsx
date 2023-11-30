import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import image from "@/app/components/item-card/123.jpg";
import Image from "next/image";

interface Item {
  key: string;
  label: string;
}

export default function ItemCard() {
  return (
    <div
      style={{
        width: "160px",
        height: "150px",
        border: "solid 1px",
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Image src={image} alt="nesto" width="50" height="140" />
        </Col>
        <Col>
          <div>
            <h4 style={{ marginBottom: 5 }}>Product Title</h4>
          </div>
          <div>
            <p style={{ marginBottom: 10 }}>Product Price</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ width: "100%" }}
          >
            Add
          </Button>
        </Col>
      </Row>
    </div>
  );
}
