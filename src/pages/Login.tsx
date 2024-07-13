/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, {}] = useLoginMutation();
  // console.log("error=>", error);

  const onFinish = async (values: any) => {
    const userInfo = {
      email: values.email,
      password: values.password,
    };
    const res = await login(userInfo).unwrap();

    // console.log("Received values of form: ", values.user);
    // console.log("Received res of form: ", res.data);
    const { _id, email, name } = res.data;
    const finalResData = { _id, email, name };
    dispatch(setUser({ user: finalResData }));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Login Successfully",
      showConfirmButton: false,
      timer: 1500
    });
    navigate("/");
  };
  return (
    <div className="bg-gray-200 h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto flex  flex-col gap-2 justify-center items-center h-[80vh]">
          <div className="text-2xl font-bold  text-center pb-2">
            <h1>
              Welcome to <span className="text-green-500">Tree Oasis!</span>
            </h1>
            <h1 className="text-xl">Login Page</h1>
          </div>
          <div className="p-10 rounded-md bg-gray-300">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="email"
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
                />
              </Form.Item>

              <Form.Item>
               <div className="flex gap-2 items-center">
               <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button bg-green-500 font-semibold"
                >
                  Log in
                </Button>
                <p>Or <a href="/register" className="text-blue-600">register now!</a></p>
               </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
