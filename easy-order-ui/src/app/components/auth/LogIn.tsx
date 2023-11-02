import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { logIn } from "@/app/redux/features/auth-slice";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type FormDataType = {
  username: string;
  password: string;
  timestamp: number;
};

const INIT_FORMDATA = {
  username: "",
  password: "",
  timestamp: 0,
};

export default function LogIn() {
  const [formData, setFormData] = useState<FormDataType>(INIT_FORMDATA);
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(logIn(e.target.value));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values: any) => {
    const timestamp = Date.now();
    setFormData({ ...values, timestamp: timestamp });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: "3rem" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="User"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => dispatch(logIn(e.target.value))}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Lozinka"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Zapamti me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            LogIn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
