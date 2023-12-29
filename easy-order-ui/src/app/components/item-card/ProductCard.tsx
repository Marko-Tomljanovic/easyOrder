import { useAdmin } from "@/context/AdminProvider";
import {
  CheckCircleFilled,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Badge, Button, Col, Row } from "antd";

interface Product {
  id: string;
  title: string;
  price?: string;
  showAddButton?: boolean;
}

export default function ProductCard({
  id,
  title,
  price,
  showAddButton,
}: Product) {
  const { productList, handleAddProduct } = useAdmin();

  const isSelectedProduct = () => {
    const rez = productList.some((product: any) => product.id === id);
    return rez;
  };

  const badgeStyle = {
    backgroundColor: isSelectedProduct() ? "white" : undefined,
    color: isSelectedProduct() ? "green" : undefined,
  };

  return (
    <>
      <Badge
        style={{ fontSize: 20 }}
        count={
          isSelectedProduct() ? <CheckCircleFilled style={badgeStyle} /> : 0
        }
      >
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
            {/* <Col span={8}>
          <Image src="" alt="nesto" width="50" height="140" />
        </Col> */}
            <Col span={24} style={{ textAlign: "center" }}>
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
            true ? (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAddProduct(id, title)}
                style={{ width: "100%" }}
              >
                Dodaj
              </Button>
            ) : (
              <Button
                type="text"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleAddProduct(id, title)}
                style={{ width: "100%" }}
              >
                Ukloni
              </Button>
            )
          ) : null}
        </div>
      </Badge>
    </>
  );
}
