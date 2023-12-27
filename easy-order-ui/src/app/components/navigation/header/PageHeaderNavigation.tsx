import { RollbackOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { subtitleLookup, titleLookup } from "@/constants/lookups/global";
import { PageHeaderNavigationProps } from "@/types/comon";
import HeaderButtons from "./header-buttons/HeaderButtons";

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

  const headerStyle = {
    padding: "0",
    background: color ? color : "#FFFFFF",
    whiteSpace: "nowrap",
  } as React.CSSProperties;

  return (
    <Header style={headerStyle}>
      <Row align="middle">
        <Col span={8}>
          {hasMoreThanTwoSlashes() ? (
            <Button shape="circle" onClick={() => router.back()}>
              <RollbackOutlined />
            </Button>
          ) : null}
          <span style={{ fontWeight: "bold", margin: "0px 20px" }}>
            {currentTitle()}
          </span>
          <span
            className="gray-5"
            style={{ fontSize: "12px", color: "#8c8c8c" }}
          >
            {currentSubtitle()}
          </span>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <HeaderButtons currentTitle={currentTitle()} />
        </Col>
      </Row>
    </Header>
  );
}

export default PageHeaderNavigation;
