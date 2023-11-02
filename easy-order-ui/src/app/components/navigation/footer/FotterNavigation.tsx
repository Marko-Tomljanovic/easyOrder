import { FotterNavigationProps } from "@/types/comon";
import { Footer } from "antd/es/layout/layout";
import React from "react";

export default function FotterNavigation({ content }: FotterNavigationProps) {
  return (
    <Footer style={{ textAlign: "center" }}>
      {content ? content : "Easy order ©2023 Created by Ma&To"}
    </Footer>
  );
}
