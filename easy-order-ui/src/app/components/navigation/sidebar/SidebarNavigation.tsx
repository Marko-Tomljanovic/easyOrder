import { Layout } from "antd";
import React from "react";
import AuthMenu from "./AuthMenu";

type SidebarNavigationProps = {
  naslov?: string;
  // podnaslov?: string | React.ReactNode;
  // extra?: React.ReactNode;
  // children?: React.ReactNode;
};

const SidebarNavigation = ({ naslov }: SidebarNavigationProps) => {
  const { Sider } = Layout;
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div>{/* <Tag color="default">easyOrder</Tag> */}</div>
      <AuthMenu />;
    </Sider>
  );
};

export default SidebarNavigation;
