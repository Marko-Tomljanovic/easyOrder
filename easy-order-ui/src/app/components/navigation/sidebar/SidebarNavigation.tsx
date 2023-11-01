import { Layout, Menu } from "antd";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

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
      {/* <div className="demo-logo-vertical" /> */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["2"]}
        items={[
          UserOutlined,
          VideoCameraOutlined,
          UploadOutlined,
          UserOutlined,
        ].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: `nav ${index + 1}`,
        }))}
      />
    </Sider>
  );
};

export default SidebarNavigation;
