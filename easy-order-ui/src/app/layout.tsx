"use client";

import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import React, { useEffect, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);
  //provjerava da li je user logiran, kada se napravi bakend postaviti auth
  const pathname = usePathname();
  useEffect(() => {
    checkLocalStorage(pathname);
    setIsClient(true);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Layout style={{ height: "100vh" }}>
            {isClient ? <SidebarNavigation /> : null}
            <Layout>
              <PageHeaderNavigation />
              <Content style={{ margin: "24px 16px 0", overflowY: "auto" }}>
                <div
                  style={{
                    background: "#FFFFFF",
                    padding: "1rem",
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
