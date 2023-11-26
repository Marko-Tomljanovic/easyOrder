"use client";

import AdminProvider from "@/context/AdminProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminProvider>{children}</AdminProvider>
    </>
  );
}
