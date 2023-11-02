import { Menu } from "antd";
import React from "react";
import { DatabaseOutlined, HomeOutlined } from "@ant-design/icons";

export default function AuthMenu() {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["0"]}
      items={[
        {
          key: "0",
          children: [
            { key: "1", icon: <HomeOutlined />, label: "LogIn" },
            { key: "2", icon: <DatabaseOutlined />, label: "Registracija" },
          ],
          icon: <HomeOutlined />,
          label: "Autentifikacija",
        },
        // { key: "1", icon: <HomeOutlined />, label: "LogIn" },
        // { key: "2", icon: <DatabaseOutlined />, label: "Registracija" },
        // { key: "3", icon: <LineChartOutlined />, label: "Statistika" },
      ]}
    />
  );
}
