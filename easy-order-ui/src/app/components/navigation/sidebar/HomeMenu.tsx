import { Menu, MenuProps } from "antd";
import React from "react";
import {
  DatabaseOutlined,
  HomeOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function HomeMenu() {
  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "3") router.push("/dashboard");
    if (e.key === "4") router.push("/dashboard");
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={["3"]}
      defaultOpenKeys={["3"]}
      items={[
        { key: "3", icon: <HomeOutlined />, label: "Dashboard" },
        { key: "4", icon: <DatabaseOutlined />, label: "Stolovi" },
        { key: "5", icon: <LineChartOutlined />, label: "Statistika" },
      ]}
    />
  );
}
