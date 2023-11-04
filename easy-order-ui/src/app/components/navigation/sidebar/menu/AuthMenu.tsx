import { Menu, MenuProps } from "antd";
import React from "react";
import {
  LoginOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { keyLookup } from "@/constants/lookups";

export default function AuthMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const currentKey = () => {
    if (pathname) {
      return keyLookup[pathname as keyof typeof keyLookup];
    } else {
      return "1";
    }
  };
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") router.push("/");
    if (e.key === "2") router.push("/register");
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={[currentKey()]}
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
