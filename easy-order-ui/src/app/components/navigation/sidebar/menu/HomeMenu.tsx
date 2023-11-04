import { Menu, MenuProps } from "antd";
import React from "react";
import {
  DatabaseOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { keyLookup } from "@/constants/lookups";

export default function HomeMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const currentKey = () => {
    if (pathname) {
      return keyLookup[pathname as keyof typeof keyLookup];
    } else {
      return "3";
    }
  };
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "3") router.push("/dashboard");
    if (e.key === "4") router.push("/baza-artikala");
    if (e.key === "5") router.push("/statistika");
    if (e.key === "6") {
      localStorage.removeItem("isCurrentUser");
      router.push("/");
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={[currentKey()]}
      // defaultOpenKeys={["3"]}
      items={[
        { key: "3", icon: <HomeOutlined />, label: "Dashboard" },
        { key: "4", icon: <DatabaseOutlined />, label: "Baza artikala" },
        { key: "5", icon: <LineChartOutlined />, label: "Statistika" },
        {
          key: "6",
          icon: <LogoutOutlined />,
          style: { position: "absolute", bottom: "1rem" },
          label: "LogOut",
        },
      ]}
    />
  );
}
