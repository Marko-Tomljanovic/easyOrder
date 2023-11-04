import { RollbackOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { titleLookup } from "@/constants/lookups";
import { PageHeaderNavigationProps } from "@/types/comon";

function PageHeaderNavigation({ subtitle, color }: PageHeaderNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentTitle = () => {
    if (pathname) {
      return titleLookup[pathname as keyof typeof titleLookup];
    }
  };
  function hasMoreThanTwoSlashes() {
    const matches = pathname.match(/\//g);
    return matches && matches.length > 1;
  }

  return (
    <Header style={{ padding: 0, background: color ? color : "#FFFFFF" }}>
      <Flex gap={40} align="center" style={{ marginLeft: "2rem" }}>
        {hasMoreThanTwoSlashes() ? (
          <Button shape="circle" onClick={() => router.back()}>
            <RollbackOutlined />
          </Button>
        ) : null}

        <p style={{ fontWeight: "bold" }}>{currentTitle()}</p>
        <p>{subtitle}</p>
      </Flex>
    </Header>
  );
}

export default PageHeaderNavigation;
