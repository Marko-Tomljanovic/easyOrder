import { RollbackOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";

type PageHeaderNavigationProps = {
  title: string;
  subtitle?: string | React.ReactNode;
  color?: string;
};

function PageHeaderNavigation({
  title,
  subtitle,
  color,
}: PageHeaderNavigationProps) {
  return (
    <Header style={{ padding: 0, background: color ? color : "#FFFFFF" }}>
      <Flex gap={40} align="center" style={{ marginLeft: "2rem" }}>
        <Button shape="circle" onClick={() => alert("nazad")}>
          <RollbackOutlined />
        </Button>
        <p style={{ fontWeight: "bold" }}>{title}</p>
        <p>{subtitle}</p>
      </Flex>
    </Header>
  );
}

export default PageHeaderNavigation;
