import { Menu } from "antd";
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

  const onClick = (e: any) => {
    if (e.key === "dashboard") {
      router.push("/dashboard");
      return;
    }
    if (e.key === "cjenik") {
      router.push("/cjenik");
      return;
    }
    if (e.key === "statistika") {
      router.push("/admin/statistika");
      return;
    }
    if (e.key === "bazaProizvoda") {
      router.push("/admin/baza-proizvoda");
      return;
    }
    if (e.key === "raspored") {
      router.push("/admin/raspored");
      return;
    }
    if (e.key === "osoblje") {
      router.push("/admin/osoblje");
      return;
    }
    if (e.key === "logOut") {
      {
        localStorage.removeItem("isCurrentUser");
        router.push("/");
        return;
      }
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
          key: "cjenik",
          icon: <MenuOutlined />,
          label: "Cjenik",
        },
        {
          key: "admin",
          children: [
            {
              key: "bazaProizvoda",
              icon: <DatabaseOutlined />,
              label: "Baza proizvoda",
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
