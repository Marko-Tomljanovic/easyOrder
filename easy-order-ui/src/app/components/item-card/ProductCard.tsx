import { useAdmin } from "@/context/AdminProvider";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

interface Item {
  id: string;
  title: string;
  price?: string;
  showAddButton?: boolean;
}

export default function ProductCard({ id, title, price, showAddButton }: Item) {
  const { handleAddProduct } = useAdmin();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "160px",
        height: "150px",
        border: "solid 1px",
        borderRadius: "4%",
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          {/* <Image src="" alt="nesto" width="50" height="140" /> */}
        </Col>
        <Col>
          <div>
            <h4 style={{ marginBottom: 5 }}>{title}</h4>
          </div>
          {price ? (
            <div>
              <p style={{ marginBottom: 10 }}>{price + ` €`}</p>
            </div>
          ) : null}
        </Col>
      </Row>
      {showAddButton ? (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleAddProduct(id, title)}
          style={{ width: "100%" }}
        >
          Add
        </Button>
      ) : null}
    </div>
  );
}
