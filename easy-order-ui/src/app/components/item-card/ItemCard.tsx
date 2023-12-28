import { setNewProduct } from "@/app/redux/features/products-slice";
import { AppDispatch } from "@/app/redux/store";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { useDispatch } from "react-redux";

interface Item {
  id: string;
  title: string;
  price?: string;
  addButton?: boolean;
}

export default function ItemCard({ title, price, addButton }: Item) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddItem = () => {
    // dispatch(setNewProduct(newProduct));
  };

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
      {addButton ? (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddItem}
          style={{ width: "100%" }}
        >
          Add
        </Button>
      ) : null}
    </div>
  );
}
