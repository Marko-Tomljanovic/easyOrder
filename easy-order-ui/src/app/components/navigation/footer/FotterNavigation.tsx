import { Footer } from "antd/es/layout/layout";
import React from "react";

type FotterNavigationProps = {
  content?: string;
  // podnaslov?: string | React.ReactNode;
  // extra?: React.ReactNode;
  // children?: React.ReactNode;
};

function FotterNavigation({ content }: FotterNavigationProps) {
  return (
    <Footer style={{ textAlign: "center" }}>
      {content ? content : "Easy order ©2023 Created by Ma&To"}
    </Footer>
  );
}

export default FotterNavigation;
