import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  console.log('current uer-->', user);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
