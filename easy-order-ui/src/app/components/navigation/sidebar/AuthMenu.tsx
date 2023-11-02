import { Menu } from "antd";
import React from "react";
import {
  LoginOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

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
            { key: "1", icon: <LoginOutlined />, label: "LogIn" },
            { key: "2", icon: <UserAddOutlined />, label: "Registracija" },
          ],
          icon: <TeamOutlined />,
          label: "Autentifikacija",
        },
      ]}
    />
  );
}
