import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import HomePage from "../pages/Home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
