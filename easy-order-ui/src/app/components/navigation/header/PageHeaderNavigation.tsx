import { RollbackOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();
  const router = useRouter();
  const isBackButton = ["/register"];

  return (
    <Header style={{ padding: 0, background: color ? color : "#FFFFFF" }}>
      <Flex gap={40} align="center" style={{ marginLeft: "2rem" }}>
        {isBackButton.includes(pathname) ? (
          <Button shape="circle" onClick={() => router.back()}>
            <RollbackOutlined />
          </Button>
        ) : null}

        <p style={{ fontWeight: "bold" }}>{title}</p>
        <p>{subtitle}</p>
      </Flex>
    </Header>
  );
}

export default PageHeaderNavigation;
