"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  return <>Dashboard</>;
}
