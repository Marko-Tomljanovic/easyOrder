"use client";

import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import React from "react";
import { Layout } from "antd";
import PageHeaderNavigation from "./components/navigation/header/PageHeaderNavigation";
import FotterNavigation from "./components/navigation/footer/FotterNavigation";
import SidebarNavigation from "./components/navigation/sidebar/SidebarNavigation";
import { Content } from "antd/es/layout/layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout style={{ height: "100vh" }}>
          <ReduxProvider>
            <SidebarNavigation />
            <Layout>
              <PageHeaderNavigation
                title="Uspostavljen redux"
                subtitle="subtitle"
              />
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
          </ReduxProvider>
        </Layout>
      </body>
    </html>
  );
}
