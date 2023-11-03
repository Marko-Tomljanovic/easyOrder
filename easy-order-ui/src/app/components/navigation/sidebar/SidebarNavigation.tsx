import { Layout } from "antd";
import React from "react";
import AuthMenu from "./AuthMenu";
import HomeMenu from "./HomeMenu";
import { useAppSelector } from "@/app/redux/store";

const SidebarNavigation = () => {
  const user = localStorage.getItem("isCurrentUser");
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

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
};

export default SidebarNavigation;
