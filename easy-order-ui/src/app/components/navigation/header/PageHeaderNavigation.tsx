import { RollbackOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { subtitleLookup, titleLookup } from "@/constants/lookups";
import { PageHeaderNavigationProps } from "@/types/comon";

function PageHeaderNavigation({ color }: PageHeaderNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentTitle = () => {
    if (pathname) {
      return titleLookup[pathname as keyof typeof titleLookup];
    }
  };
  const currentSubtitle = () => {
    if (pathname) {
      return subtitleLookup[pathname as keyof typeof subtitleLookup];
    }
  };
  function hasMoreThanTwoSlashes() {
    const matches = pathname.match(/\//g);
    if (pathname.includes("admin")) {
      return matches && matches.length > 2;
    } else return matches && matches.length > 1;
  }

  return (
    <Header style={{ padding: 0, background: color ? color : "#FFFFFF" }}>
      <Flex gap={35} align="center" style={{ marginLeft: "2rem" }}>
        {hasMoreThanTwoSlashes() ? (
          <Button shape="circle" onClick={() => router.back()}>
            <RollbackOutlined />
          </Button>
        ) : null}

        <p style={{ fontWeight: "bold" }}>{currentTitle()}</p>
        <p className="gray-5" style={{ fontSize: "12px", color: "#8c8c8c" }}>
          {currentSubtitle()}
        </p>
      </Flex>
    </Header>
  );
}

export default PageHeaderNavigation;
