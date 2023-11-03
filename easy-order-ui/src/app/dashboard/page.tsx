"use client";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { logIn } from "../redux/features/auth-slice";
import { Input } from "antd";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(logIn(e.target.value));
  };
  return (
    <>
      <div style={{ width: "10rem" }}>
        {/* <Input onChange={handleChange} /> */}
      </div>
      <div>username: {username} </div>
    </>
  );
}
