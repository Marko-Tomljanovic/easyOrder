import { Card, Flex } from "antd";

interface Item {
  key: string;
  label: string;
}

export default function ItemCard() {
  const items: Item[] = [
    {
      key: "1",
      label: "Kava",
    },
    {
      key: "2",
      label: "Capuciono",
    },
    {
      key: "3",
      label: "Coca-Cola",
    },
    {
      key: "4",
      label: "Fanta",
    },
    {
      key: "5",
      label: "Plava laguna",
    },
  ];
  return (
    <Flex wrap="wrap" gap="small">
      {items.map((item) => (
        <Card key={item.key} style={{ width: 150, height: 150 }}>
          <p>{item.label}</p>
        </Card>
      ))}
    </Flex>
  );
}
