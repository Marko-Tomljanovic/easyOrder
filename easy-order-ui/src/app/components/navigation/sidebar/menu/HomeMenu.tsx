import { Menu, MenuProps } from "antd";
import React from "react";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { keyLookup } from "@/constants/lookups/global";

export default function HomeMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const currentKey = () => {
    if (pathname) {
      return keyLookup[pathname as keyof typeof keyLookup];
    } else {
      return "dashboard";
    }
  };

  const defaultOpenKey = () => {
    if (pathname && pathname.includes("admin")) {
      return "admin";
    } else {
      return "dashboard";
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "dashboard") router.push("/dashboard");
    if (e.key === "meni") router.push("/meni");
    if (e.key === "statistika") router.push("/admin/statistika");
    if (e.key === "bazaArtikala") router.push("/admin/baza-artikala");
    if (e.key === "raspored") router.push("/admin/raspored");
    if (e.key === "osoblje") router.push("/admin/osoblje");
    if (e.key === "logOut") {
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
      defaultOpenKeys={[defaultOpenKey()]}
      items={[
        { key: "dashboard", icon: <HomeOutlined />, label: "Dashboard" },
        {
          key: "meni",
          icon: <MenuOutlined />,
          label: "Meni",
        },
        {
          key: "admin",
          children: [
            {
              key: "bazaArtikala",
              icon: <DatabaseOutlined />,
              label: "Baza artikala",
            },
            {
              key: "raspored",
              icon: <AppstoreOutlined />,
              label: "Raspored",
            },
            { key: "osoblje", icon: <TeamOutlined />, label: "Osoblje" },
            {
              key: "statistika",
              icon: <LineChartOutlined />,
              label: "Statistika",
            },
          ],
          icon: <HomeOutlined />,
          label: "Admin",
        },
        {
          key: "logOut",
          icon: <LogoutOutlined />,
          style: { position: "absolute", bottom: "1rem" },
          label: "LogOut",
        },
      ]}
    />
  );
}
