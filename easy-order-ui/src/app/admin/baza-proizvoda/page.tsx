"use client";

import ModalNazivGrupe from "@/app/components/modal/admin/ModalNazivGrupe";
import ProductCard from "@/app/components/product-card/ProductCard";
import { useAdmin } from "@/context/AdminProvider";
import { Col, Row, Tabs } from "antd";

export default function Page() {
  const { productList, activeKey, items, onChange, onEdit, checkGroup } =
    useAdmin();

  return (
    <>
      <Tabs
        defaultActiveKey="0"
        activeKey={activeKey}
        items={items}
        onChange={onChange}
        type="editable-card"
        onEdit={onEdit}
      />

      <Row gutter={[10, 10]}>
        {productList.map(
          (item: any) =>
            checkGroup(item.typeOfProduct) && (
              <Col key={item.id}>
                <ProductCard
                  id={item.id}
                  title={item.name}
                  price={item.price}
                />
              </Col>
            )
        )}
      </Row>

      <ModalNazivGrupe />
    </>
  );
}
