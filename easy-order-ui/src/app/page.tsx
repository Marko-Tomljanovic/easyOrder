"use client";

import Input from "antd/es/input/Input";
import { AppDispatch, useAppSelector } from "./redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "./redux/features/auth-slice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(logIn(e.target.value));
  };
  return (
    <main>
      <h3>Uspostavljen redux</h3>
      <div style={{ width: "100px", marginTop: "200px" }}>
        <Input onChange={handleChange} />
      </div>
      <div>username: {username} </div>
    </main>
  );
}
