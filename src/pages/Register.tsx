/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../redux/hooks";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { error }] = useRegisterMutation();
  console.log(error);
  const onFinish = async (values: any) => {
    const userInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    console.log(userInfo);

    const res = await register(userInfo).unwrap();
    console.log("success", res);

    const { _id, email, name } = res.data;
    const finalResData = { _id, email, name };
    dispatch(setUser({ user: finalResData }));
    navigate('/')
  };
  return (
    <div className="bg-gray-200 h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto flex justify-center items-center h-[80vh]">
          <div className="p-10 rounded-md bg-gray-300">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="email"
                  defaultValue={"admin01@gmail.com"}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  defaultValue={"admin01"}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sign Up
                </Button>
                Or <a href="/login">Login now!</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
