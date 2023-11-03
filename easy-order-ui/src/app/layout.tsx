"use client";

import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import React, { useEffect } from "react";
import { Layout } from "antd";
import PageHeaderNavigation from "./components/navigation/header/PageHeaderNavigation";
import FotterNavigation from "./components/navigation/footer/FotterNavigation";
import SidebarNavigation from "./components/navigation/sidebar/SidebarNavigation";
import { Content } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";
import { checkLocalStorage } from "@/middleware/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //provjerava da li je user logiran, kada se napravi bakend postaviti auth
  const pathname = usePathname();
  useEffect(() => {
    checkLocalStorage(pathname);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Layout style={{ height: "100vh" }}>
            <SidebarNavigation />
            <Layout>
              <PageHeaderNavigation />
              <Content style={{ margin: "24px 16px 0", overflowY: "auto" }}>
                <div
                  style={{
                    background: "#FFFFFF",
                  }}
                >
                  {children}
                </div>
              </Content>
              <FotterNavigation />
            </Layout>
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
