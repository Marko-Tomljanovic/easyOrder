import { Layout } from "antd";
import React from "react";
import AuthMenu from "./AuthMenu";
import HomeMenu from "./HomeMenu";
// import { useAppSelector } from "@/app/redux/store";

export const getServerSideProps = async () => {
  return {
    ssr: false, // Disable SSR for this page
  };
};

export default function SidebarNavigation() {
  let user: boolean = false;
  const isCurrentUser: any = localStorage.getItem("isCurrentUser");
  if (isCurrentUser) {
    user = true;
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
