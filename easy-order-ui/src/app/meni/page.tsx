"use client";

import { Tabs, TabsProps } from "antd";
import ItemCard from "../components/item-card/ItemCard";

export default function Page() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Topli napitci",
      children: "Svi topli napitci",
    },
    {
      key: "2",
      label: "Bezalkoholna pića",
      children: "Sva bezalkoholna pića",
    },
    {
      key: "3",
      label: "Pivo",
      children: "Sva piva",
    },
    {
      key: "4",
      label: "Vino",
      children: "Sva vina",
    },
    {
      key: "5",
      label: "Kokteli",
      children: "Svi kokteli",
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={() => onChange} />
      <div style={{ width: "10rem" }}></div>
      <ItemCard key="1" title="Coca-Cola" price="2.5" />
    </>
  );
}
