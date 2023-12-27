import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export default function HeaderBaza() {
  return (
    <Space>
      <Button type="primary" icon={<PlusOutlined />}>
        Novi proizvod
      </Button>
    </Space>
  );
}
