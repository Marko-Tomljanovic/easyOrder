import { Button, Space } from "antd";

export default function HeaderButtons() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "20px",
      }}
    >
      <Space>
        <Button type="primary">Unesi nesto</Button>
        <Button type="primary">Unesi nesto</Button>
      </Space>
    </div>
  );
}
