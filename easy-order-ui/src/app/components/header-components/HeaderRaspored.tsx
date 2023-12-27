import { CheckOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export default function HeaderRaspored() {
  return (
    <Space>
      <Button type="primary" icon={<CheckOutlined />}>
        Spremi promjene
      </Button>
    </Space>
  );
}
