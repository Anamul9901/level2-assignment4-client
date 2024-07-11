/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/auth/authApi";
import {  setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  console.log("error=>", error);

  const onFinish = async (values: any) => {
    const userInfo = {
      email: values.email,
      password: values.password,
    };
    const res = await login(userInfo).unwrap();

    console.log("Received values of form: ", values.user);
    console.log("Received res of form: ", res.data);
    const { _id, email } = res.data;
    const finalResData = { _id, email };
    dispatch(setUser({ user: finalResData }));
  };
  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
            defaultValue={"admin01@gmail.com"}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            defaultValue={"admin01"}
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
