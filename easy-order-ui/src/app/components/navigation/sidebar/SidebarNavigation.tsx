import { Layout } from "antd";
import React from "react";
import AuthMenu from "./AuthMenu";
import HomeMenu from "./HomeMenu";
// import { useAppSelector } from "@/app/redux/store";

export default function SidebarNavigation() {
  let user = "";
  if (typeof window !== "undefined") {
    const isCurrentUser = localStorage.getItem("isCurrentUser");
    if (isCurrentUser) {
      try {
        user = JSON.parse(isCurrentUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }

  // const username = useAppSelector((state) => {
  //   return state.authReducer.value.username;
  // });

  const { Sider } = Layout;
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div>{/* <Tag color="default">easyOrder</Tag> */}</div>
      {user ? <HomeMenu /> : <AuthMenu />}
    </Sider>
  );
}
