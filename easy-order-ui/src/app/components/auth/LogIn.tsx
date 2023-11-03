import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { logIn } from "@/app/redux/features/auth-slice";
import { LoginDataType } from "@/types/comon";
import { INIT_LOGIN_DATA } from "@/constants/initialStates";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function LogIn() {
  const [formData, setFormData] = useState<LoginDataType>(INIT_LOGIN_DATA);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
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
    if (values.username !== "marko") {
      messageApi.open({
        type: "error",
        content: "Nepostojeći korisnik.",
      });
    } else {
      const timestamp = Date.now();
      setFormData({ ...values, timestamp: timestamp });
      dispatch(logIn(values.username));
      localStorage.setItem("isCurrentUser", values.username);
      router.push("/dashboard");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contextHolder}
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
