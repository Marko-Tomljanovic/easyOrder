"use client";

import Input from "antd/es/input/Input";
import { AppDispatch, useAppSelector } from "./redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "./redux/features/auth-slice";
import React from "react";

export default function Home() {
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
        <Input onChange={handleChange} />
      </div>
      <div>username: {username} </div>
    </>
  );
}
